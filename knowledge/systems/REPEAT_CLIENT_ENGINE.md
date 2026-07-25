# Repeat Client Engine

Acquisition is the expensive part. This system exists to make the second, third
and fourth transaction near-free. Applies to custom work, mixes, sync clients,
brand partners and managed artists alike.

## The economics

If acquisition cost is `A` and margin per job is `M`:
- One-off client contributes `M − A`
- Client with `n` jobs contributes `nM − A`

At `n = 3` most service businesses go from marginal to healthy. Everything below
is in service of moving `n` from 1 to 3.

## The four touchpoints

| When | Touch | Channel | Automate in |
|---|---|---|---|
| On delivery | Delivery note + "what's next" line | Email | `/invoices` |
| +14 days | Check-in: how did it perform? | Email/DM | `/invoices` follow-up flag |
| +45 days | Relevant offer (not a generic "hi") | Email | `templates/CLIENT_PIPELINE.csv` |
| +90 days | Reactivation with a reason (new pack, seasonal, price change) | Email | `/affiliates` referral ask |

## Reactivation triggers that work

- A new capability that solves their *previous* complaint
- Seasonal window they've bought in before (same month last year)
- Their own release cycle — check `/calendar`
- Price/packaging change with a stated end date

## Referral ask

Ask once, at peak satisfaction: immediately after a successful delivery, never in
the same message as an invoice. Route through `/affiliates` so the referrer gets a
tracked link and a real payout — an untracked referral programme is a favour, and
favours don't compound.

## Checklist

- [ ] Every delivery includes a next-step line
- [ ] +14/+45/+90 follow-ups exist as flags, not as memory
- [ ] Referral ask happens at delivery, not at invoice
- [ ] Repeat rate (`n≥2` clients / total clients) reported monthly
