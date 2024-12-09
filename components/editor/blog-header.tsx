"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImagePlus } from 'lucide-react';

interface BlogHeaderProps {
  title: string;
  tagline: string;
  imageUrl: string;
  onUpdate: (field: string, value: string) => void;
}

export function BlogHeader({ title, tagline, imageUrl, onUpdate }: BlogHeaderProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // TODO: Implement image upload to Supabase storage
      // For now, we'll use a placeholder URL
      const imageUrl = URL.createObjectURL(file);
      onUpdate('imageUrl', imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
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
          onChange={(e) => onUpdate('title', e.target.value)}
          placeholder="Enter your blog title"
          className="text-lg"
        />
      </div>
      
      <div>
        <Label htmlFor="tagline">Tagline</Label>
        <Input
          id="tagline"
          value={tagline}
          onChange={(e) => onUpdate('tagline', e.target.value)}
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
            onClick={() => document.getElementById('image-upload')?.click()}
            disabled={isUploading}
          >
            <ImagePlus className="mr-2 h-4 w-4" />
            {imageUrl ? 'Change Image' : 'Add Cover Image'}
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