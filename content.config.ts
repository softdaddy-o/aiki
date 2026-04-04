import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const factCheckSchema = z.object({
    status: z.enum(['passed', 'failed', 'pending']),
    date: z.string(),
    sources: z.array(z.object({ url: z.string(), title: z.string() })).default([]),
    checks: z.array(z.object({
        type: z.enum(['source_match', 'web_cross_check', 'number_verify', 'adversarial']),
        result: z.enum(['pass', 'fail', 'skip']),
        sources: z.number().optional(),
        findings: z.array(z.string()).optional(),
    })).default([]),
});

const news = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
    schema: z.object({
        title: z.string(),
        date: z.string(),
        lang: z.enum(['ko', 'en']).default('ko'),
        category: z.enum(['news', 'wiki', 'model', 'tutorial', 'skill']).default('news'),
        summary: z.string(),
        sourceUrl: z.string().optional(),
        sourceTitle: z.string().optional(),
        draft: z.boolean().default(false),
        factCheck: factCheckSchema.optional(),
        tags: z.array(z.string()).default([]),
    }),
});

export const collections = { news };
