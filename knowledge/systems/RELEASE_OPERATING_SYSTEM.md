# Release Operating System (ROS)

An 8-week, gate-based release process. Every row has an owner and a RIPPL surface.
This is the master system; the checklists are its run-lists.

## Timeline

| Week | Gate | Must be true to pass | Surface |
|---|---|---|---|
| −8 | **Lock** | Final master + artwork approved; ISRC/UPC assigned | `/releases` wizard step 1–2 |
| −7 | **QA** | Atmos + EQ QA toggles green; loudness checked | `/releases` step 4 |
| −6 | **Distribute** | Delivered to DSPs; Content-ID badge green | `/releases` catalog |
| −5 | **Pitch** | Spotify/Anghami pitch submitted with full metadata | `checklists/DSP_PITCH_CHECKLIST.md` |
| −4 | **Assets** | 12 UGC hooks scripted; 8 clips rendered | `/studio`, `data/hooks.csv` |
| −3 | **Budget** | Spend plan per channel entered and approved | `/budget`, `/channels` |
| −2 | **Creators** | Creator list confirmed; briefs sent | `/creators` |
| −1 | **Dry run** | Links tested; one-pager PDF generated; team briefed | `/releases` one-pager |
| 0 | **Release day** | Run the day checklist top to bottom | `checklists/RELEASE_DAY_CHECKLIST.md` |
| +1 | **Read** | D7 numbers vs plan; kill/scale decision made | `/dashboard` |
| +4 | **Post-mortem** | Written and committed to `knowledge/` | — |

## Gate rule

A gate that is missed does not compress the following weeks — it **moves the
release date**. Compressing a release schedule is the most reliable way to burn
budget for nothing. Move the date in `/calendar` and tell the team the same day.

## Roles

| Role | Owns |
|---|---|
| Release lead | Gates, date, go/no-go |
| A&R | Master, artwork, artist comms |
| Marketing | Budget, channels, creators |
| Ops | Metadata, distribution, Content-ID |
| Legal | Splits, licences, clearances |

## Minimum viable release (when you have 3 weeks, not 8)

Cut in this order: creator campaign → paid → extra creative variants.
**Never cut:** metadata QA, split sheet, DSP pitch. Those three are non-negotiable.

## Checklist

- [ ] Date is in `/calendar` and every gate has a named owner
- [ ] Pitch submitted ≥ 4 weeks out
- [ ] ≥ 8 creative variants exist before spend starts
- [ ] Budget lines entered in `/budget` before spend, not after
- [ ] Post-mortem written within 30 days
