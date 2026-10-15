---
title: Encore
role: Live-music app
tagline: Every show in town, one map
oneLiner: "A live-music app where an AI pipeline reads venue websites every day and decides which shows are reliable enough to publish."
tier: flagship
order: 1
status: Beta
dates: May 2026 – present
icon: encore
accent: "#d946ef"
hero: { value: "221 venues · 2 cities", label: "Atlanta and South Bend venues, pre-launch beta" }
stats:
  - { value: "44", label: "Postgres migrations" }
  - { value: "32", label: "tables, all with row-level security" }
  - { value: "4", label: "scheduled jobs (ingest, digests, reminders)" }
  - { value: "82", label: "pages across fans, musicians, venues, admin" }
shots:
  - { src: "/shots/encore/tonight.webp", alt: "Encore's Tonight feed for Atlanta: genre filter chips above cards for Sweet Georgia's Juke Joint, Aisle 5, Commune ATL, Boggs Social & Supply, 529 and Buckhead Theatre, each with a time, price and distance.", caption: "The Tonight feed: every show the pipeline published, soonest first." }
  - { src: "/shots/encore/phone.webp", alt: "Encore on a phone: the Atlanta feed with a search bar, filter chips, show cards and a bottom tab bar.", caption: "The same feed on a phone.", w: 780, h: 1688 }
  - { src: "/shots/encore/map.webp", alt: "Encore's map of metro Atlanta with green markers for shows tonight and orange markers for upcoming shows, clustered around Midtown and Little Five Points.", caption: "Map view: green pins are tonight, orange are upcoming." }
problem: "Live music in Atlanta is spread across hundreds of venue websites, Instagram posts and calendars, each in a different format, and small rooms like bars and breweries never show up anywhere. Finding a show tonight means checking a dozen sites, so Encore pulls it all into one feed and map — and the hard part is the data."
built:
  - "**AI ingestion with confidence gating.** A daily job scrapes each venue's events page, and an LLM extracts events into a strict Zod schema with a confidence score. Under 0.55 is dropped; 0.8+ from venue-verified sources (0.9+ for admin-added ones) publishes automatically; everything in between waits in an admin review queue."
  - "**Messy-data cleanup.** Free-text performer names are matched to artist profiles with Postgres trigram similarity (0.7+ is a match, lower creates a stub flagged for review). User-submitted venues are normalized by an LLM, geocoded and de-duplicated before an admin approves them."
  - "**Source health monitoring.** Every venue source runs in isolation, and a dashboard buckets each one as healthy, stale, failing or never-run from its success rate over the last 10 runs."
  - "**Postgres + PostGIS backend.** 44 migrations, 32 tables with row-level security on every one (112 policies), 52 SQL functions and PostGIS radius search behind the Tonight feed."
  - "**A full product for four audiences.** Fans get the Tonight feed, map, search, RSVPs, follows and groups; musicians post gigs; venues manage their own sources; admins run the console. A weekly digest email and SEO landing pages are built for launch."
how:
  - "Venue sites"
  - "Daily scrape"
  - "LLM → typed events + confidence"
  - "Gate: drop · review · publish"
  - "Postgres / PostGIS"
  - "Tonight feed + map"
stack: [TypeScript, Next.js 14, React, Supabase, Postgres, PostGIS, Vercel Cron, Vercel AI SDK, Firecrawl, Mapbox GL, Zod, Resend, Turborepo, GitHub Actions]
capabilities: [data-eng, llm, fullstack, product]
proof:
  - { metric: "Commits", value: "84, solo, May 29 – Aug 18 2026", source: "git history" }
  - { metric: "Database", value: "44 migrations · 32 tables · 112 RLS policies · 52 SQL functions · 101 indexes", source: "counted from the migration files" }
  - { metric: "AI thresholds", value: "drop < 0.55 · auto-publish ≥ 0.8 / 0.9 · artist match ≥ 0.7", source: "ingestion and artist-matching code" }
  - { metric: "Coverage", value: "221 venues seeded (148 Atlanta, 73 South Bend)", source: "seed migrations" }
  - { metric: "CI/CD", value: "4 GitHub Actions workflows: checks, PR previews, production deploys, mobile build", source: ".github/workflows" }
links:
  - { label: "Open the live app", href: "https://therealencoreapp.com" }
visibility: "Live product. The code is in a private repo, so this page shows the design and the numbers instead."
next: "Measure extraction accuracy with a labeled set of venue pages, and launch the web beta in Atlanta, then bring back the Expo mobile app."
---
