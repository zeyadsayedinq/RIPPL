# A&R & Scouting Prompts

Paste into `/techlab` → Prompt Library. Replace `{{...}}`.

---

## 1. Artist thesis (1 page)

```
You are an A&R analyst. Write a one-page signing thesis for {{ARTIST}}.

Inputs:
- Genre/scene: {{GENRE}}
- 90-day follower slope: {{SLOPE}}
- Monthly listeners: {{LISTENERS}}
- Save rate: {{SAVE_RATE}}
- Top 3 tracks and their D28: {{TRACKS}}
- Content cadence over the last 8 weeks: {{CADENCE}}

Structure:
1. One-sentence positioning ("X is the artist for Y who want Z")
2. Three comparable artists, with the specific dimension of comparison
3. The strongest signal and the strongest counter-signal
4. What would have to be true in 12 months for this to work
5. The cheapest experiment that would test #4 in 90 days
6. Recommended deal shape (single, EP, development) and why

Be specific. If a claim isn't supported by the inputs, mark it [ASSUMPTION].
```

---

## 2. Catalog triage

```
Given this catalog of {{N}} tracks with metadata {{DATA}}, identify:
- The 3 tracks that should carry the next campaign, with reasoning
- Tracks with fixable metadata or titling problems (list the fix)
- Tracks that would benefit from a video version, ranked
- Any track suitable for sync pitching, and the specific use case
Output as a table with a "next action" column.
```

---

## 3. Scouting outreach (first contact)

```
Write a first-contact DM to {{ARTIST}} from an independent
label/management operation. Constraints:
- Under 60 words
- Reference one specific thing about their actual music (I'll supply: {{DETAIL}})
- No superlatives, no "we love your vibe", no emoji
- One clear, low-commitment ask
- Sound like a person who listened, not a template
Give me 3 variants with different angles.
```

---

## 4. Development plan

```
Build a 90-day artist development plan for {{ARTIST}} at stage {{STAGE}}
with a budget of {{BUDGET}}.

Return a week-by-week table with columns: Week | Focus | Deliverable | Owner | Cost.
Constraints:
- DSP pitch must be submitted no later than 4 weeks before release
- At least 12 UGC hook variants exist before any paid spend
- No single week has more than one primary outcome
End with the three assumptions most likely to be wrong.
```
