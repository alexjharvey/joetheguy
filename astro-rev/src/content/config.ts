// src/content/config.ts
import { defineCollection, z } from "astro:content";

const projectsCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    subTitle: z.string().optional(),
    date: z.date(),
    featuredImage: image().optional(),
    beforeGallery: z.array(image()).optional(),
    afterGallery: z.array(image()).optional(),
    description: z.string().optional(),
    projectStats: z
      .object({
        squareFeet: z.string().optional(),
        duration: z.string().optional(),
        location: z.string().optional(),
        budgetRange: z.string().optional(),
        yearCompleted: z.string().optional(),
      })
      .optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const servicesCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    gallery: z.array(image()),
  }),
});

export const collections = {
  projects: projectsCollection,
  services: servicesCollection,
};
