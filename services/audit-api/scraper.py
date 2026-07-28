"""
TikTok sound page scraper.
Strategy (in order):
  1. Direct HTTP fetch → parse SIGI_STATE from server-rendered HTML (works from cloud IPs
     because TikTok does SSR for SEO crawlers).
  2. Playwright headless + XHR intercept → scroll for additional pages beyond the initial batch.
  3. Additional SIGI_STATE extraction from the loaded DOM via page.evaluate().
Streams progress via async generator; each yielded dict is an SSE event.
"""
from __future__ import annotations

import asyncio
import json
import os
import re
from datetime import datetime
from typing import AsyncGenerator

import httpx
from playwright.async_api import async_playwright

MIN_FOLLOWERS = 100_000

_STEALTH_JS = """
Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
window.chrome = {
  runtime: { connect: () => {}, sendMessage: () => {}, onMessage: { addListener: () => {} } },
};
Object.defineProperty(navigator, 'plugins',   { get: () => [1, 2, 3, 4, 5] });
Object.defineProperty(navigator, 'languages', { get: () => ['en-US', 'en'] });
const _origPerms = window.navigator.permissions.query;
window.navigator.permissions.query = (p) =>
  p.name === 'notifications'
    ? Promise.resolve({ state: Notification.permission })
    : _origPerms(p);
"""

_HTTP_HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/131.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    "Referer": "https://www.tiktok.com/",
    "sec-ch-ua": '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "none",
    "sec-fetch-user": "?1",
}


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


def _extract_videos_from_dict(data: dict) -> list:
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


def _parse_sigi(data: dict) -> list:
    """Extract video items from a parsed SIGI_STATE or __NEXT_DATA__ dict."""
    if not isinstance(data, dict):
        return []

    # SIGI_STATE: { ItemModule: { videoId: itemData } }
    item_module = data.get("ItemModule", {})
    if item_module and isinstance(item_module, dict):
        return list(item_module.values())

    # __NEXT_DATA__ / nested structures
    return _extract_videos_from_dict(data)


async def _fetch_via_http(sound_url: str) -> list:
    """
    Fetch the TikTok sound page via plain HTTP (no browser).
    TikTok's SSR layer embeds SIGI_STATE in the raw HTML for SEO crawlers,
    and this path isn't gated by the same bot-detection as the JS-rendered path.
    """
    try:
        async with httpx.AsyncClient(
            headers=_HTTP_HEADERS,
            follow_redirects=True,
            timeout=30,
        ) as client:
            resp = await client.get(sound_url)
            html = resp.text

        # Primary: <script id="SIGI_STATE">…</script>
        m = re.search(r'<script\s+id="SIGI_STATE"[^>]*>(.*?)</script>', html, re.DOTALL)
        if m:
            data = json.loads(m.group(1))
            items = _parse_sigi(data)
            if items:
                return items

        # Fallback: <script id="__NEXT_DATA__">…</script>
        m = re.search(r'<script\s+id="__NEXT_DATA__"[^>]*>(.*?)</script>', html, re.DOTALL)
        if m:
            data = json.loads(m.group(1))
            items = _parse_sigi(data)
            if items:
                return items

        # Last-resort: any JSON blob containing ItemModule
        for chunk in re.finditer(r'\{"ItemModule":\{.{50,}', html):
            try:
                # Walk forward to find balanced braces (rough heuristic)
                raw = chunk.group(0)
                # Try successively shorter substrings in case of trailing noise
                for end in range(len(raw), max(50, len(raw) - 2000), -1):
                    try:
                        data = json.loads(raw[:end])
                        items = _parse_sigi(data)
                        if items:
                            return items
                        break
                    except json.JSONDecodeError:
                        continue
            except Exception:
                continue

    except Exception:
        pass

    return []


