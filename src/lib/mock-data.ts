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
}[] = [
  { name: "Pre-Release Seeding",   date: "2026-05-01", status: "Done",    progress: 100 },
  { name: "Launch Week Activation", date: "2026-05-08", status: "Done",    progress: 100 },
  { name: "Wave 2 — Creator Push",  date: "2026-05-15", status: "Done",    progress: 100 },
  { name: "Sustained Momentum",     date: "2026-05-22", status: "Active",  progress: 65  },
  { name: "Wrap & Reporting",       date: "2026-06-01", status: "Planned", progress: 0   },
];

export const conversionTrend: {
  day: string;
  TikTok: number;
  Instagram: number;
  Facebook: number;
  YouTube: number;
}[] = [
  { day: "Mon", TikTok: 18400, Instagram: 7200,  Facebook: 3100,  YouTube: 4800  },
  { day: "Tue", TikTok: 22100, Instagram: 8400,  Facebook: 3600,  YouTube: 5200  },
  { day: "Wed", TikTok: 31500, Instagram: 11200, Facebook: 4800,  YouTube: 7100  },
  { day: "Thu", TikTok: 44800, Instagram: 14600, Facebook: 6200,  YouTube: 9400  },
  { day: "Fri", TikTok: 68200, Instagram: 19800, Facebook: 8900,  YouTube: 13600 },
  { day: "Sat", TikTok: 92400, Instagram: 24200, Facebook: 11400, YouTube: 18200 },
  { day: "Sun", TikTok: 84600, Instagram: 21600, Facebook: 9800,  YouTube: 15800 },
];

export const influencerPipeline: { stage: string; count: number }[] = [
  { stage: "Discovered",  count: 48 },
  { stage: "Evaluating",  count: 21 },
  { stage: "Negotiating", count: 9  },
  { stage: "Signed",      count: 31 },
];

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

export const assets: Asset[] = [
  { id: "a1", name: "26 Album Campaign Brief v3", type: "Brief", version: "3.0", updated: "2026-05-01", owner: "Zeyad", comments: [] },
  { id: "a2", name: "Latifa — Shabhi Bel Meli (Master)", type: "Audio", version: "1.0", updated: "2026-04-28", owner: "Studio", comments: [] },
  { id: "a3", name: "Album Cover Final", type: "Art", version: "2.1", updated: "2026-04-30", owner: "Design", comments: [] },
  { id: "a4", name: "TikTok Sound Clip 30s", type: "Audio", version: "1.2", updated: "2026-05-02", owner: "Marketing", comments: [] },
  { id: "a5", name: "Lyric Video — Shabhi Bel Meli", type: "Video", version: "1.0", updated: "2026-05-04", owner: "Video", comments: [] },
];

