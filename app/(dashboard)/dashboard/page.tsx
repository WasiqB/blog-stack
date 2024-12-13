"use client";

import { useState } from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BlogFilters } from "@/components/dashboard/blog-filters";
import { BlogCard } from "@/components/dashboard/blog-card";
import { useBlogs } from "@/lib/hooks/use-blogs";
import { PenLine } from "lucide-react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<
    "published" | "draft" | "scheduled"
  >("published");
  const { blogs, isLoading, filter, setFilter, availableTags } = useBlogs({
    status: activeTab,
  });

  const handleTabChange = (value: string) => {
    setActiveTab(value as "published" | "draft" | "scheduled");
    setFilter({
      ...filter,
      status: value as "published" | "draft" | "scheduled",
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Blogs</h1>
        <Button asChild>
          <Link href="/dashboard/write">
            <PenLine className="mr-2 h-4 w-4" />
            Write New Blog
          </Link>
        </Button>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="space-y-4"
      >
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
          </TabsList>

          <BlogFilters
            filter={filter}
            onFilterChange={setFilter}
            availableTags={availableTags}
          />
        </div>

        <TabsContent value="published" className="space-y-4">
          {isLoading ? (
            <div className="text-center text-muted-foreground">Loading...</div>
          ) : blogs.length === 0 ? (
            <div className="text-center text-muted-foreground">
              No published blogs found
            </div>
          ) : (
            blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
          )}
        </TabsContent>

        <TabsContent value="drafts" className="space-y-4">
          {isLoading ? (
            <div className="text-center text-muted-foreground">Loading...</div>
          ) : blogs.length === 0 ? (
            <div className="text-center text-muted-foreground">
              No drafts found
            </div>
          ) : (
            blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
