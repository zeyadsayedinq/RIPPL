export type Tier = "Featured" | "Mega" | "Macro" | "Mid" | "Micro";
export type Platform =
  | "TikTok"
  | "Instagram"
  | "Facebook"
  | "YouTube"
  | "X"
  | "LinkedIn"
  | "Snapchat"
  | "Threads"
  | "Pinterest";
export type Status = "Confirmed" | "Pending" | "Priced" | "Rejected";

export interface CreatorMessage {
  id: string;
  from: "manager" | "creator";
  text: string;
  time: string;
}

export interface Creator {
  id: string;
  name: string;
  handle: string;
  platform: Platform;
  tier: Tier;
  followers: number;
  avgViews: number;
  engagement: number;
  price: number;
  status: Status;
  city: string;
  /** Link to the creator's deliverable (TikTok/Instagram video URL, etc). */
  deliverableUrl?: string;
  /** Supabase Storage path for a directly-uploaded deliverable file (video). */
  deliverablePath?: string;
  deliverableFileName?: string;
  /** Once the creator's video is actually live/public, the real post URL —
   *  distinct from deliverableUrl (which may be set before it's live).
   *  Powers the real oEmbed preview (see lib/oembed.ts) so HQ can compare
   *  "what we approved" (the uploaded file above) vs "what actually got
   *  posted". */
  livePostUrl?: string;
  /** Lightweight in-app message log with this creator (Approve/Reject/Message panel). */
  messages?: CreatorMessage[];
}

/* Influencer roster — from Latifa_Proposal_2026.pdf (97 vetted Egyptian
   TikTok creators, MyContent/Imad Alawadeh, issued Jul 9 2026). Name,
   handle, follower count and tier are straight from that proposal.
   avgViews/engagement/price are NOT in the source document — they're
   estimated placeholders (tier-based view ratio + engagement rate, loosely
   varied per creator) so the roster is usable immediately. Replace them
   with real rate-card numbers as you negotiate each creator. Three
   creators (Haya Abdelghany, Nehal Rashad, Yasmin Ahmed) had "TBC" follower
   counts in the proposal — flagged inline below with a placeholder value.

   This is the SEED roster only, used to initialize the persisted
   `creators` collection in os-store.tsx the first time an account loads
   (before any edits/additions exist). Once loaded, the live, editable copy
   lives in os-store's `creators` state (saved to Supabase/localStorage) —
   don't import this array directly to read/display creators; use
   `useOS().creators` instead. */
