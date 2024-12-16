"use client";

import { prisma } from "@/lib/prisma";
import { BlogFilter } from "@/lib/types/blog";

export async function getBlogs(filter: BlogFilter & { authorId?: string }) {
  const where: any = {};

  if (filter.status) {
    where.status = filter.status;
  }

  if (filter.authorId) {
    where.authorId = filter.authorId;
  }

  if (filter.tags?.length) {
    where.tags = {
      hasEvery: filter.tags,
    };
  }

  const orderBy: any = {};
  switch (filter.sortBy) {
    case "oldest":
      orderBy.createdAt = "asc";
      break;
    case "popular":
      orderBy.viewCount = "desc";
      break;
    default:
      orderBy.createdAt = "desc";
  }

  return prisma.blog.findMany({
    where,
    orderBy,
    include: {
      author: {
        select: {
          id: true,
          fullName: true,
          avatarUrl: true,
        },
      },
    },
  });
}

export async function getBlogStats(userId: string) {
  const [totalViews, totalComments, publishedCount] = await Promise.all([
    prisma.blog.aggregate({
      where: { authorId: userId },
      _sum: { viewCount: true },
    }),
    prisma.blog.aggregate({
      where: { authorId: userId },
      _sum: { commentCount: true },
    }),
    prisma.blog.count({
      where: {
        authorId: userId,
        status: "published",
      },
    }),
  ]);

  return {
    totalViews: totalViews._sum.viewCount || 0,
    totalComments: totalComments._sum.commentCount || 0,
    publishedCount,
  };
}

export async function getBlogTags(userId: string) {
  const blogs = await prisma.blog.findMany({
    where: { authorId: userId },
    select: { tags: true },
  });

  const tags = new Set<string>();
  blogs.forEach((blog) => blog.tags.forEach((tag) => tags.add(tag)));

  return Array.from(tags);
}
