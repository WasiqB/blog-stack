"use client";

import { publishToMedium, publishToHashnode } from "./platform-publish";
import { Blog } from "@/lib/types/blog";

export async function syncBlogToPlatforms(blog: Blog) {
  const platforms = blog.platforms as { medium?: boolean; hashnode?: boolean };
  const publishPromises = [];

  if (platforms.medium) {
    publishPromises.push(
      publishToMedium({
        title: blog.title,
        content: blog.content,
        tags: blog.tags,
      }).catch((error) => {
        console.error("Failed to publish to Medium:", error);
        throw error;
      })
    );
  }

  if (platforms.hashnode) {
    publishPromises.push(
      publishToHashnode({
        title: blog.title,
        content: blog.content,
        tags: blog.tags,
      }).catch((error) => {
        console.error("Failed to publish to Hashnode:", error);
        throw error;
      })
    );
  }

  return Promise.all(publishPromises);
}
