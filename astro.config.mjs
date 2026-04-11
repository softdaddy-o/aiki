import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import pagefind from 'astro-pagefind';
import remarkLinkKind from './src/plugins/remark-link-kind.mjs';
import remarkWikiAutolink from './src/plugins/remark-wiki-autolink.mjs';

export default defineConfig({
    site: 'https://aiki.softdaddy-o.com',
    integrations: [react(), pagefind()],
    markdown: {
        remarkPlugins: [remarkWikiAutolink, remarkLinkKind],
    },
    i18n: {
        defaultLocale: 'ko',
        locales: ['ko', 'en'],
        routing: {
            prefixDefaultLocale: true,
            redirectToDefaultLocale: false,
        },
    },
    build: { format: 'directory' },
});
