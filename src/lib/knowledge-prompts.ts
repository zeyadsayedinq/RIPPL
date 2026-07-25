/* ═══════════════════════════════════════════════════════════
   KNOWLEDGE PROMPT PACK

   In-app copies of the prompt sets in knowledge/prompts/*, so Tech Lab's
   Prompt Library can be seeded with one click. Edit them here or there — but
   keep the two in step, because the Markdown versions are what get reviewed
   in git.
═══════════════════════════════════════════════════════════ */

export interface SeedPrompt {
  title: string;
  category: string;
  body: string;
  /** knowledge/ file this came from */
  source: string;
}

export const KNOWLEDGE_PROMPTS: SeedPrompt[] = [
  /* ── A&R ── */
  {
    title: "Artist signing thesis (1 page)",
    category: "A&R",
    source: "knowledge/prompts/AR_SCOUTING_PROMPTS.md",
    body: `You are an A&R analyst. Write a one-page signing thesis for {{ARTIST}}.

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

Be specific. If a claim isn't supported by the inputs, mark it [ASSUMPTION].`,
  },
  {
    title: "Catalog triage",
    category: "A&R",
    source: "knowledge/prompts/AR_SCOUTING_PROMPTS.md",
    body: `Given this catalog of {{N}} tracks with metadata {{DATA}}, identify:
- The 3 tracks that should carry the next campaign, with reasoning
- Tracks with fixable metadata or titling problems (list the fix)
- Tracks that would benefit from a video version, ranked
- Any track suitable for sync pitching, and the specific use case
Output as a table with a "next action" column.`,
  },
  {
    title: "Scouting first-contact DM",
    category: "A&R",
    source: "knowledge/prompts/AR_SCOUTING_PROMPTS.md",
    body: `Write a first-contact DM to {{ARTIST}} from an independent label/management operation.

Constraints:
- Under 60 words
- Reference one specific thing about their actual music: {{DETAIL}}
- No superlatives, no "we love your vibe", no emoji
- One clear, low-commitment ask
- Sound like a person who listened, not a template

Give me 3 variants with different angles.`,
  },
  {
    title: "90-day artist development plan",
    category: "A&R",
    source: "knowledge/prompts/AR_SCOUTING_PROMPTS.md",
    body: `Build a 90-day artist development plan for {{ARTIST}} at stage {{STAGE}} with a budget of {{BUDGET}}.

Return a week-by-week table with columns: Week | Focus | Deliverable | Owner | Cost.

Constraints:
- DSP pitch must be submitted no later than 4 weeks before release
- At least 12 UGC hook variants exist before any paid spend
- No single week has more than one primary outcome

End with the three assumptions most likely to be wrong.`,
  },

  /* ── UGC ── */
  {
    title: "Bulk UGC hook generation (CSV)",
    category: "UGC",
    source: "knowledge/prompts/UGC_HOOK_GENERATOR.md",
    body: `Generate 30 short-form video hooks for {{TRACK}} by {{ARTIST}} ({{GENRE}}, {{LANGUAGE}}, mood: {{MOOD}}).

Rules:
- Max 9 words each — readable in 3 seconds as an overlay
- Spread across these angles: curiosity gap, contrarian, process, social proof, direct, stakes
- No hashtags, no emoji, no ALL CAPS
- No claim I can't back up
- Written for {{PLATFORM}}'s audience

Output CSV: id,text,angle`,
  },
  {
    title: "Rewrite from a winning hook",
    category: "UGC",
    source: "knowledge/prompts/UGC_HOOK_GENERATOR.md",
    body: `This hook performed well (3s retention {{X}}%): "{{WINNING_HOOK}}"

Produce 8 variations that keep the underlying psychological mechanism but change the surface.
Name the mechanism first in one sentence, then list the variants.`,
  },
  {
    title: "Creator brief (under 200 words)",
    category: "UGC",
    source: "knowledge/prompts/UGC_HOOK_GENERATOR.md",
    body: `Write a creator brief for {{CREATOR}} ({{PLATFORM}}, {{FOLLOWERS}} followers) promoting {{TRACK}}.

Include: the one thing they must do, the three things they must not do, the sound to use
(exact name), the link, the deliverable spec, the deadline, and how performance will be
measured (3s retention, not views).

Keep it under 200 words — briefs longer than that don't get read.`,
  },

  /* ── Pitch ── */
  {
    title: "DSP editorial pitch (500 chars)",
    category: "Pitch",
    source: "knowledge/prompts/PITCH_AND_OUTREACH.md",
    body: `Write a Spotify editorial pitch for {{TRACK}} by {{ARTIST}}, max 500 characters.

Must include: what the track is, who it's for, the marketing behind it
(spend/creators/press/tour), and any quantified prior traction: {{TRACTION}}.

No adjectives without evidence. No "we believe". Lead with the strongest fact.`,
  },
  {
    title: "Sync pitch email",
    category: "Pitch",
    source: "knowledge/prompts/PITCH_AND_OUTREACH.md",
    body: `Write a sync pitch email to {{SUPERVISOR}} for {{TRACK}}.

Constraints:
- Subject line under 50 characters, states genre + one distinguishing feature
- Body under 120 words
- Name the specific scene type / brand context it fits
- State clearly: master and publishing both controlled by {{CONTROLLER}}, one-stop
- Mention instrumental and stems are available immediately
- One link, no attachments`,
  },
  {
    title: "Follow-up ladder (3 messages)",
    category: "Pitch",
    source: "knowledge/prompts/PITCH_AND_OUTREACH.md",
    body: `Write a 3-message follow-up sequence after no reply to {{ORIGINAL_MESSAGE}}.

- Message 1 (+4 days): add new information, don't just "bump"
- Message 2 (+10 days): change the ask to something smaller
- Message 3 (+21 days): close the loop gracefully and leave the door open

Each under 60 words. No guilt, no urgency theatre.`,
  },

  /* ── Legal ── */
  {
    title: "Contract plain-language summary",
    category: "Legal",
    source: "knowledge/prompts/CONTRACT_SUMMARIZER.md",
    body: `Summarise the attached music agreement for a non-lawyer.

Output exactly these sections:
1. Parties and what each is agreeing to do (2 sentences)
2. Which copyrights are covered — master, composition, or both
3. Term, territory, exclusivity
4. Money: rate, rate base (gross or net), advance, recoupment, cross-collateralisation, permitted deductions
5. Control: approval rights, key-person, assignment
6. Exit: termination, reversion, auto-renewal, notice windows
7. The five clauses I should ask a lawyer about, ranked by risk
8. Anything unusually favourable or unfavourable versus market standard

If a term is undefined in the document (e.g. "net receipts"), say so explicitly.

NOT LEGAL ADVICE — this is triage so I know what to ask a lawyer about.`,
  },
  {
    title: "Contract red-flag scan",
    category: "Legal",
    source: "knowledge/prompts/CONTRACT_SUMMARIZER.md",
    body: `Scan this agreement for these specific red flags and quote the exact clause text for each one found:
- Perpetuity combined with exclusivity
- "Net receipts" or "net profits" used without a definition
- Unlimited or sole-discretion deductions
- No audit right, or an audit right with an unreasonable notice/cost burden
- Auto-renewal without a notice window
- Sync rights granted without a separate fee mechanism
- Re-recording restrictions extending beyond the term
- Assignment permitted without consent

Return a table: Flag | Clause reference | Quoted text | Why it matters.`,
  },
];
