"use client";

import { getPlatformToken } from "./platform-auth";
import { PublishOptions } from "@/lib/types/platform";

const HASHNODE_API_URL = "https://api.hashnode.com";

export async function publishToHashnode({
  title,
  content,
  tags,
}: PublishOptions) {
  const token = await getPlatformToken("hashnode");
  if (!token) throw new Error("Hashnode account not connected");

  const response = await fetch(HASHNODE_API_URL, {
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

export async function getHashnodeProfile(token: string) {
  const response = await fetch(HASHNODE_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      query: `
        query {
          me {
            username
            publication {
              _id
              domain
            }
          }
        }
      `,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch Hashnode profile");
  }

  return response.json();
}
