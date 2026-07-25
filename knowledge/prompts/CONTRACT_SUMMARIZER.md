# Contract Summarizer Prompts

Not legal advice — these produce a triage summary so you know what to ask a
lawyer about. Never sign on the basis of an AI summary.

---

## 1. Plain-language summary

```
Summarise the attached music agreement for a non-lawyer.

Output exactly these sections:
1. Parties and what each is agreeing to do (2 sentences)
2. Which copyrights are covered — master, composition, or both
3. Term, territory, exclusivity
4. Money: rate, rate base (gross or net), advance, recoupment,
   cross-collateralisation, permitted deductions
5. Control: approval rights, key-person, assignment
6. Exit: termination, reversion, auto-renewal, notice windows
7. The five clauses I should ask a lawyer about, ranked by risk
8. Anything unusually favourable or unfavourable versus market standard

If a term is undefined in the document (e.g. "net receipts"), say so explicitly.
```

---

## 2. Red-flag scan

```
Scan this agreement for these specific red flags and quote the exact clause text
for each one found:
- Perpetuity combined with exclusivity
- "Net receipts" or "net profits" used without a definition
- Unlimited or sole-discretion deductions
- No audit right, or an audit right with an unreasonable notice/cost burden
- Auto-renewal without a notice window
- Sync rights granted without a separate fee mechanism
- Re-recording restrictions extending beyond the term
- Assignment permitted without consent
Return a table: Flag | Clause reference | Quoted text | Why it matters.
```

---

## 3. Comparison

```
Compare agreement A and agreement B clause by clause on: term, territory,
royalty rate and base, advance and recoupment, approval rights, reversion,
termination. Output a three-column table (Term | A | B) and end with the three
material differences that would most affect my earnings over 5 years.
```
