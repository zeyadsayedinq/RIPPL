/* ═══════════════════════════════════════════════════════════
   UGC HOOK LIBRARY

   In-app mirror of data/hooks.csv, so the Studio UGC panel works without a
   file read. Same source of truth conceptually — if you edit one, edit both.

   Adapted from vishnuhimself/UGCVidGen, whose model is: a CSV of hooks + a
   folder of b-roll + an endcard + a music bed, rendered in batch. The batch
   renderer lives at scripts/ugc_reel_gen.py.

   Doctrine: knowledge/marketing/UGC_CONTENT_ENGINE.md
═══════════════════════════════════════════════════════════ */

export type HookAngle =
  "curiosity" | "contrarian" | "process" | "social-proof" | "direct" | "stakes";

export interface Hook {
  id: string;
  text: string;
  angle: HookAngle;
}

export const ANGLES: { key: HookAngle; label: string; why: string }[] = [
  {
    key: "curiosity",
    label: "Curiosity gap",
    why: "Withholds the payoff so the viewer stays for it",
  },
  {
    key: "contrarian",
    label: "Contrarian",
    why: "Breaks the pattern the feed has trained them to expect",
  },
  {
    key: "process",
    label: "Process",
    why: "Parasocial — how it was made is its own story",
  },
  {
    key: "social-proof",
    label: "Social proof",
    why: "Borrowed authority from other people's reaction",
  },
  {
    key: "direct",
    label: "Direct",
    why: "Filters hard, converts hard, no cleverness",
  },
  {
    key: "stakes",
    label: "Stakes",
    why: "Narrative pull — something is on the line",
  },
];

export const HOOKS: Hook[] = [
  { id: "1", text: "The part everyone rewinds is at 0:47", angle: "curiosity" },
  { id: "2", text: "I almost deleted this one", angle: "curiosity" },
  { id: "3", text: "This started as a voice note at 3am", angle: "process" },
  {
    id: "4",
    text: "Nobody needs another sad song. This isn't one.",
    angle: "contrarian",
  },
  { id: "5", text: "Turn this up or don't play it at all", angle: "direct" },
  {
    id: "6",
    text: "It took 40 versions to get this drop right",
    angle: "process",
  },
  {
    id: "7",
    text: "Producers will hear it. Everyone else will just feel it.",
    angle: "contrarian",
  },
  { id: "8", text: "Wait for the beat switch", angle: "curiosity" },
  {
    id: "9",
    text: "This got saved 4000 times before it released",
    angle: "social-proof",
  },
  {
    id: "10",
    text: "My mum heard this and asked who it was",
    angle: "social-proof",
  },
  {
    id: "11",
    text: "If this flops I'm going back to the day job",
    angle: "stakes",
  },
  {
    id: "12",
    text: "The sample is from a cassette I found in Cairo",
    angle: "process",
  },
  {
    id: "13",
    text: "Made this in one sitting. Didn't touch it again.",
    angle: "process",
  },
  {
    id: "14",
    text: "Everyone said the intro was too long. It stays.",
    angle: "contrarian",
  },
  { id: "15", text: "Play this at night. Trust me.", angle: "direct" },
  { id: "16", text: "The bass hits different on headphones", angle: "direct" },
  { id: "17", text: "Three producers turned this idea down", angle: "stakes" },
  {
    id: "18",
    text: "This is what 6 months of no sleep sounds like",
    angle: "stakes",
  },
  {
    id: "19",
    text: "I recorded the vocal on my phone. Kept it.",
    angle: "process",
  },
  { id: "20", text: "Skip to 0:32 if you're impatient", angle: "curiosity" },
  {
    id: "21",
    text: "The loudest room I ever played wanted this on repeat",
    angle: "social-proof",
  },
  { id: "22", text: "I wasn't going to release this", angle: "curiosity" },
  { id: "23", text: "Egyptian trap. No apologies.", angle: "direct" },
  { id: "24", text: "The strings are real. The rest isn't.", angle: "process" },
  {
    id: "25",
    text: "Studio version vs the demo. Which one?",
    angle: "curiosity",
  },
  {
    id: "26",
    text: "Somebody asked for the instrumental. Here it is.",
    angle: "direct",
  },
  { id: "27", text: "This one cost me a friendship", angle: "stakes" },
  { id: "28", text: "I stole this melody from a taxi radio", angle: "process" },
  {
    id: "29",
    text: "Comments said make it faster. So I did.",
    angle: "social-proof",
  },
  {
    id: "30",
    text: "You've heard the chorus. Now hear where it came from.",
    angle: "curiosity",
  },
  { id: "31", text: "Not for playlists. For 2am.", angle: "contrarian" },
  { id: "32", text: "I mixed this eleven times", angle: "process" },
  { id: "33", text: "First take. Never beat it.", angle: "process" },
  {
    id: "34",
    text: "This is the version the label didn't want",
    angle: "stakes",
  },
  { id: "35", text: "One instrument. That's it.", angle: "contrarian" },
  {
    id: "36",
    text: "The reason this works is the silence before the drop",
    angle: "process",
  },
  { id: "37", text: "Add it before it gets everywhere", angle: "direct" },
  { id: "38", text: "My most-DMed unreleased track", angle: "social-proof" },
  {
    id: "39",
    text: "I made the beat before I had the words",
    angle: "process",
  },
  { id: "40", text: "Sound on. Obviously.", angle: "direct" },
  { id: "41", text: "This didn't exist a week ago", angle: "process" },
  { id: "42", text: "The hardest four bars I've written", angle: "stakes" },
  {
    id: "43",
    text: "Everything I learned in three years is in this loop",
    angle: "process",
  },
  {
    id: "44",
    text: "No autotune. Not a flex, just a fact.",
    angle: "contrarian",
  },
  { id: "45", text: "Play it once. You'll play it again.", angle: "direct" },
  {
    id: "46",
    text: "The demo went viral. This is the real one.",
    angle: "social-proof",
  },
  { id: "47", text: "I don't usually post these", angle: "curiosity" },
  {
    id: "48",
    text: "Warning: this loop is 12 seconds and unskippable",
    angle: "curiosity",
  },
  { id: "49", text: "Recorded in a room with no treatment", angle: "process" },
  { id: "50", text: "I wrote this on the metro home", angle: "process" },
  { id: "51", text: "Best headphones you own. Now.", angle: "direct" },
  { id: "52", text: "It's the second half that gets you", angle: "curiosity" },
  {
    id: "53",
    text: "Producers: the kick is mono below 90Hz",
    angle: "process",
  },
  {
    id: "54",
    text: "This is the one my artists fight over",
    angle: "social-proof",
  },
  {
    id: "55",
    text: "I gave this beat away once. Never again.",
    angle: "stakes",
  },
  {
    id: "56",
    text: "Turn the bass up until something rattles",
    angle: "direct",
  },
  {
    id: "57",
    text: "Nobody clears samples anymore. I did.",
    angle: "contrarian",
  },
  {
    id: "58",
    text: "The vocal take that made everyone stop",
    angle: "social-proof",
  },
  {
    id: "59",
    text: "Six months old and I still can't skip it",
    angle: "curiosity",
  },
  {
    id: "60",
    text: "Full track in bio. Don't come back and say I didn't say.",
    angle: "direct",
  },
];

