"use client";

import { BlogCard } from "./blog-card";
import { BlogFilter } from "@/lib/types/blog";
import { useBlogs } from "@/lib/hooks/use-blogs";

interface BlogListProps {
  filter: BlogFilter;
  onFilterChange: (filter: BlogFilter) => void;
}

export function BlogList({ filter, onFilterChange }: BlogListProps) {
  const { blogs, isLoading } = useBlogs(filter);

  if (isLoading) {
    return <div className="text-center text-muted-foreground">Loading...</div>;
  }

  if (blogs.length === 0) {
    return (
      <div className="text-center text-muted-foreground">No blogs found</div>
    );
  }

  return (
    <div className="space-y-4">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
}
