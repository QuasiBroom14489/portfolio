// Rows of the skills matrix. Each proof names the project slug it links into.
export type Capability = { key: string; label: string; blurb: string; proof: { project: string; text: string }[] };

export const capabilities: Capability[] = [
  {
    key: 'data-eng', label: 'Data engineering & modeling',
    blurb: 'Schemas, ingestion pipelines and append-only histories that stay trustworthy.',
    proof: [
      { project: 'encore', text: '44 migrations, 32 tables with row-level security, LLM ingestion with confidence gating' },
      { project: 'alphalab', text: 'Schema v8, 24 tables, 26 append-only triggers, point-in-time joins across 11 feeds' },
      { project: 'offerdesk', text: 'Event-sourced log, 7 migrations, status derived from history' },
      { project: 'vesper', text: 'Append-only event log as the source of truth; rebuildable indexes' },
    ],
  },
  {
    key: 'stats', label: 'Statistics & quant research',
    blurb: 'Out-of-sample testing and corrections for how many things you tried.',
    proof: [{ project: 'alphalab', text: 'Deflated Sharpe, pre-registration, out-of-sample-only verdicts, look-ahead tests' }],
  },
  {
    key: 'llm', label: 'LLM agents & MCP tooling',
    blurb: 'Agents that use real tools, with validation, routing and humans in the loop.',
    proof: [
      { project: 'vesper', text: '39 MCP tools; routing across Claude, Codex and a local model with failover' },
      { project: 'offerdesk', text: 'MCP server with 18 tools, 9 safe to auto-approve' },
      { project: 'alphalab', text: '26-tool MCP server; every AI output validated before storage' },
      { project: 'encore', text: 'Structured extraction into a Zod schema with confidence thresholds' },
      { project: 'shopwright', text: 'LLM editor grading against a rubric; every call logged with cost' },
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
      { project: 'alphalab', text: 'FastAPI (20 endpoints) + React dashboard (7 pages)' },
      { project: 'vesper', text: 'Fastify daemon with ~80 routes; Tauri desktop app' },
    ],
  },
  {
    key: 'ios', label: 'iOS & desktop apps',
    blurb: 'Native clients on top of one shared backend.',
    proof: [
      { project: 'vesper', text: 'SwiftUI iPhone/iPad app with widgets and a Share extension, plus a Tauri desktop app' },
    ],
  },
  {
    key: 'testing', label: 'Testing, CI & correctness',
    blurb: 'Tests that prove the hard properties, not just the happy path.',
    proof: [
      { project: 'alphalab', text: '518 test cases, including truncation tests for every indicator' },
      { project: 'vesper', text: '321 tests; secret scanning and dependency audits in CI' },
      { project: 'offerdesk', text: '123 test cases; lint, typecheck and tests on every push' },
    ],
  },
  {
    key: 'security', label: 'Cloud & security',
    blurb: 'Auth, secrets and audits handled deliberately.',
    proof: [
      { project: 'offerdesk', text: 'OAuth with PKCE, AES-256-GCM-encrypted tokens, per-user workspaces' },
      { project: 'vesper', text: 'Security audit fixed 14 advisories; token auth on every route' },
    ],
  },
  {
    key: 'product', label: 'Product & UX',
    blurb: 'Decisions first, dashboards second.',
    proof: [
      { project: 'offerdesk', text: 'Keyboard-first UI with traffic-light follow-up signals' },
      { project: 'encore', text: 'Four audiences, weekly digest, two cities' },
    ],
  },
  {
    key: 'embedded', label: 'Embedded',
    blurb: 'Firmware close to the hardware.',
    proof: [{ project: 'eink-frame', text: 'ESP32-S3 firmware with a hand-written e-paper panel driver' }],
  },
];
