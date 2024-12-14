"use client"

import { useState, useEffect } from 'react';
import { Blog, BlogFilter } from '@/lib/types/blog';
import { getBlogs } from '@/lib/services/blog-service';
import { toast } from 'sonner';

export function useBlogs(initialFilter: BlogFilter = { status: 'published' }) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<BlogFilter>(initialFilter);
  const [availableTags, setAvailableTags] = useState<string[]>([]);

  useEffect(() => {
    fetchBlogs();
  }, [filter]);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const result = await getBlogs({
        status: filter.status || 'published',
        tags: filter.tags,
        sortBy: filter.sortBy,
      });

      setBlogs(result);
      
      // Extract unique tags
      const tags = new Set<string>();
      result.forEach(blog => blog.tags.forEach(tag => tags.add(tag)));
      setAvailableTags(Array.from(tags));
    } catch (error: any) {
      toast.error('Failed to fetch blogs: ' + error.message);
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