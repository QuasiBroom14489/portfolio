// Rows of the skills matrix. Each proof names the project slug it links into.
export type Capability = { key: string; label: string; blurb: string; proof: { project: string; text: string }[] };

export const capabilities: Capability[] = [
  {
    key: 'data-eng', label: 'Data engineering & modeling',
    blurb: 'Schemas, ingestion pipelines and append-only histories that stay trustworthy.',
    proof: [
      { project: 'encore', text: '44 migrations, 32 tables with row-level security, LLM ingestion with confidence gating' },
      { project: 'offerdesk', text: 'Event-sourced log, 7 migrations, status derived from history' },
      { project: 'vesper', text: 'Append-only event log as the source of truth; rebuildable indexes' },
      { project: '0npace', text: 'Event log with dedupe keys so repeated syncs and retried captures never duplicate' },
    ],
  },
  {
    key: 'stats', label: 'Statistics & quant research',
    blurb: 'Held-out evaluation, with the limits reported.',
    proof: [
      { project: 'nudges', text: 'Held-out logistic model and a what-if replay over 343 hand-judged nudges, limits reported' },
    ],
  },
  {
    key: 'llm', label: 'LLM agents & MCP tooling',
    blurb: 'Agents that use real tools, with validation, routing and humans in the loop.',
    proof: [
      { project: 'vesper', text: '39 MCP tools; routing across Claude, Codex and a local model with failover' },
      { project: 'offerdesk', text: 'MCP server with 18 tools, 9 safe to auto-approve' },
      { project: 'encore', text: 'Structured extraction into a Zod schema with confidence thresholds' },
      { project: '0npace', text: 'Ask answers only from local items with checked citations; per-plan AI caps enforced on the proxy' },
    ],
  },
  {
    key: 'retrieval', label: 'Retrieval & local ML',
    blurb: 'Search and models that run on the device.',
    proof: [{ project: 'vesper', text: 'Hybrid vector + FTS5 search with rank fusion over 5,065 chunks; on-device speech and OCR' }],
  },
  {
    key: 'fullstack', label: 'Full-stack web',
    blurb: 'APIs, dashboards and products deployed to production.',
    proof: [
      { project: 'encore', text: 'Next.js app with 82 pages and 19 API routes, deployed on Vercel' },
      { project: 'offerdesk', text: 'React + Fastify, 43 REST routes, hosted on Vercel' },
      { project: 'vesper', text: 'Fastify daemon with ~80 routes; Tauri desktop app' },
      { project: '0npace', text: 'Hono hub, Next.js site with Clerk + Stripe billing, Tauri desktop shell' },
    ],
  },
  {
    key: 'ios', label: 'iOS & desktop apps',
    blurb: 'Native clients on top of one shared backend.',
    proof: [
      { project: 'vesper', text: 'SwiftUI iPhone/iPad app with widgets and a Share extension, plus a Tauri desktop app' },
      { project: '0npace', text: 'Signed Mac + Windows releases; SwiftUI iPhone app paired by QR over Tailscale' },
    ],
  },
  {
    key: 'testing', label: 'Testing, CI & correctness',
    blurb: 'Tests that prove the hard properties, not just the happy path.',
    proof: [
      { project: 'vesper', text: '321 tests; secret scanning and dependency audits in CI' },
      { project: 'offerdesk', text: '123 test cases; lint, typecheck and tests on every push' },
      { project: '0npace', text: '529 test cases; CI on macOS, Windows and Linux' },
    ],
  },
  {
    key: 'security', label: 'Cloud & security',
    blurb: 'Auth, secrets and audits handled deliberately.',
    proof: [
      { project: 'offerdesk', text: 'OAuth with PKCE, AES-256-GCM-encrypted tokens, per-user workspaces' },
      { project: 'vesper', text: 'Security audit fixed 14 advisories; token auth on every route' },
      { project: '0npace', text: 'User data stays on their computer; read-only Google scopes; approval queue before any write' },
    ],
  },
  {
    key: 'product', label: 'Product & UX',
    blurb: 'Decisions first, dashboards second.',
    proof: [
      { project: 'offerdesk', text: 'Keyboard-first UI with traffic-light follow-up signals' },
      { project: 'encore', text: 'Four audiences, weekly digest, two cities' },
      { project: '0npace', text: 'Guided onboarding; price shown before download' },
    ],
  },
  {
    key: 'embedded', label: 'Embedded',
    blurb: 'Firmware close to the hardware.',
    proof: [{ project: 'eink-frame', text: 'ESP32-S3 firmware with a hand-written e-paper panel driver' }],
  },
];
