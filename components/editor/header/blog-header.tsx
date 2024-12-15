"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImagePlus } from "lucide-react";
import { uploadImage } from "@/lib/services/storage-service";
import { toast } from "sonner";

interface BlogHeaderProps {
  title: string;
  tagline: string;
  imageUrl: string;
  onUpdate: (field: string, value: string) => void;
}

export function BlogHeader({
  title,
  tagline,
  imageUrl,
  onUpdate,
}: BlogHeaderProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadImage(file);
      onUpdate("imageUrl", url);
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => onUpdate("title", e.target.value)}
          placeholder="Enter your blog title"
          className="text-lg"
        />
      </div>

      <div>
        <Label htmlFor="tagline">Tagline</Label>
        <Input
          id="tagline"
          value={tagline}
          onChange={(e) => onUpdate("tagline", e.target.value)}
          placeholder="A brief description of your blog"
        />
      </div>

      <div>
        <Label htmlFor="image">Cover Image</Label>
        <div className="mt-1 flex items-center gap-4">
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Blog cover"
              className="h-32 w-48 object-cover rounded-md"
            />
          )}
          <Button
            variant="outline"
            onClick={() => document.getElementById("image-upload")?.click()}
            disabled={isUploading}
          >
            <ImagePlus className="mr-2 h-4 w-4" />
            {imageUrl ? "Change Image" : "Add Cover Image"}
          </Button>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
      </div>
    </div>
  );
}
