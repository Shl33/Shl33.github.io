import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { projectStatuses } from './lib/project-status';

const text = z.string().trim().min(1);

const projects = defineCollection({
  loader: glob({
    pattern: '*.md',
    base: './src/content/projects',
    // Filename is the only URL identity; reject names that need normalization.
    generateId: ({ entry }) => {
      const id = entry.replace(/\.md$/, '');
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) {
        throw new Error(`Project filename must use lowercase kebab-case: ${entry}`);
      }
      return id;
    },
  }),
  schema: z.object({
    title: text,
    logo: z.string().regex(/^\/projects\/[a-z0-9-]+\/[a-z0-9-]+\.svg$/).optional(),
    category: text,
    homepageCategory: text.optional(),
    status: z.enum(projectStatuses),
    summary: text.optional(),
    stage: text.optional(),
    role: text.optional(),
    homepageSummary: text.optional(),
    year: z.number().int().min(1000).max(9999).optional(),
    featured: z.boolean().default(false),
    featuredOrder: z.number().int().nonnegative().optional(),
  }).strict(),
});

export const collections = { projects };
