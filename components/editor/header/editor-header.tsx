"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "./image-upload";

interface EditorHeaderProps {
  title: string;
  tagline: string;
  imageUrl: string;
  onUpdate: (field: string, value: string) => void;
}

export function EditorHeader({
  title,
  tagline,
  imageUrl,
  onUpdate,
}: EditorHeaderProps) {
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

      <ImageUpload
        imageUrl={imageUrl}
        onUpload={(url) => onUpdate("imageUrl", url)}
      />
    </div>
  );
}
