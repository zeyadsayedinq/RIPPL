# Low Budget Promo Model

For campaigns under ~$500/month. Adapted from `parrsi01/Music`'s Low Budget Promo
Model, restructured around RIPPL's `/budget` and `/channels` surfaces.

## Allocation

| Bucket | % | Purpose |
|---|---|---|
| Creative volume | 45% | 12+ hooks, batch-rendered — the only real lever at this level |
| Amplification | 30% | Boost *only* organic winners (≥ median 3s retention) |
| Creator seeding | 15% | Micro-creators, product/track-in-hand, no flat fees where avoidable |
| Reserve | 10% | Reactive spend on anything that unexpectedly moves |

## The rule that matters

**Never boost cold.** At this budget, paid is a multiplier on proven organic, not
a discovery mechanism. A post that failed organically will fail more expensively.

Threshold to boost: post is in the top 25% of your own last 20 posts on 3-second
retention. Everything else is data, not inventory.

## Weekly loop

1. Monday — render 4 new hook variants (`scripts/ugc_reel_gen.py`)
2. Tue–Thu — post 1/day organically across two platforms
3. Friday — read retention; pick 1 winner
4. Weekend — put the amplification bucket behind that single winner
5. Log spend + result in `/budget` as a line with the hook ID in the category

## What not to buy at this level

- Playlist placement services (unverifiable, frequently fraudulent, DSP-flaggable)
- Follower/stream packages (account risk, zero conversion)
- Flat-fee macro creators (no attribution at this budget)
- Broad awareness campaigns with no landing surface

## Checklist

- [ ] 12 hooks live before any spend
- [ ] Nothing boosted cold
- [ ] Every spend line tagged with the creative ID in `/budget`
- [ ] Weekly winner picked on retention, not likes