export const seedCreators: Creator[] = [
  {
    id: "1",
    name: "Pasmala",
    handle: "@pasmala24",
    platform: "TikTok",
    tier: "Featured",
    followers: 5100000,
    avgViews: 1020000,
    engagement: 12.1,
    price: 15000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "2",
    name: "Zyad Elshazly",
    handle: "@zyad_elshazly",
    platform: "TikTok",
    tier: "Featured",
    followers: 2600000,
    avgViews: 780000,
    engagement: 11.8,
    price: 80000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "3",
    name: "Bassant",
    handle: "@bassant33",
    platform: "Instagram",
    tier: "Featured",
    followers: 7100000,
    avgViews: 710000,
    engagement: 9.2,
    price: 15000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "4",
    name: "Haneen Hena",
    handle: "@haneenhena",
    platform: "TikTok",
    tier: "Featured",
    followers: 3900000,
    avgViews: 585000,
    engagement: 10.5,
    price: 20000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "5",
    name: "Renad Mohammed",
    handle: "@renaddmuhammed",
    platform: "Instagram",
    tier: "Featured",
    followers: 3500000,
    avgViews: 350000,
    engagement: 8.9,
    price: 8000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "6",
    name: "Sandiiyy",
    handle: "@sandiiyy_",
    platform: "TikTok",
    tier: "Featured",
    followers: 1300000,
    avgViews: 325000,
    engagement: 11.2,
    price: 5000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "7",
    name: "Sherif Khalid",
    handle: "@sherifkhalidd",
    platform: "TikTok",
    tier: "Mega",
    followers: 11200000,
    avgViews: 3360000,
    engagement: 13.4,
    price: 15000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "8",
    name: "Ozooo19",
    handle: "@ozooo19",
    platform: "TikTok",
    tier: "Mega",
    followers: 10600000,
    avgViews: 3180000,
    engagement: 12.8,
    price: 8000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "9",
    name: "Abdullah El Tourky",
    handle: "@abdullah_eltourky",
    platform: "Instagram",
    tier: "Macro",
    followers: 9700000,
    avgViews: 873000,
    engagement: 8.5,
    price: 80000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "10",
    name: "Shehab Eldin",
    handle: "@shehab.eldin",
    platform: "Instagram",
    tier: "Macro",
    followers: 8900000,
    avgViews: 801000,
    engagement: 8.2,
    price: 20000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "11",
    name: "Gehad Hassan",
    handle: "@gehadhassann",
    platform: "Instagram",
    tier: "Macro",
    followers: 8700000,
    avgViews: 783000,
    engagement: 8.4,
    price: 15000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "12",
    name: "Haidy Kamel",
    handle: "@haidyykamel",
    platform: "Instagram",
    tier: "Macro",
    followers: 6400000,
    avgViews: 576000,
    engagement: 7.8,
    price: 70000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "13",
    name: "Malak Abdelnaby",
    handle: "@malakabdelnaby3",
    platform: "Instagram",
    tier: "Macro",
    followers: 6900000,
    avgViews: 621000,
    engagement: 8.1,
    price: 25000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "14",
    name: "Mayar Nagiib",
    handle: "@mayare.nagiib",
    platform: "TikTok",
    tier: "Macro",
    followers: 2800000,
    avgViews: 560000,
    engagement: 9.8,
    price: 7000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "15",
    name: "Shahd Mohamed",
    handle: "@shahd_m7amed1",
    platform: "Instagram",
    tier: "Macro",
    followers: 1900000,
    avgViews: 285000,
    engagement: 7.2,
    price: 5000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "16",
    name: "Heba Khalid",
    handle: "@wwwhabo.comm",
    platform: "TikTok",
    tier: "Macro",
    followers: 2400000,
    avgViews: 432000,
    engagement: 9.5,
    price: 10000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "17",
    name: "Haneen (xx_haneen)",
    handle: "@xx_haneen0_1xx",
    platform: "TikTok",
    tier: "Mid",
    followers: 5800000,
    avgViews: 1160000,
    engagement: 10.3,
    price: 20000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "18",
    name: "Moonly",
    handle: "@momeenalaa",
    platform: "TikTok",
    tier: "Mid",
    followers: 4100000,
    avgViews: 656000,
    engagement: 10.1,
    price: 12000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "19",
    name: "Bombenoz",
    handle: "@Bombenoz",
    platform: "TikTok",
    tier: "Mid",
    followers: 4400000,
    avgViews: 880000,
    engagement: 11.2,
    price: 8000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "20",
    name: "Nancy Yasser",
    handle: "@nancyy.yasserr",
    platform: "TikTok",
    tier: "Mid",
    followers: 3100000,
    avgViews: 465000,
    engagement: 9.8,
    price: 8000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "21",
    name: "Rahma Ayman",
    handle: "@rahmaaayman_",
    platform: "Instagram",
    tier: "Mid",
    followers: 593900,
    avgViews: 89085,
    engagement: 7.1,
    price: 5000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "22",
    name: "Salwa Hijazi",
    handle: "@salwahijazi_",
    platform: "Instagram",
    tier: "Mid",
    followers: 1400000,
    avgViews: 280000,
    engagement: 8.2,
    price: 5000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "23",
    name: "Rahma Waled",
    handle: "@rahmawaled230",
    platform: "TikTok",
    tier: "Mid",
    followers: 2000000,
    avgViews: 400000,
    engagement: 9.4,
    price: 5000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "24",
    name: "Romisaa Faried",
    handle: "@romisaafaried.official",
    platform: "Instagram",
    tier: "Mid",
    followers: 1600000,
    avgViews: 320000,
    engagement: 8.3,
    price: 5000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "25",
    name: "Dahab Elmessiri",
    handle: "@dahabelmessiri",
    platform: "TikTok",
    tier: "Mid",
    followers: 1700000,
    avgViews: 340000,
    engagement: 9.1,
    price: 6000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "26",
    name: "Hamo Elkot",
    handle: "@hamoelkot74",
    platform: "TikTok",
    tier: "Mid",
    followers: 1300000,
    avgViews: 260000,
    engagement: 8.9,
    price: 6000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "27",
    name: "Sohila Alia",
    handle: "@sohilaqotb1",
    platform: "Instagram",
    tier: "Mid",
    followers: 1100000,
    avgViews: 220000,
    engagement: 7.8,
    price: 4000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "28",
    name: "Donia Doka",
    handle: "@doniadoka_official",
    platform: "TikTok",
    tier: "Mid",
    followers: 1400000,
    avgViews: 280000,
    engagement: 8.6,
    price: 7000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "29",
    name: "Eslam Atef Saed",
    handle: "@eslamatefsaed_",
    platform: "TikTok",
    tier: "Mid",
    followers: 1800000,
    avgViews: 360000,
    engagement: 9.2,
    price: 8000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "30",
    name: "Mayaa Felfel",
    handle: "@mayaafelfel",
    platform: "TikTok",
    tier: "Micro",
    followers: 163400,
    avgViews: 49020,
    engagement: 11.8,
    price: 7000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "31",
    name: "Lujain Kamell",
    handle: "@lujainkamell",
    platform: "Instagram",
    tier: "Micro",
    followers: 650700,
    avgViews: 130140,
    engagement: 8.5,
    price: 5000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "32",
    name: "Youssef Khaled",
    handle: "@yousseff.khaled",
    platform: "TikTok",
    tier: "Micro",
    followers: 10700,
    avgViews: 3210,
    engagement: 9.8,
    price: 3000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "33",
    name: "Ahmed Nagy",
    handle: "@ahmednagy1010",
    platform: "TikTok",
    tier: "Mid",
    followers: 1500000,
    avgViews: 450000,
    engagement: 10.2,
    price: 15000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "34",
    name: "Ebram Saeed",
    handle: "@ebramsaed1",
    platform: "TikTok",
    tier: "Mid",
    followers: 1200000,
    avgViews: 360000,
    engagement: 9.5,
    price: 20000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "35",
    name: "Rehab Ali",
    handle: "@_rehab_alii0",
    platform: "TikTok",
    tier: "Micro",
    followers: 500000,
    avgViews: 125000,
    engagement: 8.1,
    price: 3000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "36",
    name: "Nada Mahmoud",
    handle: "@nada_mahmooud1",
    platform: "TikTok",
    tier: "Micro",
    followers: 350000,
    avgViews: 87500,
    engagement: 7.4,
    price: 1500,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "37",
    name: "Sozy Ayman",
    handle: "@sozyaymann_",
    platform: "TikTok",
    tier: "Macro",
    followers: 9700000,
    avgViews: 2037000,
    engagement: 9.2,
    price: 18000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "38",
    name: "Om Khaled",
    handle: "@om_khaled92",
    platform: "TikTok",
    tier: "Macro",
    followers: 9000000,
    avgViews: 1620000,
    engagement: 7.7,
    price: 18000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "39",
    name: "Walid Sayed",
    handle: "@walid.sayed.10",
    platform: "TikTok",
    tier: "Macro",
    followers: 8400000,
    avgViews: 2184000,
    engagement: 8.1,
    price: 12000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "40",
    name: "Ashraf Alalmei",
    handle: "@ashraf_alalmei",
    platform: "TikTok",
    tier: "Macro",
    followers: 5900000,
    avgViews: 944000,
    engagement: 9.2,
    price: 18000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "41",
    name: "Mostafa Mahmoud",
    handle: "@mostafamuhmoud2",
    platform: "TikTok",
    tier: "Macro",
    followers: 5900000,
    avgViews: 1357000,
    engagement: 8.6,
    price: 13500,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "42",
    name: "Farah Roushdy",
    handle: "@farahroushdy",
    platform: "TikTok",
    tier: "Mid",
    followers: 4900000,
    avgViews: 637000,
    engagement: 8.1,
    price: 6000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "43",
    name: "HaMo ElArAbY",
    handle: "@mohamed.elaraby01",
    platform: "TikTok",
    tier: "Mid",
    followers: 4400000,
    avgViews: 1012000,
    engagement: 9.1,
    price: 8500,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "44",
    name: "Ola Masoud",
    handle: "@ola_masoud",
    platform: "TikTok",
    tier: "Mid",
    followers: 4200000,
    avgViews: 546000,
    engagement: 8.1,
    price: 6000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "45",
    name: "Ahlam Adelsobhy",
    handle: "@ahlamadelsobhy2",
    platform: "TikTok",
    tier: "Mid",
    followers: 4000000,
    avgViews: 760000,
    engagement: 9.5,
    price: 5500,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "46",
    name: "Dona Tella",
    handle: "@dona_tella2",
    platform: "TikTok",
    tier: "Mid",
    followers: 3400000,
    avgViews: 544000,
    engagement: 9.8,
    price: 7500,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "47",
    name: "Farida Sagid",
    handle: "@farida_sagid",
    platform: "TikTok",
    tier: "Mid",
    followers: 3100000,
    avgViews: 713000,
    engagement: 9,
    price: 6000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "48",
    name: "Mahmoud Redda",
    handle: "@mahmoudredda1",
    platform: "TikTok",
    tier: "Mid",
    followers: 3100000,
    avgViews: 713000,
    engagement: 9.8,
    price: 5500,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "49",
    name: "Ahmeed Gika",
    handle: "@ahmeed_gika9",
    platform: "TikTok",
    tier: "Mid",
    followers: 2900000,
    avgViews: 609000,
    engagement: 8.6,
    price: 7500,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "50",
    name: "Rawan Essam",
    handle: "@rawanessam88.official",
    platform: "TikTok",
    tier: "Mid",
    followers: 2800000,
    avgViews: 560000,
    engagement: 8.2,
    price: 6500,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "51",
    name: "Mahmoud Nasser",
    handle: "@mahmoud_nasser_otaa",
    platform: "TikTok",
    tier: "Mid",
    followers: 2800000,
    avgViews: 420000,
    engagement: 9.9,
    price: 6000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "52",
    name: "Sherouk Ussama",
    handle: "@sheroukussama12",
    platform: "TikTok",
    tier: "Mid",
    followers: 2300000,
    avgViews: 437000,
    engagement: 9.4,
    price: 6500,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "53",
    name: "Amal Salah",
    handle: "@amalsalah323",
    platform: "TikTok",
    tier: "Mid",
    followers: 2200000,
    avgViews: 330000,
    engagement: 8.5,
    price: 7500,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "54",
    name: "Heba Mabrouk",
    handle: "@heba.mabrok3",
    platform: "TikTok",
    tier: "Mid",
    followers: 2200000,
    avgViews: 418000,
    engagement: 8.4,
    price: 6000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "55",
    name: "Ganna",
    handle: "@ganna0015",
    platform: "TikTok",
    tier: "Mid",
    followers: 2100000,
    avgViews: 378000,
    engagement: 8.9,
    price: 5500,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "56",
    name: "Ayaa Jaball",
    handle: "@ayaajaballofficial",
    platform: "TikTok",
    tier: "Mid",
    followers: 2000000,
    avgViews: 460000,
    engagement: 8.4,
    price: 6000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "57",
    name: "Shaima Tariq",
    handle: "@shaimatariq00",
    platform: "TikTok",
    tier: "Mid",
    followers: 1900000,
    avgViews: 323000,
    engagement: 8.6,
    price: 7500,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "58",
    name: "Beba Badr",
    handle: "@bebaabadr",
    platform: "TikTok",
    tier: "Mid",
    followers: 1800000,
    avgViews: 270000,
    engagement: 9.9,
    price: 6000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "59",
    name: "Habiba (BIBA)",
    handle: "@habiba.fouad_",
    platform: "TikTok",
    tier: "Mid",
    followers: 1700000,
    avgViews: 357000,
    engagement: 8.3,
    price: 5500,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "60",
    name: "Bedo",
    handle: "@bedo.official",
    platform: "TikTok",
    tier: "Mid",
    followers: 1600000,
    avgViews: 304000,
    engagement: 8.2,
    price: 6500,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "61",
    name: "Salmeen Ali",
    handle: "@salmeenalii",
    platform: "TikTok",
    tier: "Mid",
    followers: 1600000,
    avgViews: 368000,
    engagement: 9.5,
    price: 5500,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "62",
    name: "Manar Maghawry",
    handle: "@manar_maghawry",
    platform: "TikTok",
    tier: "Mid",
    followers: 1600000,
    avgViews: 240000,
    engagement: 9.8,
    price: 7500,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "63",
    name: "7ad0uta",
    handle: "@7ad0uta4",
    platform: "TikTok",
    tier: "Mid",
    followers: 1600000,
    avgViews: 240000,
    engagement: 8.9,
    price: 7500,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "64",
    name: "Heba Khaliedd",
    handle: "@hebaakhaliedd_",
    platform: "TikTok",
    tier: "Mid",
    followers: 1500000,
    avgViews: 315000,
    engagement: 9.8,
    price: 5500,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "65",
    name: "Berry Ali",
    handle: "@berry_ali100",
    platform: "TikTok",
    tier: "Mid",
    followers: 1500000,
    avgViews: 195000,
    engagement: 9,
    price: 6000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "66",
    name: "Rahma Wlaila",
    handle: "@rahmawlaila",
    platform: "TikTok",
    tier: "Mid",
    followers: 1400000,
    avgViews: 210000,
    engagement: 8.6,
    price: 6500,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "67",
    name: "Mayson Mohamed",
    handle: "@maysonmohamed_officiall",
    platform: "TikTok",
    tier: "Mid",
    followers: 1400000,
    avgViews: 308000,
    engagement: 9,
    price: 6000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "68",
    name: "Lyly Family",
    handle: "@lylyfamily1",
    platform: "TikTok",
    tier: "Mid",
    followers: 1200000,
    avgViews: 180000,
    engagement: 8.8,
    price: 7500,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "69",
    name: "Saaraahmeed",
    handle: "@saaraaahmeed_1",
    platform: "TikTok",
    tier: "Mid",
    followers: 1200000,
    avgViews: 168000,
    engagement: 9.4,
    price: 6500,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "70",
    name: "Mony Gabr",
    handle: "@monygabrr",
    platform: "TikTok",
    tier: "Mid",
    followers: 1100000,
    avgViews: 154000,
    engagement: 9.3,
    price: 6000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "71",
    name: "Sou",
    handle: "@itsesrraa",
    platform: "TikTok",
    tier: "Mid",
    followers: 1100000,
    avgViews: 154000,
    engagement: 9,
    price: 8000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "72",
    name: "Sama Alwagih",
    handle: "@Samaalwagih",
    platform: "TikTok",
    tier: "Mid",
    followers: 1000000,
    avgViews: 210000,
    engagement: 8.4,
    price: 8000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "73",
    name: "Om Roqia",
    handle: "@om.roqiawfarida",
    platform: "TikTok",
    tier: "Micro",
    followers: 971600,
    avgViews: 262332,
    engagement: 9.6,
    price: 3500,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "74",
    name: "Gemy Abdelnasser",
    handle: "@gemyabdelnasser__",
    platform: "TikTok",
    tier: "Micro",
    followers: 883500,
    avgViews: 247380,
    engagement: 10.1,
    price: 3500,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "75",
    name: "Set Baheya",
    handle: "@set_baheya",
    platform: "TikTok",
    tier: "Micro",
    followers: 730000,
    avgViews: 189800,
    engagement: 10.4,
    price: 3500,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "76",
    name: "Noura Elmassry",
    handle: "@nouraelmassryy",
    platform: "TikTok",
    tier: "Micro",
    followers: 631800,
    avgViews: 145314,
    engagement: 10.7,
    price: 3000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "77",
    name: "Kaylie Eletreby",
    handle: "@kaylieeletreby",
    platform: "TikTok",
    tier: "Micro",
    followers: 587500,
    avgViews: 176250,
    engagement: 10,
    price: 2500,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "78",
    name: "Mahmoud Yassin Jr",
    handle: "@mahmoudyassinjr",
    platform: "TikTok",
    tier: "Micro",
    followers: 564200,
    avgViews: 141050,
    engagement: 11.1,
    price: 3500,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "79",
    name: "Mazen Lotfy",
    handle: "@mazen_lotfy95",
    platform: "TikTok",
    tier: "Micro",
    followers: 499800,
    avgViews: 149940,
    engagement: 11.1,
    price: 2500,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "80",
    name: "Ahmed Madaa7",
    handle: "@ahmedmadaa7",
    platform: "TikTok",
    tier: "Micro",
    followers: 466500,
    avgViews: 116625,
    engagement: 10.7,
    price: 3500,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "81",
    name: "Mostafa Seddik",
    handle: "@mseddik1",
    platform: "TikTok",
    tier: "Micro",
    followers: 462800,
    avgViews: 97188,
    engagement: 10.9,
    price: 3000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "82",
    name: "Yourfavmozza",
    handle: "@yourfavmozza",
    platform: "TikTok",
    tier: "Micro",
    followers: 426100,
    avgViews: 85220,
    engagement: 10.1,
    price: 3000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "83",
    name: "Yasmine Eyad",
    handle: "@yasminaeyadd",
    platform: "TikTok",
    tier: "Micro",
    followers: 304900,
    avgViews: 73176,
    engagement: 10.8,
    price: 3500,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "84",
    name: "Samarmostafa",
    handle: "@samarmostafa2",
    platform: "TikTok",
    tier: "Micro",
    followers: 300300,
    avgViews: 63063,
    engagement: 9.6,
    price: 2500,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "85",
    name: "Batool Wahbi",
    handle: "@batoolwahbiii",
    platform: "TikTok",
    tier: "Micro",
    followers: 145400,
    avgViews: 37804,
    engagement: 10.4,
    price: 3000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "86",
    name: "Shaimabahgat",
    handle: "@shaimabahgat",
    platform: "TikTok",
    tier: "Micro",
    followers: 144300,
    avgViews: 30303,
    engagement: 10.7,
    price: 2500,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "87",
    name: "Perry Ali",
    handle: "@perryalieissa",
    platform: "TikTok",
    tier: "Micro",
    followers: 118800,
    avgViews: 30888,
    engagement: 9.6,
    price: 3500,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "88",
    name: "Nourhan Eissa",
    handle: "@nourhanneeissa",
    platform: "TikTok",
    tier: "Micro",
    followers: 99100,
    avgViews: 25766,
    engagement: 9.5,
    price: 2500,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "89",
    name: "Khaled Hossam",
    handle: "@gamedgamed5",
    platform: "TikTok",
    tier: "Micro",
    followers: 98000,
    avgViews: 25480,
    engagement: 10.1,
    price: 3500,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "90",
    name: "Haya Abdelghany",
    handle: "@hayaabdelghani",
    platform: "TikTok",
    tier: "Micro",
    followers: 400000,
    avgViews: 96000,
    engagement: 11.5,
    price: 3000,
    status: "Confirmed",
    city: "Cairo",
  }, // follower count TBC in proposal — placeholder
  {
    id: "91",
    name: "Nehal Rashad",
    handle: "@Nehalrashad90",
    platform: "TikTok",
    tier: "Micro",
    followers: 400000,
    avgViews: 80000,
    engagement: 11.3,
    price: 2500,
    status: "Confirmed",
    city: "Cairo",
  }, // follower count TBC in proposal — placeholder
  {
    id: "92",
    name: "Yasmin Ahmed",
    handle: "@yasmin.ahmed__",
    platform: "TikTok",
    tier: "Micro",
    followers: 400000,
    avgViews: 116000,
    engagement: 9.5,
    price: 2500,
    status: "Confirmed",
    city: "Cairo",
  }, // follower count TBC in proposal — placeholder
  {
    id: "93",
    name: "Habiba Reda",
    handle: "@habibareda2210",
    platform: "TikTok",
    tier: "Macro",
    followers: 3800000,
    avgViews: 684000,
    engagement: 8.7,
    price: 14500,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "94",
    name: "Dana Zohdy",
    handle: "@dana.zohdy",
    platform: "TikTok",
    tier: "Macro",
    followers: 2400000,
    avgViews: 528000,
    engagement: 7.7,
    price: 18000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "95",
    name: "Kahraba",
    handle: "@kahraba931",
    platform: "TikTok",
    tier: "Mid",
    followers: 1100000,
    avgViews: 264000,
    engagement: 8.4,
    price: 8000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "96",
    name: "Walid Fawaz",
    handle: "@._walid.fawaz",
    platform: "TikTok",
    tier: "Mid",
    followers: 980900,
    avgViews: 147135,
    engagement: 9.3,
    price: 6000,
    status: "Confirmed",
    city: "Cairo",
  },
  {
    id: "97",
    name: "Mohamed Mekawy",
    handle: "@mohamedmekawy",
    platform: "TikTok",
    tier: "Mid",
    followers: 1500000,
    avgViews: 210000,
    engagement: 8,
    price: 5500,
    status: "Confirmed",
    city: "Cairo",
  },
];

