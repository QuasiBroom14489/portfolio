---
title: Vesper
role: Personal AI assistant
tagline: An assistant that knows my life
oneLiner: "An always-on AI assistant that knows my notes, deadlines and inbox, works from every device I own, and logs every action it takes."
tier: flagship
order: 2
status: Daily use
dates: Sep 2026 – present
icon: vesper
accent: "#7c9cff"
hero: { value: "23,744 events", label: "logged by daily use since Sep 2, 2026" }
stats:
  - { value: "39", label: "MCP tools" }
  - { value: "321", label: "automated tests" }
  - { value: "46", label: "architecture decision records" }
  - { value: "5", label: "clients: desktop, iPhone/iPad, terminal, Telegram, Claude Code" }
problem: "Siri knows nothing about my life and can't act on it. I wanted one assistant that reads my notes vault, school deadlines and email, works the same from my laptop, phone and terminal, points out what I'm forgetting — and keeps working when one AI provider hits its limit."
built:
  - "**One headless brain, thin clients.** A Fastify daemon (about 80 HTTP/WebSocket routes) serves a Tauri desktop app, a terminal CLI, a native SwiftUI iPhone/iPad app with widgets and a Share extension, and a Telegram bot. Every action is written to an append-only SQLite event log before anyone is notified."
  - "**Tools and model routing.** 39 MCP tools (vault search, semantic recall, reminders, scheduling, screen vision). A router sends each request to Claude, Codex or a local Qwen model and fails over when a quota runs out — 44 of 108 routed turns were answered on-device."
  - "**An intuition engine that gets graded.** A local model checks deadlines and the vault on every tick and raises nudges I can mark useful, wrong or noise in one tap: 1,611 nudges raised and 378 judged by hand, a dataset that drives the next fix."
  - "**Local-first memory and senses.** Hybrid semantic + keyword search (local embeddings, FTS5, reciprocal-rank fusion) over 5,065 chunks, on-device speech-to-text (~1.2 s for a 2.5 s clip) and screen OCR. None of it leaves the Mac."
  - "**Built to last.** 46 ADRs, 321 tests, secret scanning and dependency audits in CI. A security audit fixed 14 advisories, and a watchdog cut detection of a stuck local model from 12 days to about 75 seconds."
how:
  - "Desktop · phone · terminal · Telegram"
  - "Daemon (auth, routing)"
  - "Claude / Codex / local Qwen"
  - "39 MCP tools"
  - "Append-only event log"
  - "Fan-out to every client"
stack: [TypeScript, Node.js, Fastify, SQLite + FTS5, MCP, Claude Agent SDK, Ollama (Qwen3), Tauri + Rust, React, SwiftUI, WidgetKit, whisper.cpp, Python, GitHub Actions]
capabilities: [llm, data-eng, retrieval, fullstack, ios, testing, security, product]
proof:
  - { metric: "Real usage", value: "23,744 events over 201 sessions, Sep 2 – Oct 14 2026", source: "aggregate count from the event log" }
  - { metric: "Human feedback", value: "1,611 nudges raised · 378 judged (120 useful / 38 wrong / 220 noise)", source: "event log" }
  - { metric: "Model routing", value: "108 routed turns: 64 to Claude, 44 to a local model", source: "event log" }
  - { metric: "Engineering", value: "91 commits · 46 ADRs · 321 tests (211 Node, 110 Python)", source: "git history and test files" }
  - { metric: "Reliability", value: "stuck-model detection 12 days → ~75 s", source: "ADR 0042" }
  - { metric: "Security", value: "14 advisories fixed (5 high, 1 critical); every route but /health requires a token", source: "security audit log, Oct 12 2026" }
links: []
visibility: "Private repo — it runs on my own data. Screenshots and recordings only; no code links."
next: "Move the brain to an always-on host and give the intuition engine a proper evaluation set built from the 378 judged nudges."
---
