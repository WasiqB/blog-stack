"use client";

import { useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

interface BlogState {
  title: string;
  tagline: string;
  imageUrl: string;
  content: string;
  tags: string[];
}

export function useBlogEditor(initialBlog?: Partial<BlogState>) {
  const [blog, setBlog] = useState<BlogState>({
    title: initialBlog?.title || "",
    tagline: initialBlog?.tagline || "",
    imageUrl: initialBlog?.imageUrl || "",
    content: initialBlog?.content || "",
    tags: initialBlog?.tags || [],
  });

  const [isSaving, setIsSaving] = useState(false);
  const supabase = createClient();

  const updateBlog = useCallback((field: keyof BlogState, value: any) => {
    setBlog((prev) => ({ ...prev, [field]: value }));
  }, []);

  const saveDraft = useCallback(async () => {
    if (!blog.title.trim()) {
      blog.title = "Untitled Blog";
    }

    setIsSaving(true);
    try {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      if (userError) throw userError;

      const { error } = await supabase.from("blogs").insert({
        title: blog.title,
        tagline: blog.tagline,
        content: blog.content,
        image_url: blog.imageUrl,
        tags: blog.tags,
        status: "draft",
        author_id: userData.user.id,
      });

      if (error) throw error;
      toast.success("Draft saved successfully");
    } catch (error: any) {
      toast.error("Failed to save draft: " + error.message);
    } finally {
      setIsSaving(false);
    }
  }, [blog, supabase]);

  const scheduleBlog = useCallback(
    async (
      publishDate: Date,
      platforms: { medium: boolean; hashnode: boolean }
    ) => {
      try {
        const { data: userData, error: userError } =
          await supabase.auth.getUser();
        if (userError) throw userError;

        const { error } = await supabase.from("blogs").insert({
          title: blog.title || "Untitled Blog",
          tagline: blog.tagline,
          content: blog.content,
          image_url: blog.imageUrl,
          tags: blog.tags,
          status: "scheduled",
          author_id: userData.user.id,
          scheduled_for: publishDate.toISOString(),
          platforms,
        });

        if (error) throw error;
        toast.success("Blog scheduled successfully");
      } catch (error: any) {
        toast.error("Failed to schedule blog: " + error.message);
      }
    },
    [blog, supabase]
  );

  return {
    blog,
    updateBlog,
    saveDraft,
    scheduleBlog,
    isSaving,
  };
}
