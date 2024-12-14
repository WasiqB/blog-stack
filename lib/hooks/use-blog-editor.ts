"use client"

import { useState, useCallback } from 'react';
import { Blog } from '@/lib/types/blog';
import { createBlog, updateBlog } from '@/lib/services/blog-service';
import { toast } from 'sonner';

interface BlogState {
  title: string;
  tagline: string;
  imageUrl: string;
  content: string;
  tags: string[];
}

export function useBlogEditor(initialBlog?: Partial<BlogState>) {
  const [blog, setBlog] = useState<BlogState>({
    title: initialBlog?.title || '',
    tagline: initialBlog?.tagline || '',
    imageUrl: initialBlog?.imageUrl || '',
    content: initialBlog?.content || '',
    tags: initialBlog?.tags || [],
  });

  const [isSaving, setIsSaving] = useState(false);

  const updateField = useCallback((field: keyof BlogState, value: any) => {
    setBlog(prev => ({ ...prev, [field]: value }));
  }, []);

  const saveDraft = useCallback(async () => {
    if (!blog.title.trim()) {
      blog.title = 'Untitled Blog';
    }

    setIsSaving(true);
    try {
      await createBlog({
        ...blog,
        status: 'draft',
      });
      toast.success('Draft saved successfully');
    } catch (error: any) {
      toast.error('Failed to save draft: ' + error.message);
      throw error;
    } finally {
      setIsSaving(false);
    }
  }, [blog]);

  const scheduleBlog = useCallback(async (publishDate: Date, platforms: { medium: boolean; hashnode: boolean }) => {
    try {
      await createBlog({
        ...blog,
        status: 'scheduled',
        scheduledFor: publishDate,
        platforms,
      });
      toast.success('Blog scheduled successfully');
    } catch (error: any) {
      toast.error('Failed to schedule blog: ' + error.message);
      throw error;
    }
  }, [blog]);

  return {
    blog,
    updateField,
    saveDraft,
    scheduleBlog,
    isSaving,
  };
}