/** Pick n hooks, optionally constrained to one angle so a batch tests one mechanism. */
export function pickHooks(
  n: number,
  angle?: HookAngle,
  exclude: string[] = [],
): Hook[] {
  const pool = HOOKS.filter(
    (h) => !exclude.includes(h.id) && (!angle || h.angle === angle),
  );
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

/** The exact command to render this batch with scripts/ugc_reel_gen.py */
export function batchCommand(
  campaign: string,
  count: number,
  angle?: HookAngle,
  track?: string,
) {
  const slug = (campaign || "campaign").toLowerCase().replace(/\s+/g, "-");
  return [
    "python3 scripts/ugc_reel_gen.py",
    `--campaign ${slug}`,
    `--count ${count}`,
    angle ? `--angle ${angle}` : "",
    track ? `--track "${track}"` : "",
  ]
    .filter(Boolean)
    .join(" ");
}

/** Creator brief, per knowledge/prompts/UGC_HOOK_GENERATOR.md — under 200 words on purpose. */
export function creatorBrief(opts: {
  creator?: string;
  track: string;
  artist: string;
  hook: string;
  link?: string;
  deadline?: string;
}) {
  return `CREATOR BRIEF${opts.creator ? ` — ${opts.creator}` : ""}

Track: ${opts.track} — ${opts.artist}
Sound to use: search "${opts.track}" and pick the official sound. Not a trending sound.

THE ONE THING
Open on this hook, on screen, within the first second:
"${opts.hook}"

DO
· Vertical 1080x1920, shot on a phone, unpolished is fine
· On-screen captions
· Let the track play — don't talk over the drop
· Post between 6–9pm local

DON'T
· Don't over-produce it
· Don't use a different sound
· Don't add your own music bed
· Don't post without the hook on screen

DELIVERABLE
1× 15s vertical video, ${opts.deadline ? `by ${opts.deadline}` : "within 5 days"}.
Link: ${opts.link || "[pre-save / smart link]"}

HOW THIS IS MEASURED
3-second retention, not views. Views measure distribution; 3s retention measures
whether the hook worked, which is the only thing we changed.`;
}
