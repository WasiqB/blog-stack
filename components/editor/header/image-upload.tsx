"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ImagePlus } from "lucide-react";
import { uploadImage } from "@/lib/services/storage/storage-service";
import { toast } from "sonner";

interface ImageUploadProps {
  imageUrl: string;
  onUpload: (url: string) => void;
}

export function ImageUpload({ imageUrl, onUpload }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadImage(file);
      onUpload(url);
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  return (
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
  );
}