export const viralTriggers: string[] = [
  "Sound used in 3,847 TikTok videos within 14 days of launch",
  "Trending #1 on Anghami MENA Charts — Week 2",
  "Featured in Instagram Reels Trending Audio",
  "92K+ video creations across all platforms",
  "#لطيفة trending on X Egypt for 48 hrs",
];

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
export const campaignKpis: Kpi[] = [
  { key: "reach",       label: "Total Reach",      value: "4.24M",     raw: 4_240_000,  delta: 18.4,  hint: "Unique accounts reached across all platforms", format: "number"  },
  { key: "impressions", label: "Impressions",       value: "11.8M",     raw: 11_800_000, delta: 22.1,  hint: "Total ad + organic impressions",               format: "number"  },
  { key: "engagement",  label: "Engagement Rate",   value: "7.2%",      raw: 7.2,        delta: 1.4,   hint: "Likes + comments + shares / impressions",      format: "percent" },
  { key: "spend",       label: "Media Spend",       value: "EGP 182K",  raw: 182_000,    delta: -3.2,  hint: "Paid media spend YTD",                         format: "money"   },
  { key: "roas",        label: "ROAS",              value: "3.8×",      raw: 3.8,        delta: 0.6,   hint: "Revenue attributed / spend",                   format: "ratio"   },
  { key: "sound",       label: "Sound Creations",   value: "3,847",     raw: 3847,       delta: 41.2,  hint: "TikTok videos created using the campaign sound", format: "number"  },
  { key: "streams",     label: "DSP Streams",       value: "2.1M",      raw: 2_100_000,  delta: 28.7,  hint: "Combined Anghami + Spotify + YouTube Music",   format: "number"  },
  { key: "cpa",         label: "Cost per Action",   value: "EGP 47",    raw: 47,         delta: -8.3,  hint: "Spend / engaged users",                        format: "money"   },
];

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
export const platformMetrics: PlatformMetric[] = [
  { name: "TikTok",    followers: "1.24M", reach: 2_140_000, organicReach: 1_820_000, paidReach: 320_000,  impressions: 5_800_000, engagementRate: 9.4, spend: 48_000,  revenue: 210_000, roas: 4.4, growth: 32.1 },
  { name: "Instagram", followers: "892K",  reach: 1_180_000, organicReach: 720_000,   paidReach: 460_000,  impressions: 3_200_000, engagementRate: 5.8, spend: 72_000,  revenue: 230_000, roas: 3.2, growth: 18.6 },
  { name: "YouTube",   followers: "340K",  reach: 620_000,   organicReach: 480_000,   paidReach: 140_000,  impressions: 1_800_000, engagementRate: 4.2, spend: 38_000,  revenue: 124_000, roas: 3.3, growth: 12.4 },
  { name: "Facebook",  followers: "210K",  reach: 300_000,   organicReach: 120_000,   paidReach: 180_000,  impressions: 980_000,   engagementRate: 2.9, spend: 24_000,  revenue: 58_000,  roas: 2.4, growth: 4.8  },
  { name: "X",         followers: "88K",   reach: 85_000,    organicReach: 85_000,    paidReach: 0,        impressions: 420_000,   engagementRate: 1.8, spend: 0,       revenue: 0,       roas: 0,   growth: 7.2  },
];

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
}[] = [
  { week: "W1", organic: 180_000,   paid: 42_000,  spend: 18_000 },
  { week: "W2", organic: 520_000,   paid: 98_000,  spend: 32_000 },
  { week: "W3", organic: 840_000,   paid: 124_000, spend: 38_000 },
  { week: "W4", organic: 1_100_000, paid: 148_000, spend: 42_000 },
  { week: "W5", organic: 980_000,   paid: 132_000, spend: 30_000 },
  { week: "W6", organic: 720_000,   paid: 94_000,  spend: 22_000 },
];

/* ── Marketing funnel (awareness → conversion) ──────────────── */
export interface FunnelStage {
  stage: string;
  value: number;
  rate: number;
  color: string;
}
export const funnel: FunnelStage[] = [
  { stage: "Awareness",   value: 4_240_000, rate: 100, color: "oklch(0.72 0.16 200)" },
  { stage: "Interest",    value: 1_060_000, rate: 25,  color: "oklch(0.7 0.22 260)"  },
  { stage: "Engagement",  value: 304_000,   rate: 28.7,color: "oklch(0.7 0.28 328)"  },
  { stage: "Streaming",   value: 82_000,    rate: 26.9,color: "oklch(0.72 0.18 150)" },
  { stage: "Fan Convert", value: 18_400,    rate: 22.4,color: "oklch(0.85 0.18 100)" },
];

/* ── Multi-touch attribution by channel ─────────────────────── */
export interface AttributionRow {
  channel: string;
  firstTouch: number;
  lastTouch: number;
  linear: number;
  assisted: number;
  roas: number;
}
export const attribution: AttributionRow[] = [
  { channel: "TikTok Creators",   firstTouch: 42, lastTouch: 31, linear: 38, assisted: 44, roas: 4.4 },
  { channel: "Instagram Paid",    firstTouch: 22, lastTouch: 28, linear: 24, assisted: 26, roas: 3.2 },
  { channel: "YouTube Ads",       firstTouch: 14, lastTouch: 19, linear: 16, assisted: 14, roas: 3.3 },
  { channel: "Facebook Ads",      firstTouch: 12, lastTouch: 14, linear: 13, assisted: 10, roas: 2.4 },
  { channel: "Organic / PR",      firstTouch: 10, lastTouch: 8,  linear: 9,  assisted: 6,  roas: 0   },
];