/* ═══════════════════════════════════════════════════════════
   DATA RESET — all sample marketing content cleared.
   Only the influencer roster above is retained. Every metric,
   campaign, chart and list below is empty until real data is
   entered. Currency across the app is EGP.
═══════════════════════════════════════════════════════════ */

export const rolloutPhases: {
  name: string;
  date: string;
  status: string;
  progress: number;
}[] = [];

export const conversionTrend: {
  day: string;
  TikTok: number;
  Instagram: number;
  Facebook: number;
  YouTube: number;
}[] = [];

export const influencerPipeline: { stage: string; count: number }[] = [];

export interface Asset {
  id: string;
  name: string;
  type: "Brief" | "Audio" | "Art" | "Video";
  version: string;
  updated: string;
  owner: string;
  comments: Comment[];
}
export interface Comment {
  id: string;
  author: string;
  role: string;
  text: string;
  time: string;
}

export const assets: Asset[] = [];

export const viralTriggers: string[] = [];

/* Brand color per platform (used across tiles, charts, legends) */
export const platformColors: Record<Platform, string> = {
  TikTok: "oklch(0.72 0.16 200)",
  Instagram: "oklch(0.62 0.26 350)",
  Facebook: "oklch(0.6 0.22 264)",
  YouTube: "oklch(0.63 0.25 25)",
  X: "oklch(0.85 0.02 260)",
  LinkedIn: "oklch(0.58 0.16 245)",
  Snapchat: "oklch(0.88 0.18 100)",
  Threads: "oklch(0.75 0.02 260)",
  Pinterest: "oklch(0.58 0.24 20)",
};

