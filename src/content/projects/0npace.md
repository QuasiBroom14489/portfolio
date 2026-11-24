---
title: 0npace
role: Student organizer app
tagline: Classes, deadlines and notes, sorted
oneLiner: "A paid desktop app for Mac and Windows that pulls in a student's calendars, deadlines and notes, files each item under the right class, and writes a daily brief, while their data stays on their own computer."
tier: flagship
order: 4
status: Beta
dates: Oct 2026 – present
icon: onpace
accent: "#a78bfa"
hero: { value: "4 beta releases in 2 weeks", label: "signed builds for Mac (Apple silicon + Intel) and Windows, Oct 29 – Nov 12, 2026" }
stats:
  - { value: "529", label: "test cases" }
  - { value: "31", label: "architecture decision records" }
  - { value: "14", label: "connector modules, each with tests" }
  - { value: "4", label: "apps in one monorepo: desktop, hub, cloud, iPhone" }
problem: "Students keep their deadlines in Canvas, their schedule in a calendar, and their notes somewhere else, and nothing connects them. I had built that system for myself (Vesper), and a few people offered to pay for it, but none of them wanted to set it up themselves. 0npace turns the organizing part into an app you download, pay for and set up in a few minutes, and none of their data lives on our servers."
built:
  - "**Local hub, thin cloud.** A background hub on the user's own Mac or PC keeps all of their content. The cloud only handles accounts, billing, licenses, updates and an AI proxy, so a student's notes and email never pass through our servers."
  - "**An append-only event log.** Each sync, capture and decision is an event with an optional dedupe key, so re-reading the same Canvas feed or a retried phone capture can't create duplicates. Every screen is a projection rebuilt from that log."
  - "**Organizing with a human in the loop.** Course codes and rules file most items automatically. Anything the app can't place waits in an Inbox, and anything that writes to an outside account goes through an approval queue first. Google access asks only for the two read scopes, using OAuth with PKCE."
  - "**AI that degrades gracefully.** Daily briefs, weekly plans and an Ask box that answers only from local items and cites them. Model routing and usage metering run behind per-plan spending caps that the proxy enforces. With AI off, the brief is still a plain summary."
  - "**A native iPhone app.** SwiftUI, paired to the hub by QR code over the user's own Tailscale network. It has a share extension and a Due soon widget, and captures queue on the phone when the computer is offline."
  - "**Shipping like a product.** A Tauri desktop app owns a compiled Bun sidecar. CI runs on macOS, Windows and Linux, and the release job uploads only when every target is signed. Clerk and Stripe handle accounts and the $25/month subscription."
how:
  - "Canvas · calendars · notes"
  - "Hub event log"
  - "Organize by area"
  - "Approvals"
  - "Brief · Ask · iPhone"
stack: [TypeScript, Bun, Hono, SQLite, Tauri v2 (Rust), React, Vite, SwiftUI, Tailscale, Next.js, Clerk, Stripe, Vercel, zod, Vitest, GitHub Actions]
capabilities: [data-eng, llm, fullstack, ios, testing, security, product]
proof:
  - { metric: "Tests", value: "529 TypeScript test cases + 13 Swift tests in 60 files", source: "beta.4 release branch" }
  - { metric: "Code", value: "~26,000 lines TypeScript · ~1,700 Swift · ~500 Rust (tests excluded)", source: "beta.4 release branch" }
  - { metric: "Decisions", value: "31 ADRs", source: "docs/decisions" }
  - { metric: "Releases", value: "0.1.0-beta.1 → beta.4", source: "release pipeline" }
links:
  - { label: "0npace.com", href: "https://0npace.com" }
visibility: "Private repo because 0npace is a paid product (Zepoch LLC). The download site is public."
next: "A private beta with founding users by the start of spring semester 2027."
---
