import { defineCollection, defineContentConfig, z } from '@nuxt/content';

export default defineContentConfig({
  collections: {
    articles: defineCollection({
      type: 'page',
      source: 'articles/*.md',
      schema: z.object({
        title: z.string(),
        slug: z.string(),
        category: z.string(),
        excerpt: z.string(),
        readingTime: z.number().default(5),
        draft: z.boolean().default(false),
        createdAt: z.string().optional(),
      }),
    }),
  },
});
