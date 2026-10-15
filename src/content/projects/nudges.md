---
title: Nudge study
role: Data analysis
tagline: Which interruptions are worth it
oneLiner: "An analysis of 343 hand-judged nudges from my AI assistant that found repetition, not model confidence, separates useful from noise."
tier: flagship
order: 5
status: Building
dates: Oct 2026 – present
icon: nudges
accent: "#3b5bdb"
hero: { value: "15% vs 58% useful", label: "a rule's 11th+ firing vs. its 2nd–3rd, across 343 judged nudges" }
stats:
  - { value: "1,725", label: "nudges raised by Vesper's intuition engine" }
  - { value: "343", label: "judged by hand: useful, wrong or noise" }
  - { value: "0.57 → 0.69", label: "held-out AUC: model confidence alone vs. a logistic model" }
  - { value: "−54%", label: "nudge volume under a 10-firing cap, keeping 82% of useful ones (replay)" }
shots:
  - { src: "/shots/nudges/by_repeat.svg", alt: "Bar chart of the share of nudges judged useful by how often the same rule had already fired: first 38% (n=34), 2nd–3rd 58% (n=76), 4th–10th 44% (n=96), 11th or later 15% (n=137); overall 35%.", caption: "The headline: by the 11th time a rule fires, it's almost always noise.", w: 614, h: 267 }
  - { src: "/shots/nudges/by_week.svg", alt: "Bar chart of usefulness by week: week 1 64% (n=11), week 2 51% (n=176), week 4 14% (n=140), weeks 5 and 6 33% (n=6 each).", caption: "Usefulness fell in week 4, when repeats made up 101 of 140 judged nudges.", w: 614, h: 307 }
  - { src: "/shots/nudges/by_confidence.svg", alt: "Bar chart of usefulness by the model's confidence band: below 0.80 58% (n=24), 0.80–0.89 23% (n=99), 0.90–0.99 36% (n=64), 1.00 38% (n=156).", caption: "The model's own confidence barely tracks usefulness, so the confidence gate isn't doing the filtering.", w: 614, h: 267 }
  - { src: "/shots/nudges/by_category.svg", alt: "Bar chart of usefulness by nudge type: email 35% (n=256), due 42% (n=31), reminder 22% (n=27), overdue 44% (n=18), unmatched 0% (n=6).", caption: "By type: email dominates the volume; reminders are least useful.", w: 614, h: 307 }
problem: "Vesper's intuition engine checks my deadlines and inbox every ten minutes and raises nudges, and I mark each one useful, wrong or noise. Most turned out to be noise, and the obvious fix — raise the confidence threshold — assumed the model's confidence meant something. I wanted to know what actually separates a useful interruption from an annoying one before changing the engine."
built:
  - "**A privacy-first export.** A read-only query turns the event log into one row of features per nudge (timing, type, urgency, confidence, length, evidence count, prior firings of the same rule, verdict). No nudge text, notes or rule keys leave the database, and only aggregates are published."
  - "**SQL breakdowns.** DuckDB group-bys of usefulness by type, urgency, confidence band, time of day, week and repeat count, with any group under 5 judged nudges suppressed."
  - "**An honest model check.** A logistic regression on a time-ordered 70/30 split reaches AUC 0.69 vs. 0.57 for confidence alone, but doesn't beat a constant that already knows the test period's rate, because usefulness drifted down. That limit is reported, not hidden."
  - "**A what-if before the fix.** Replaying the judged history with a per-rule repeat cap sized the trade-off: a cap of 10 cuts volume 54%, keeps 82% of useful nudges and lifts precision from 35% to 48% — in hindsight, which is why the next step is a real before/after."
how:
  - "Event log (read-only)"
  - "Feature-only export"
  - "DuckDB breakdowns"
  - "Held-out logistic model"
  - "Repeat-cap replay"
  - "Ship the cap, re-measure"
stack: [Python, DuckDB, SQL, pandas, scikit-learn, matplotlib, uv]
capabilities: [stats, data-eng]
proof:
  - { metric: "Data", value: "1,725 nudges raised · 343 judged (120 useful / 35 wrong / 188 noise)", source: "Vesper event log, Sep–Oct 2026" }
  - { metric: "Repetition", value: "11th+ firing 15% useful (n=137) vs. 2nd–3rd 58% (n=76)", source: "findings.md" }
  - { metric: "Model", value: "held-out AUC 0.69 (logistic) vs. 0.57 (confidence alone); top-third precision 18% vs. 11% base", source: "time-ordered 70/30 split" }
  - { metric: "What-if", value: "cap 10: volume −54%, useful kept 82%, precision 35% → 48%", source: "in-sample replay" }
links:
  - { label: "Code and findings on GitHub", href: "https://github.com/QuasiBroom14489/nudge-analysis" }
visibility: "Public repo with aggregates and charts only; the row-level export stays on my Mac, and no nudge text leaves it."
next: "Ship the repeat cap in Vesper, collect two weeks of new judgments, and publish the before/after precision."
---
