import * as z from 'zod';

export const blogSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  tagline: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  imageUrl: z.string().url().optional(),
  tags: z.array(z.string()),
  status: z.enum(['draft', 'published', 'scheduled']),
  scheduledFor: z.date().optional(),
  platforms: z.object({
    medium: z.boolean().optional(),
    hashnode: z.boolean().optional(),
  }).optional(),
});

export const profileSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  bio: z.string().max(160, 'Bio must be less than 160 characters').optional(),
  website: z.string().url().optional(),
  twitter: z.string().optional(),
  avatarUrl: z.string().url().optional(),
});

export const platformTokenSchema = z.object({
  platform: z.enum(['medium', 'hashnode']),
  token: z.string(),
  profile: z.record(z.any()),
});