async def _extract_sigi_from_dom(page) -> list:
    """Extract SIGI_STATE from the loaded DOM via page.evaluate()."""
    try:
        result = await page.evaluate("""
            () => {
                const el = document.getElementById('SIGI_STATE');
                if (el) { try { return JSON.parse(el.textContent); } catch(e) {} }
                const nd = document.getElementById('__NEXT_DATA__');
                if (nd) { try { return JSON.parse(nd.textContent); } catch(e) {} }
                return null;
            }
        """)
        if result and isinstance(result, dict):
            return _parse_sigi(result)
    except Exception:
        pass
    return []


def _segment(records: list[dict]) -> dict:
    got  = sorted([r for r in records if r["views"] >= 100_000],          key=lambda x: x["views"], reverse=True)
    good = sorted([r for r in records if 10_000 <= r["views"] < 100_000], key=lambda x: x["views"], reverse=True)
    low  = sorted([r for r in records if  1_000 <= r["views"] < 10_000],  key=lambda x: x["views"], reverse=True)
    no   = sorted([r for r in records if r["views"] < 1_000],             key=lambda x: x["followers"], reverse=True)
    nxt  = sorted(got + good,                                              key=lambda x: x["views"], reverse=True)
    return {"got_views": got, "good_views": good, "low_views": low, "no_views": no, "next_campaign": nxt}


async def scrape_sound(sound_url: str) -> AsyncGenerator[dict, None]:
    collected: dict[str, dict] = {}

    # ── Step 1: Plain HTTP fetch (no browser, bypasses JS-layer bot detection) ──
    yield {"type": "progress", "captured": 0, "scroll": 0, "message": "Fetching TikTok page data…"}
    http_items = await _fetch_via_http(sound_url)
    for item in http_items:
        rec = _parse_video(item)
        if rec and rec["video_id"]:
            collected[rec["video_id"]] = rec

    if collected:
        yield {
            "type": "progress",
            "captured": len(collected),
            "scroll": 0,
            "message": f"Got {len(collected)} videos from page — loading browser for more…",
        }
    else:
        yield {
            "type": "progress",
            "captured": 0,
            "scroll": 0,
            "message": "No data in page HTML — opening browser…",
        }

    # ── Step 2: Playwright for XHR interception + scroll pagination ──
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
                user_agent=_HTTP_HEADERS["User-Agent"],
                viewport={"width": 1280, "height": 900},
                locale="en-US",
                timezone_id="America/New_York",
                extra_http_headers={
                    "Accept-Language": "en-US,en;q=0.9",
                    "sec-ch-ua": _HTTP_HEADERS["sec-ch-ua"],
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": '"Windows"',
                },
            )
            await context.add_init_script(_STEALTH_JS)

            queue: asyncio.Queue = asyncio.Queue()

            async def on_response(response):
                try:
                    url = response.url
                    if "tiktok.com" not in url or response.status != 200:
                        return
                    if not any(pat in url for pat in (
                        "item_list", "aweme/v1", "/music/", "api/music", "api/item",
                    )):
                        return
                    try:
                        body = await response.json()
                    except Exception:
                        return
                    videos = _extract_videos_from_dict(body)
                    if videos:
                        await queue.put(videos)
                except Exception:
                    pass

            page = await context.new_page()
            page.on("response", on_response)

            await page.goto(sound_url, wait_until="domcontentloaded", timeout=60_000)
            await page.wait_for_timeout(4_000)

            # Try DOM-based SIGI_STATE extraction in case HTTP fetch missed it
            dom_items = await _extract_sigi_from_dom(page)
            for item in dom_items:
                rec = _parse_video(item)
                if rec and rec["video_id"] and rec["video_id"] not in collected:
                    collected[rec["video_id"]] = rec

            # Drain any XHR responses captured during page load
            while not queue.empty():
                for item in await queue.get():
                    rec = _parse_video(item)
                    if rec and rec["video_id"] and rec["video_id"] not in collected:
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
                        if rec and rec["video_id"] and rec["video_id"] not in collected:
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
