"use client";

import { createClient } from "@/lib/supabase/client";
import { PlatformToken } from "@/lib/types/platform";

export async function getPlatformToken(
  platform: string
): Promise<PlatformToken | null> {
  const supabase = createClient();

  const { data } = await supabase
    .from("platform_tokens")
    .select("token, profile")
    .eq("platform", platform)
    .single();

  return data;
}

export async function storePlatformToken(
  platform: string,
  token: string,
  profile: any
) {
  const supabase = createClient();

  const { error } = await supabase.from("platform_tokens").upsert({
    platform,
    token,
    profile,
  });

  if (error) throw error;
}

export async function removePlatformToken(platform: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from("platform_tokens")
    .delete()
    .eq("platform", platform);

  if (error) throw error;
}
