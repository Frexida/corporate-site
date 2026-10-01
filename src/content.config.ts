import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const post = defineCollection({
  loader: glob({ base: './src/data/post', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      publishDate: z.coerce.date().default(new Date()),
      updateDate: z.coerce.date().optional(),
      excerpt: z.string().optional(),
      image: z.union([image(), z.string()]).optional(),
      imageAlt: z.string().optional(),
      tags: z.array(z.string()).default([]),
      category: z.string().optional(),
      author: z.string().optional(),
      draft: z.boolean().default(false),
      metadata: z
        .object({
          title: z.string().optional(),
          ignoreTitleTemplate: z.boolean().optional(),
          canonical: z.string().optional(),
          description: z.string().optional(),
          robots: z
            .object({
              index: z.boolean().optional(),
              follow: z.boolean().optional(),
            })
            .optional(),
          openGraph: z
            .object({
              url: z.string().optional(),
              siteName: z.string().optional(),
              images: z
                .array(
                  z.object({
                    url: z.string(),
                    width: z.number().optional(),
                    height: z.number().optional(),
                  })
                )
                .optional(),
              locale: z.string().optional(),
              type: z.string().optional(),
              article: z
                .object({
                  publishedTime: z.string().optional(),
                  modifiedTime: z.string().optional(),
                  expirationTime: z.string().optional(),
                  authors: z.array(z.string()).optional(),
                  section: z.string().optional(),
                  tags: z.array(z.string()).optional(),
                })
                .optional(),
            })
            .optional(),
          twitter: z
            .object({
              handle: z.string().optional(),
              site: z.string().optional(),
              cardType: z.string().optional(),
            })
            .optional(),
        })
        .optional(),
    }),
});

export const collections = { post };
