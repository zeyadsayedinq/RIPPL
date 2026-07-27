"""
TikTok sound page scraper — runs headless in cloud (Railway / Render).
Streams progress via async generator; each yielded dict is an SSE event.
"""
from __future__ import annotations

import asyncio
import os
from datetime import datetime
from typing import AsyncGenerator

from playwright.async_api import async_playwright

MIN_FOLLOWERS = 100_000

# Injected at browser context level to mask automation signals TikTok checks
_STEALTH_JS = """
Object.defineProperty(navigator, 'webdriver', { get: () => undefined });

window.chrome = {
  runtime: {
    connect: () => {},
    sendMessage: () => {},
    onMessage: { addListener: () => {} },
  },
};

Object.defineProperty(navigator, 'plugins', { get: () => [1, 2, 3, 4, 5] });
Object.defineProperty(navigator, 'languages', { get: () => ['en-US', 'en'] });

const originalQuery = window.navigator.permissions.query;
window.navigator.permissions.query = (parameters) =>
  parameters.name === 'notifications'
    ? Promise.resolve({ state: Notification.permission })
    : originalQuery(parameters);
"""


def _parse_video(item: dict) -> dict | None:
    try:
        author = item.get("author") or {}
        stats  = item.get("stats") or item.get("statsV2") or {}

        def to_int(v):
            try:
                return int(v)
            except (TypeError, ValueError):
                return 0

        followers = to_int(
            author.get("followerCount")
            or author.get("fans")
            or item.get("authorStats", {}).get("followerCount")
            or 0
        )
        views    = to_int(stats.get("playCount")    or stats.get("play_count")    or 0)
        likes    = to_int(stats.get("diggCount")    or stats.get("like_count")    or 0)
        comments = to_int(stats.get("commentCount") or stats.get("comment_count") or 0)
        shares   = to_int(stats.get("shareCount")   or stats.get("share_count")   or 0)

        username  = author.get("uniqueId") or author.get("unique_id") or author.get("id") or "unknown"
        nickname  = author.get("nickname") or username
        video_id  = str(item.get("id") or item.get("aweme_id") or "")
        video_url = f"https://www.tiktok.com/@{username}/video/{video_id}" if video_id else ""

        create_time = item.get("createTime") or item.get("create_time") or 0
        posted_at   = datetime.fromtimestamp(create_time).strftime("%Y-%m-%d") if create_time else "N/A"

        return {
            "video_id":  video_id,
            "username":  username,
            "nickname":  nickname,
            "followers": followers,
            "views":     views,
            "likes":     likes,
            "comments":  comments,
            "shares":    shares,
            "video_url": video_url,
            "posted_at": posted_at,
        }
    except Exception:
        return None


def _extract_videos(data: dict) -> list:
    if not isinstance(data, dict):
        return []
    for key in ("itemList", "item_list", "items"):
        if isinstance(data.get(key), list):
            return data[key]
    body = data.get("body", {})
    if isinstance(body, dict):
        for key in ("itemList", "items"):
            if isinstance(body.get(key), list):
                return body[key]
    nested = data.get("data", {})
    if isinstance(nested, dict):
        for key in ("itemList", "items"):
            if isinstance(nested.get(key), list):
                return nested[key]
    return []


def _segment(records: list[dict]) -> dict:
    got  = sorted([r for r in records if r["views"] >= 100_000],          key=lambda x: x["views"], reverse=True)
    good = sorted([r for r in records if 10_000 <= r["views"] < 100_000], key=lambda x: x["views"], reverse=True)
    low  = sorted([r for r in records if  1_000 <= r["views"] < 10_000],  key=lambda x: x["views"], reverse=True)
    no   = sorted([r for r in records if r["views"] < 1_000],             key=lambda x: x["followers"], reverse=True)
    nxt  = sorted(got + good,                                              key=lambda x: x["views"], reverse=True)
    return {"got_views": got, "good_views": good, "low_views": low, "no_views": no, "next_campaign": nxt}


async def scrape_sound(sound_url: str) -> AsyncGenerator[dict, None]:
    """
    Async generator — yields SSE event dicts:
      { "type": "progress", "captured": int, "scroll": int, "message": str }
      { "type": "done",     "data": { ... } }
      { "type": "error",    "message": str }
    """
    collected: dict[str, dict] = {}

    # Optional: set SCRAPER_PROXY=http://user:pass@host:port in Railway env vars
    proxy_url = os.getenv("SCRAPER_PROXY")
    proxy_cfg = {"server": proxy_url} if proxy_url else None

    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch(
                headless=True,
                proxy=proxy_cfg,
                args=[
                    "--disable-blink-features=AutomationControlled",
                    "--no-sandbox",
                    "--disable-setuid-sandbox",
                    "--disable-dev-shm-usage",
                    "--disable-gpu",
                    "--no-first-run",
                    "--no-zygote",
                    "--single-process",
                    "--disable-extensions",
                ],
            )

            context = await browser.new_context(
                user_agent=(
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                    "AppleWebKit/537.36 (KHTML, like Gecko) "
                    "Chrome/131.0.0.0 Safari/537.36"
                ),
                viewport={"width": 1280, "height": 900},
                locale="en-US",
                timezone_id="America/New_York",
            )

            await context.add_init_script(_STEALTH_JS)

            queue: asyncio.Queue = asyncio.Queue()

            async def on_response(response):
                try:
                    url = response.url
                    if not ("tiktok.com" in url and response.status == 200):
                        return
                    is_api      = "api" in url or "aweme" in url or "item_list" in url or "/music/" in url
                    has_content = "video" in url.lower() or "item" in url.lower() or "music" in url.lower()
                    if not (is_api and has_content):
                        return
                    if "json" not in response.headers.get("content-type", ""):
                        return
                    body   = await response.json()
                    videos = _extract_videos(body)
                    if videos:
                        await queue.put(videos)
                except Exception:
                    pass

            page = await context.new_page()
            page.on("response", on_response)

            yield {"type": "progress", "captured": 0, "scroll": 0, "message": "Opening TikTok sound page…"}
            await page.goto(sound_url, wait_until="domcontentloaded", timeout=60_000)
            await page.wait_for_timeout(4_000)

            while not queue.empty():
                for item in await queue.get():
                    rec = _parse_video(item)
                    if rec and rec["video_id"] not in collected:
                        collected[rec["video_id"]] = rec

            scroll_round = 0
            stale        = 0
            prev         = len(collected)

            while stale < 6:
                scroll_round += 1
                await page.evaluate("window.scrollBy(0, 2000)")
                await page.wait_for_timeout(2_000)

                while not queue.empty():
                    for item in await queue.get():
                        rec = _parse_video(item)
                        if rec and rec["video_id"] not in collected:
                            collected[rec["video_id"]] = rec

                current = len(collected)
                yield {
                    "type":     "progress",
                    "captured": current,
                    "scroll":   scroll_round,
                    "message":  f"Scroll #{scroll_round} — {current} videos captured",
                }

                if current == prev:
                    stale += 1
                    if stale == 3:
                        await page.wait_for_timeout(3_000)
                else:
                    stale = 0
                    prev  = current

            await browser.close()

    except Exception as exc:
        yield {"type": "error", "message": str(exc)}
        return

    qualified = [r for r in collected.values() if r["followers"] >= MIN_FOLLOWERS]
    qualified.sort(key=lambda x: x["followers"], reverse=True)

    yield {
        "type": "done",
        "data": {
            "total_scraped": len(collected),
            "qualified":     qualified,
            **_segment(qualified),
        },
    }
