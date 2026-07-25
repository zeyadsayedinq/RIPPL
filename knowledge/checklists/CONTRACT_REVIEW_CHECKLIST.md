# Contract Review Checklist

Not legal advice — a triage list so you know what to ask a lawyer about. Store
every executed agreement in `/vault` with an expiry date so the alert engine
catches renewals.

## Identify
- [ ] Correct legal names of all parties (not artist names)
- [ ] Which copyright(s) the agreement covers: master, composition, or both
- [ ] Effective date and term length
- [ ] Territory
- [ ] Governing law and dispute venue

## Money
- [ ] Royalty rate, and rate *base* (gross vs net receipts — this is where deals go wrong)
- [ ] Advance, and whether it is recoupable and cross-collateralised
- [ ] Deductions permitted (distribution fees, marketing, packaging)
- [ ] Accounting frequency and audit rights
- [ ] Payment timing and currency

## Control
- [ ] Approval rights: artwork, remixes, sync, edits
- [ ] Exclusivity scope
- [ ] Re-recording restriction and its duration
- [ ] Key-person clause
- [ ] What happens on assignment / sale of the counterparty

## Exit
- [ ] Term end and any automatic renewal (flag any auto-renew loudly)
- [ ] Reversion of rights — when, and on what condition
- [ ] Termination for cause, and cure period
- [ ] Post-term obligations

## Red flags
- [ ] Perpetuity + exclusivity together
- [ ] "Net receipts" undefined
- [ ] Unlimited deductions at the counterparty's discretion
- [ ] No audit right
- [ ] Auto-renewing term with no notice window
- [ ] Sync rights granted without a separate fee mechanism

## Filing
- [ ] Uploaded to `/vault` with the correct tag
- [ ] Expiry date entered so the ≤30-day alert fires
- [ ] Signature status tracked (sent / signed / declined)
- [ ] Counterparty contact recorded
