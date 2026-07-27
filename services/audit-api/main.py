"""
RIPPL Audit API — FastAPI server that streams TikTok sound audit results via SSE.

Run locally:
    pip install fastapi uvicorn playwright
    python main.py

Deploy to Railway:
    Push this folder to a GitHub repo → connect on railway.app → it auto-detects
    the Dockerfile and deploys.
"""
import json
from urllib.parse import unquote

from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

from scraper import scrape_sound

app = FastAPI(title="RIPPL Audit API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # tighten to your Vercel domain in production
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.get("/audit/stream")
async def audit_stream(url: str = Query(..., description="TikTok sound page URL")):
    """
    SSE endpoint. Connect with EventSource:
        new EventSource(`http://localhost:8000/audit/stream?url=${encodeURIComponent(soundUrl)}`)

    Emits JSON-encoded event data:
        { type: "progress", captured: number, scroll: number, message: string }
        { type: "done",     data: AuditResult }
        { type: "error",    message: string }
    """
    sound_url = unquote(url)

    async def event_stream():
        try:
            async for event in scrape_sound(sound_url):
                payload = json.dumps(event, ensure_ascii=False)
                yield f"data: {payload}\n\n"
        except Exception as exc:
            err = json.dumps({"type": "error", "message": str(exc)})
            yield f"data: {err}\n\n"

    return StreamingResponse(
        event_stream(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",   # disables nginx buffering on Railway/Render
        },
    )


if __name__ == "__main__":
    import os, uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=int(os.getenv("PORT", 8000)), reload=False)
