import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    category: z.string(),
    publishDate: z.string(),
    updateDate: z.string().optional(),
  }),
});

export const collections = { posts };
