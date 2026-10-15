---
title: Shopwright
role: AI shop playbook
tagline: Evidence in, approved products out
oneLiner: "An AI playbook for digital-download shops: it picks a niche from saved evidence, builds products as code, checks them, and waits for a human to approve."
tier: also
order: 6
status: Public repo
dates: Oct 2026
icon: shopwright
accent: "#a3e635"
hero: { value: "37 checks", label: "of automated QA on every product, plus an AI editor's rubric score" }
stats:
  - { value: "8", label: "ADRs" }
  - { value: "42", label: "test cases" }
problem: "Opening a digital-download shop usually means guessing at a niche and eyeballing whether a product is good enough. Shopwright turns each step into a recorded, reproducible decision."
built:
  - "**Niche research engine** that scores candidates on saved evidence (listings, keywords, Google Trends exports) and writes a ranked report — 8 niches compared on the first run."
  - "**Products as code:** HTML/CSS templates rendered to print-ready PDFs, 37 automated checks each, then an LLM editor grading against the shop's own rubric."
  - "**Human-in-the-loop:** nothing becomes a listing without an approval event, and one product that passed QA was still rejected by the owner."
  - "**Event-sourced core:** append-only SQLite log, and every model call logged with model, prompt hash, tokens and cost."
how: []
stack: [TypeScript, Node, SQLite, zod, Claude Agent SDK, Puppeteer, Vitest, GitHub Actions]
capabilities: [llm, data-eng, testing]
proof:
  - { metric: "Engineering", value: "15 commits · 8 ADRs · 42 test cases · CI on every push", source: "public repo" }
links:
  - { label: "Code on GitHub", href: "https://github.com/QuasiBroom14489/shopwright" }
visibility: "Public, MIT-licensed. The shop's own data lives in a separate private repo."
---
