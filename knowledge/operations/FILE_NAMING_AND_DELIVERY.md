# File Naming, Versioning & Delivery

Boring, and it will save you a lawsuit or a lost master eventually.

## Naming convention

```
ARTIST_TITLE_VERSION_BPM_KEY_YYYYMMDD.ext

MARWAN_NIGHTDRIVE_MIX-V3_128_Fmin_20260714.wav
MARWAN_NIGHTDRIVE_INSTRUMENTAL_128_Fmin_20260714.wav
MARWAN_NIGHTDRIVE_MASTER-FINAL_128_Fmin_20260721.wav
```

Rules:
- Uppercase, underscores, no spaces, no accents, no `#` or `&`
- Never the word `final` without a date; `MASTER-FINAL` + date is allowed
- Version numbers never reset
- The date is the render date, not the session date

## Delivery pack (what a client/DSP/sync agent gets)

| Item | Format | Always? |
|---|---|---|
| Master | 24-bit / 48kHz WAV | Yes |
| Streaming master | −14 LUFS integrated | Yes |
| Instrumental | Same spec | Yes |
| Clean / radio edit | Same spec | If any explicit content |
| Stems | 24-bit WAV, consistent start point | On request / sync |
| Artwork | 3000×3000 PNG/JPG, no text bleed | Yes |
| Metadata sheet | ISRC, UPC, writers, splits, PRO | Yes |
| Licence / usage terms | PDF | Yes for client work |

## Storage

- Masters and stems → Supabase Storage `audio` bucket via `/audio`
- Contracts, split sheets, licences → `contracts` bucket via `/vault`
- Artwork → `art` bucket
- Nothing important lives only on a laptop or only in a DM

## Retention

Keep session files for at least the term of the longest licence granted, plus
3 years. Sync clients come back years later asking for an alternate mix.

## Checklist

- [ ] Naming convention applied to every render
- [ ] Instrumental exists for every release
- [ ] Metadata sheet accompanies every delivery
- [ ] Everything uploaded to Storage, not just local
