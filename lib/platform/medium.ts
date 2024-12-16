import { createClient } from "@/lib/supabase/client";

const MEDIUM_API_URL = "https://api.medium.com/v1";

export async function getMediumAuthUrl() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const state = btoa(
    JSON.stringify({
      userId: user?.id,
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

export async function publishToMedium(
  title: string,
  content: string,
  tags: string[]
) {
  const supabase = createClient();
  const { data: profile } = await supabase
    .from("platform_tokens")
    .select("token")
    .eq("platform", "medium")
    .single();

  if (!profile?.token) {
    throw new Error("Medium account not connected");
  }

  const response = await fetch(`${MEDIUM_API_URL}/posts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${profile.token}`,
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
