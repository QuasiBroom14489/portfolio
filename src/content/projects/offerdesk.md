---
title: OfferDesk
role: Internship tracker
tagline: Who to follow up with today
oneLiner: "An internship tracker that tells you who to follow up with today — and that an AI assistant can update for you over MCP."
tier: flagship
order: 3
status: Public repo
dates: Sep 2026
icon: offerdesk
accent: "#22c55e"
hero: { value: "18 MCP tools", label: "so an AI assistant can run the tracker for you" }
stats:
  - { value: "123", label: "test cases" }
  - { value: "43", label: "REST API routes" }
  - { value: "7", label: "architecture decision records" }
  - { value: "2 days", label: "of commits, Sep 29–30 2026" }
problem: "During recruiting season, applications scatter across a spreadsheet, an inbox, LinkedIn and a folder of resume_final_v3.pdf files. The questions that matter get lost — who went quiet, what's due this week, which résumé went where — because a status column only knows where things stand now, not how they got there."
built:
  - "**An event-sourced core.** Every save, application, outreach, reply and interview is a new row in an append-only log; database triggers block edits and deletes. Status, follow-ups, response rate and the funnel are derived from that history, never stored."
  - "**One core, three ways in.** A keyboard-first React dashboard with a ⌘K palette, a Fastify REST API (43 routes) and an MCP server (18 tools, 9 safe to auto-approve). Telling an assistant \"add this posting to my tracker\" just works, and duplicates are caught by URL or company + role."
  - "**A report builder.** 20 columns including computed ones (days waiting, response time), saved views and presets; CSV/Excel exports come from the same report as the screen, and a view can be pushed to Google Sheets."
  - "**Hosted or local, same code.** Vercel + Turso (hosted SQLite) + Clerk with a workspace per user, or a local file with no account — one async libSQL code path across 7 migrations."
  - "**Secure Google integration.** OAuth with PKCE, the narrow drive.file scope, AES-256-GCM-encrypted tokens, and immutable document versions so each application records the exact résumé that went out."
how:
  - "Dashboard · REST · MCP"
  - "Commands"
  - "Append-only event log"
  - "Derived status + signals"
  - "Views → CSV / Excel / Sheets"
stack: [TypeScript, React 19, Vite, Fastify 5, libSQL / Turso, MCP SDK, Clerk, Vercel, zod, Vitest, Biome, GitHub Actions]
capabilities: [data-eng, llm, fullstack, testing, security, product]
proof:
  - { metric: "Tests", value: "123 test cases in 13 files (2,620 lines)", source: "test files in the public repo" }
  - { metric: "Interfaces", value: "43 REST routes · 18 MCP tools · 7 dashboard pages", source: "public repo" }
  - { metric: "Data model", value: "12 event kinds · 8 pipeline stages · 4 append-only triggers", source: "public repo" }
  - { metric: "Decisions", value: "7 ADRs", source: "docs/decisions" }
  - { metric: "Pace", value: "23 commits, Sep 29–30 2026", source: "git history" }
links:
  - { label: "Code on GitHub", href: "https://github.com/QuasiBroom14489/offerdesk" }
visibility: "Public, MIT-licensed. Demo visuals use fictional seed data only."
next: "Résumé tailoring per application and a Gmail connector that logs replies automatically."
---
