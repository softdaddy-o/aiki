import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import pagefind from 'astro-pagefind';

export default defineConfig({
    site: 'https://aiki.softdaddy-o.com',
    integrations: [react(), pagefind()],
    i18n: {
        defaultLocale: 'ko',
        locales: ['ko', 'en'],
        routing: {
            prefixDefaultLocale: true,
            redirectToDefaultLocale: true,
        },
    },
    build: { format: 'directory' },
});