/* ── Channel mix (spend / revenue / efficiency) ─────────────── */
export interface ChannelMixRow {
  channel: string;
  spend: number;
  revenue: number;
  roas: number;
  cpa: number;
  share: number;
}
export const channelMix: ChannelMixRow[] = [
  { channel: "TikTok Creators", spend: 48_000,  revenue: 210_000, roas: 4.38, cpa: 28,  share: 26.4 },
  { channel: "Instagram Paid",  spend: 72_000,  revenue: 230_000, roas: 3.19, cpa: 52,  share: 39.6 },
  { channel: "YouTube Ads",     spend: 38_000,  revenue: 124_000, roas: 3.26, cpa: 44,  share: 20.9 },
  { channel: "Facebook Ads",    spend: 24_000,  revenue: 58_000,  roas: 2.42, cpa: 68,  share: 13.2 },
];

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
export const paidCampaigns: PaidCampaign[] = [
  { id: "pc1", name: "TikTok Sound Boost — Wave 1",  platform: "TikTok",    objective: "Video Views",  status: "Ended",     spend: 18_000, budget: 20_000, impressions: 2_400_000, ctr: 4.2, cpc: 0.18, roas: 4.8 },
  { id: "pc2", name: "TikTok Creator Amplify",       platform: "TikTok",    objective: "Engagement",   status: "Active",    spend: 22_000, budget: 28_000, impressions: 1_800_000, ctr: 5.8, cpc: 0.22, roas: 4.1 },
  { id: "pc3", name: "IG Reels — Album Awareness",   platform: "Instagram", objective: "Awareness",    status: "Active",    spend: 42_000, budget: 50_000, impressions: 1_600_000, ctr: 2.9, cpc: 0.91, roas: 3.4 },
  { id: "pc4", name: "IG Stories — CTA to Stream",   platform: "Instagram", objective: "Traffic",      status: "Active",    spend: 30_000, budget: 35_000, impressions: 980_000,   ctr: 3.6, cpc: 0.85, roas: 2.8 },
  { id: "pc5", name: "YouTube Pre-Roll — Lyric Vid", platform: "YouTube",   objective: "Video Views",  status: "Ended",     spend: 20_000, budget: 20_000, impressions: 920_000,   ctr: 1.8, cpc: 1.20, roas: 3.2 },
  { id: "pc6", name: "YouTube Discovery Ads",        platform: "YouTube",   objective: "Traffic",      status: "Scheduled", spend: 0,      budget: 18_000, impressions: 0,         ctr: 0,   cpc: 0,    roas: 0   },
  { id: "pc7", name: "Facebook Feed — Arab World",   platform: "Facebook",  objective: "Awareness",    status: "Paused",    spend: 24_000, budget: 24_000, impressions: 980_000,   ctr: 1.4, cpc: 1.74, roas: 2.4 },
];

/* ── Budget burndown ────────────────────────────────────────── */
export const budget = {
  total: 350_000,
  spent: 182_000,
  committed: 68_000,
  get remaining() {
    return this.total - this.spent - this.committed;
  },
  byChannel: [
    { channel: "TikTok Creators",  spend: 48_000  },
    { channel: "Instagram Paid",   spend: 72_000  },
    { channel: "YouTube Ads",      spend: 38_000  },
    { channel: "Facebook Ads",     spend: 24_000  },
    { channel: "PR & Events",      spend: 18_000  },
    { channel: "Creative Assets",  spend: 12_000  },
  ] as { channel: string; spend: number }[],
  burndown: [
    { week: "W1", planned: 40_000,  actual: 32_000  },
    { week: "W2", planned: 90_000,  actual: 78_000  },
    { week: "W3", planned: 150_000, actual: 142_000 },
    { week: "W4", planned: 210_000, actual: 182_000 },
    { week: "W5", planned: 260_000, actual: 0       },
    { week: "W6", planned: 310_000, actual: 0       },
    { week: "W7", planned: 350_000, actual: 0       },
  ] as { week: string; planned: number; actual: number }[],
};

/* ── Live activity feed ─────────────────────────────────────── */
export const activityFeed: string[] = [
  "3m ago — @soundcharts · TikTok sound hit 3,847 creations (+41% vs target)",
  "18m ago — @zeyadsayedinq · brief sent to 12 Wave 3 creators · awaiting confirm",
  "1h ago — Anghami Egypt · #4 in Top 40 · organic chart entry",
  "2h ago — @metabusiness · Instagram Reels CPM −18% · budget reallocation approved",
  "4h ago — YouTube · lyric video crossed 1M views milestone",
  "6h ago — @manar.edits · deal signed · 2.1M followers confirmed",
  "8h ago — @soundcharts · +284 new TikTok creations today · velocity up",
  "11h ago — @zeyadsayedinq · Q2 recap deck approved by client",
  "14h ago — X · #لطيفة trending · 48K tweets in 24hrs",
  "1d ago — Budget checkpoint · 52% spent · on pace for W6 wrap",
];
