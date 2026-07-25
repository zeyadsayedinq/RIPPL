# Commission Pipeline

Client-work operating system (custom tracks, mixes, backing tracks, sheet music,
edits). Model adapted from `wpwwhimself/muzyka-szyta-na-miare`, a Laravel CRM
built around commission *phases* — implemented in RIPPL as `/invoices`.

## Phases

`Inquiry → Quoted → Deposit Paid → In Progress → Review → Revisions → Delivered → Invoiced → Paid`

Each phase change is visible to the client through their share link — the single
biggest reduction in "any update?" messages you will ever make.

## Rules per phase

| Phase | Rule |
|---|---|
| Inquiry | Respond within 24h with a question, not a price |
| Quoted | Quote expires in 14 days, stated in writing |
| Deposit Paid | **No work starts before deposit lands.** 50% standard |
| In Progress | One WIP shared at ~60%, not at 95% |
| Review | Client has 7 days; silence = accepted, stated in the quote |
| Revisions | 2 rounds included, priced after; defined in the quote |
| Delivered | Files + licence + delivery note + next-step line |
| Invoiced | Balance invoice same day as delivery |
| Paid | Reconcile, then start the `REPEAT_CLIENT_ENGINE` follow-ups |

## Auto-expiry

Quotes and unpaid deposits expire automatically. The original Laravel app ran
automated expiry messages; RIPPL surfaces the same via the notifications bell
(≤ 7 days to quote expiry) and the `/invoices` overdue badge.

## Scope control

Write these three lines into every quote:

1. What is included (explicit deliverable list and file formats)
2. What is not included (stems, alternate versions, unlimited revisions)
3. What triggers a new quote (any change to 1 or 2)

Scope creep is not a client behaviour problem; it is a documentation problem.

## Checklist

- [ ] No work without deposit
- [ ] Revision count written into the quote
- [ ] WIP shared at 60%
- [ ] Balance invoice raised on delivery day
- [ ] Client can see phase status without asking
