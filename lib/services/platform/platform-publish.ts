"use client";

import { getPlatformToken } from "./platform-auth";

interface PublishOptions {
  title: string;
  content: string;
  tags: string[];
}

export async function publishToMedium({
  title,
  content,
  tags,
}: PublishOptions) {
  const token = await getPlatformToken("medium");
  if (!token) throw new Error("Medium account not connected");

  const response = await fetch("https://api.medium.com/v1/posts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      contentFormat: "markdown",
      content,
      tags,
      publishStatus: "public",
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to publish to Medium");
  }

  return response.json();
}

export async function publishToHashnode({
  title,
  content,
  tags,
}: PublishOptions) {
  const token = await getPlatformToken("hashnode");
  if (!token) throw new Error("Hashnode account not connected");

  const response = await fetch("https://api.hashnode.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token.token,
    },
    body: JSON.stringify({
      query: `
        mutation($input: CreateStoryInput!) {
          createStory(input: $input) {
            _id
            slug
          }
        }
      `,
      variables: {
        input: {
          title,
          contentMarkdown: content,
          tags: tags.map((tag) => ({ _id: tag })),
          publicationId: token.profile.publication._id,
        },
      },
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to publish to Hashnode");
  }

  return response.json();
}