/* ── Top-line campaign KPIs (the 360 header row) ────────────── */
export interface Kpi {
  key: string;
  label: string;
  value: string;
  raw: number;
  delta: number;
  hint: string;
  format?: "money" | "number" | "ratio" | "percent";
}
export const campaignKpis: Kpi[] = [];

/* ── Per-platform reach split into paid + organic ───────────── */
export interface PlatformMetric {
  name: Platform;
  followers: string;
  reach: number;
  organicReach: number;
  paidReach: number;
  impressions: number;
  engagementRate: number;
  spend: number;
  revenue: number;
  roas: number;
  growth: number;
}
export const platformMetrics: PlatformMetric[] = [];

export const platformStats = platformMetrics.slice(0, 4).map((p) => ({
  name: p.name,
  followers: p.followers,
  reach: `${(p.reach / 1_000_000).toFixed(1)}M`,
  growth: p.growth,
  color: platformColors[p.name],
}));

/* ── Paid vs Organic weekly trend ───────────────────────────── */
export const paidVsOrganic: {
  week: string;
  organic: number;
  paid: number;
  spend: number;
}[] = [];

/* ── Marketing funnel (awareness → conversion) ──────────────── */
export interface FunnelStage {
  stage: string;
  value: number;
  rate: number;
  color: string;
}
export const funnel: FunnelStage[] = [];

