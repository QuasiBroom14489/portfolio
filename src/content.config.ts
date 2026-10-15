import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const stat = z.object({ value: z.string(), label: z.string() });

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    role: z.string(), // 2–3 words shown under every icon label
    tagline: z.string(), // about six words, for widgets
    oneLiner: z.string(), // outcome first
    tier: z.enum(['flagship', 'also']),
    order: z.number(),
    status: z.enum(['Live', 'Beta', 'Daily use', 'Public repo', 'Building', 'Course project', 'Gift build']),
    dates: z.string(),
    icon: z.string(),
    accent: z.string(),
    hero: stat,
    stats: z.array(stat).default([]),
    problem: z.string(),
    built: z.array(z.string()),
    how: z.array(z.string()).default([]), // pipeline steps for the small diagram
    stack: z.array(z.string()),
    capabilities: z.array(z.string()).default([]), // keys from src/data/capabilities.ts
    proof: z.array(z.object({ metric: z.string(), value: z.string(), source: z.string() })).default([]),
    links: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
    visibility: z.string(), // shown in the window footer: why there is or isn't a code link
    next: z.string().optional(),
  }),
});

export const collections = { projects };
