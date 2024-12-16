"use client";

import { getPlatformToken } from "./platform-auth";
import { PublishOptions } from "@/lib/types/platform";

const MEDIUM_API_URL = "https://api.medium.com/v1";

export async function getMediumAuthUrl() {
  const state = btoa(
    JSON.stringify({
      timestamp: Date.now(),
    })
  );

  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_MEDIUM_CLIENT_ID!,
    state,
    response_type: "code",
    redirect_uri: `${window.location.origin}/api/auth/medium/callback`,
    scope: "basicProfile,publishPost",
  });

  return `https://medium.com/m/oauth/authorize?${params.toString()}`;
}

export async function publishToMedium({
  title,
  content,
  tags,
}: PublishOptions) {
  const token = await getPlatformToken("medium");
  if (!token) throw new Error("Medium account not connected");

  const response = await fetch(`${MEDIUM_API_URL}/posts`, {
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

export async function getMediumProfile(token: string) {
  const response = await fetch(`${MEDIUM_API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch Medium profile");
  }

  return response.json();
}
