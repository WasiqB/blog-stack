"use client";

import { useState, useEffect } from "react";
import { UserProfile } from "@/lib/types/auth";
import { getUserById, updateUser } from "@/lib/services/user-service";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("No authenticated user");

      const userProfile = await getUserById(user.id);
      setProfile(userProfile);
    } catch (error: any) {
      toast.error("Failed to load profile: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    try {
      if (!profile?.id) throw new Error("No profile to update");

      const updatedProfile = await updateUser(profile.id, data);
      setProfile(updatedProfile);
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error("Failed to update profile: " + error.message);
      throw error;
    }
  };

  return {
    profile,
    isLoading,
    updateProfile,
    refreshProfile: fetchProfile,
  };
}
