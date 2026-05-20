import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://aiblogg.se',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  vite: { plugins: [tailwindcss()] },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => {
        const noindex = [
          'https://aiblogg.se/samarbeta/',
          'https://aiblogg.se/kontakt/',
          'https://aiblogg.se/integritetspolicy/',
          'https://aiblogg.se/cookies/',
          'https://aiblogg.se/redaktionell-policy/',
          'https://aiblogg.se/sponsrat-innehall/',
        ];
        return !noindex.includes(page);
      },
    }),
  ],
});
