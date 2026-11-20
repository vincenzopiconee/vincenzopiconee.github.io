import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    kicker: z.string(),
    headline: z.string(),
    subtitle: z.string(),
    cardStat: z.string(),
    order: z.number(),
    year: z.string(),
    github: z.string().url(),
    theme: z.object({
      bgLight: z.string(),
      bgHoverLight: z.string(),
      bgDark: z.string(),
      bgHoverDark: z.string(),
      borderLight: z.string(),
      borderHoverLight: z.string(),
      borderDark: z.string(),
      borderHoverDark: z.string(),
      spotLight: z.string(),
      spotDark: z.string(),
      bgImageMode: z.enum(['none', 'doodle', 'grid']).default('none'),
    }),
    showcaseMeta: z
      .object({
        artworksTitle: z.string().optional(),
        artworksSubtitle: z.string().optional(),
        charactersTitle: z.string().optional(),
        charactersSubtitle: z.string().optional(),
        rewardsTitle: z.string().optional(),
        rewardsSubtitle: z.string().optional(),
      })
      .optional(),
    lineup: z.object({
      experience: z.string(),
      signatureTech: z.string(),
      dataLayer: z.string(),
    }),
    frameworks: z.array(z.string()),
    storyChapters: z.array(
      z.object({
        title: z.string(),
        lead: z.string(),
        body: z.string(),
        detailTag: z.string(),
      })
    ),
  }),
});

export const collections = { projects };
