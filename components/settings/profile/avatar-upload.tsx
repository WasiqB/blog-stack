"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ImagePlus, User } from "lucide-react";
import { uploadImage } from "@/lib/services/storage-service";
import { useProfile } from "@/lib/hooks/use-profile";
import { toast } from "sonner";

export function AvatarUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const { profile, updateProfile } = useProfile();

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const avatarUrl = await uploadImage(file);
      await updateProfile({ avatar_url: avatarUrl });
      toast.success("Avatar updated successfully");
    } catch (error) {
      toast.error("Failed to update avatar");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-20 w-20">
        <AvatarImage src={profile?.avatar_url} alt={profile?.full_name} />
        <AvatarFallback>
          <User className="h-8 w-8 text-muted-foreground" />
        </AvatarFallback>
      </Avatar>
      <div>
        <Button
          variant="outline"
          onClick={() => document.getElementById("avatar-upload")?.click()}
          disabled={isUploading}
        >
          <ImagePlus className="mr-2 h-4 w-4" />
          {isUploading ? "Uploading..." : "Change Avatar"}
        </Button>
        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleAvatarChange}
        />
      </div>
    </div>
  );
}