/* ── Multi-touch attribution by channel ─────────────────────── */
export interface AttributionRow {
  channel: string;
  firstTouch: number;
  lastTouch: number;
  linear: number;
  assisted: number;
  roas: number;
}
export const attribution: AttributionRow[] = [];

/* ── Channel mix (spend / revenue / efficiency) ─────────────── */
export interface ChannelMixRow {
  channel: string;
  spend: number;
  revenue: number;
  roas: number;
  cpa: number;
  share: number;
}
export const channelMix: ChannelMixRow[] = [];

/* ── Active paid campaigns across platforms ─────────────────── */
export interface PaidCampaign {
  id: string;
  name: string;
  platform: Platform;
  objective:
    "Awareness" | "Traffic" | "Engagement" | "Conversions" | "Video Views";
  status: "Active" | "Paused" | "Scheduled" | "Ended";
  spend: number;
  budget: number;
  impressions: number;
  ctr: number;
  cpc: number;
  roas: number;
}
export const paidCampaigns: PaidCampaign[] = [];

/* ── Budget burndown ────────────────────────────────────────── */
export const budget = {
  total: 0,
  spent: 0,
  committed: 0,
  get remaining() {
    return this.total - this.spent - this.committed;
  },
  byChannel: [] as { channel: string; spend: number }[],
  burndown: [] as { week: string; planned: number; actual: number }[],
};

/* ── Live activity feed ─────────────────────────────────────── */
export const activityFeed: string[] = [];
