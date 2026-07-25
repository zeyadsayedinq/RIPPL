# UGC Content Engine

Batch-produced, hook-led short video at volume. Directly adapted from
`vishnuhimself/UGCVidGen`, wired into RIPPL as `data/hooks.csv` +
`scripts/ugc_reel_gen.py` + the `/studio` UGC panel.

## Why volume

Short-form performance is a fat-tailed distribution. Median output is worthless;
the top ~5% carries everything. You cannot pick the winner in advance — you can
only buy more lottery tickets cheaply. Twelve mediocre-to-good variants beat one
polished hero video for discovery purposes almost every time.

## Anatomy of a generated reel

```
[ HOOK CLIP 0–3s ]  b-roll + text overlay (from hooks.csv)
[ BODY 3–15s     ]  track playing over performance / studio / lifestyle b-roll
[ CTA CLIP       ]  fixed clip, "full track in bio" / "pre-save"
[ MUSIC BED      ]  the track being promoted (never library music)
```

## Asset library you need once

| Folder | Contents | Count to aim for |
|---|---|---|
| `hook_videos/` | 1080×1920 b-roll, no text, 3–5s | 20+ |
| `cta_videos/` | 1080×1920 fixed endcards | 3 |
| `music/` | The track(s) being promoted | per campaign |
| `data/hooks.csv` | `id,text,angle` | 60+ (60 shipped) |

## Batch workflow

```bash
python3 scripts/ugc_reel_gen.py --count 12 --track "path/to/track.wav" \
  --campaign "artist-single-name"
```

Outputs to `final_videos/`, logs to `video_creation.log`, and records used hook
IDs so the same hook is never shipped twice for a campaign.

## Hook angles (from `hooks.csv`)

| Angle | Works because | Example shape |
|---|---|---|
| Curiosity gap | Withholds the payoff | "The part everyone rewinds is at 0:47" |
| Contrarian | Pattern break | "Nobody needs another sad song. This isn't one." |
| Process | Parasocial | "I made this beat from a voice note at 3am" |
| Social proof | Borrowed authority | "This got 40k saves before it even released" |
| Direct | Filters hard, converts hard | "Egyptian trap. Turn it up." |
| Stakes | Narrative pull | "If this flops I'm going back to my day job" |

## Reading results

Rank by **3-second retention**, not by views or likes. Views measure distribution;
3s retention measures whether the hook worked, which is the only variable you
changed. Feed winners into `systems/LOW_BUDGET_PROMO_MODEL.md`.

## Checklist

- [ ] ≥ 20 hook b-rolls in the library
- [ ] 12 variants rendered before campaign launch
- [ ] Hook ID stored with every post so results are attributable
- [ ] Ranking done on 3s retention
- [ ] Winners boosted, losers archived (not deleted — reuse b-roll)
