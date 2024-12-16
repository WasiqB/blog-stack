"use client";

import { prisma } from "@/lib/prisma";
import { publishToMedium } from "@/lib/platform/medium";
import { publishToHashnode } from "@/lib/platform/hashnode";

export async function publishBlog(blogId: string) {
  const blog = await prisma.blog.findUnique({
    where: { id: blogId },
    include: { author: true },
  });

  if (!blog) {
    throw new Error("Blog not found");
  }

  // Update blog status to published
  await prisma.blog.update({
    where: { id: blogId },
    data: {
      status: "published",
      publishedAt: new Date(),
    },
  });

  // Publish to selected platforms
  const platforms = blog.platforms as { medium?: boolean; hashnode?: boolean };
  const publishPromises = [];

  if (platforms.medium) {
    publishPromises.push(
      publishToMedium(blog.title, blog.content, blog.tags).catch((error) =>
        console.error("Failed to publish to Medium:", error)
      )
    );
  }

  if (platforms.hashnode) {
    publishPromises.push(
      publishToHashnode(blog.title, blog.content, blog.tags).catch((error) =>
        console.error("Failed to publish to Hashnode:", error)
      )
    );
  }

  await Promise.all(publishPromises);
  return { success: true };
}

export async function scheduleBlog(blogId: string, publishDate: Date) {
  return prisma.blog.update({
    where: { id: blogId },
    data: {
      status: "scheduled",
      scheduledFor: publishDate,
    },
  });
}

export async function getScheduledBlogs() {
  return prisma.blog.findMany({
    where: {
      status: "scheduled",
      scheduledFor: {
        lte: new Date(),
      },
    },
  });
}
