# Royalty Splits & Accounting

## The two copyrights

| | Master (sound recording) | Composition (publishing) |
|---|---|---|
| Owned by | Artist / label | Writers / publishers |
| Paid by | DSPs via distributor | PROs, MROs, publishers |
| Typical latency | 60–120 days | 6–18 months |
| Where it lives in RIPPL | `/releases`, `/vault` | `/vault` split sheets |

Confusing these is the single most expensive mistake independent operators make.
A "50/50 split" that doesn't specify *which* copyright is not an agreement.

## Split sheet — minimum fields

- Track title, ISRC (when assigned), date of session
- Every contributor: legal name, role, PRO affiliation, IPI/CAE where known
- Writer share % (must total 100)
- Publisher share % (must total 100)
- Master share % (must total 100) — separate line, always
- Signatures + date

RIPPL generates and stores this via `/vault` (`ROYALTY_SPLIT_SHEET.csv` template
in `knowledge/templates/`).

## Rules

1. **Sign in the room.** A split sheet signed after a track performs is a
   negotiation, not a record.
2. **Samples and interpolations get cleared before release**, not after a claim.
3. **Producer points ≠ writer share.** Document both explicitly.
4. **Content-ID claims are revenue, not spam.** Check the badge in `/releases`.
5. **Reconcile quarterly.** Distributor statement vs `/dashboard` vs invoices.

## Accounting hygiene

| Item | Cadence |
|---|---|
| Distributor statement download | Monthly |
| PRO statement check | Quarterly |
| Split-sheet completeness audit | Per release |
| Contract expiry sweep | `/vault` alerts, ≤ 30 days |
| Invoice ageing review | Weekly |

## Checklist

- [ ] Every released track has a signed split sheet
- [ ] Master and publishing splits recorded separately
- [ ] Samples cleared pre-release
- [ ] Statements reconciled quarterly
