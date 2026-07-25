# UGC Hook Generator Prompts

Feed output into `data/hooks.csv` (`id,text,angle`) and render with
`scripts/ugc_reel_gen.py`.

---

## 1. Bulk hook generation

```
Generate 30 short-form video hooks for {{TRACK}} by {{ARTIST}}
({{GENRE}}, {{LANGUAGE}}, mood: {{MOOD}}).

Rules:
- Max 9 words each — they must be readable in 3 seconds as an overlay
- Spread across these angles: curiosity gap, contrarian, process, social proof,
  direct, stakes
- No hashtags, no emoji, no ALL CAPS
- No claim I can't back up
- Written for {{PLATFORM}}'s audience

Output CSV: id,text,angle
```

---

## 2. Hook rewriting from a winner

```
This hook performed well (3s retention {{X}}%): "{{WINNING_HOOK}}"

Produce 8 variations that keep the underlying psychological mechanism but change
the surface. Name the mechanism first in one sentence, then list the variants.
```

---

## 3. Caption + pinned comment

```
For the hook "{{HOOK}}" on {{PLATFORM}}, write:
- A one-line caption that restates the hook (not a summary of the video)
- A pinned comment that either answers the obvious objection or delivers the
  payoff late enough to extend watch time
- 3 relevant, non-spammy tags
```

---

## 4. Creator brief

```
Write a creator brief for {{CREATOR}} ({{PLATFORM}}, {{FOLLOWERS}} followers)
promoting {{TRACK}}.

Include: the one thing they must do, the three things they must not do, the
sound to use (exact name), the link, the deliverable spec, the deadline, and how
performance will be measured (3s retention, not views). Keep it under 200 words —
briefs longer than that don't get read.
```
