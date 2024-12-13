"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Blog, BlogFilter } from "@/lib/types/blog";
import { toast } from "sonner";

export function useBlogs(initialFilter: BlogFilter = { status: "published" }) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<BlogFilter>(initialFilter);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const supabase = createClient();

  useEffect(() => {
    fetchBlogs();
  }, [filter]);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from("blogs")
        .select("*")
        .eq("status", filter.status);

      if (filter.tags?.length) {
        query = query.contains("tags", filter.tags);
      }

      switch (filter.sortBy) {
        case "oldest":
          query = query.order("created_at", { ascending: true });
          break;
        case "popular":
          query = query.order("view_count", { ascending: false });
          break;
        default: // newest
          query = query.order("created_at", { ascending: false });
      }

      const { data, error } = await query;
      if (error) throw error;

      setBlogs(data || []);

      // Collect unique tags
      const tags = new Set<string>();
      data?.forEach((blog) =>
        blog.tags.forEach((tag: string) => tags.add(tag))
      );
      setAvailableTags(Array.from(tags));
    } catch (error: any) {
      toast.error("Failed to fetch blogs: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    blogs,
    isLoading,
    filter,
    setFilter,
    availableTags,
    refreshBlogs: fetchBlogs,
  };
}
