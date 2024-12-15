"use client";

import { useState } from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BlogList } from "@/components/dashboard/blog/blog-list";
import { BlogFilters } from "@/components/dashboard/blog/blog-filters";
import { BlogStats } from "@/components/dashboard/stats/blog-stats";
import { EngagementChart } from "@/components/dashboard/stats/engagement-chart";
import { useBlogs } from "@/lib/hooks/use-blogs";
import { PenLine } from "lucide-react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"published" | "drafts">(
    "published"
  );
  const { blogs, filter, setFilter, availableTags } = useBlogs({
    status: activeTab,
  });

  const handleTabChange = (value: string) => {
    setActiveTab(value as "published" | "drafts");
    setFilter({ ...filter, status: value as "published" | "drafts" });
  };

  // Example data for stats and chart
  const stats = {
    totalViews: blogs.reduce((sum, blog) => sum + blog.view_count, 0),
    totalComments: blogs.reduce((sum, blog) => sum + blog.comment_count, 0),
    totalLikes: 0, // Add this when implementing likes feature
  };

  const chartData = [
    { date: "2024-01", views: 100, comments: 10 },
    { date: "2024-02", views: 200, comments: 15 },
    { date: "2024-03", views: 300, comments: 20 },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button asChild>
          <Link href="/dashboard/write">
            <PenLine className="mr-2 h-4 w-4" />
            Write New Blog
          </Link>
        </Button>
      </div>

      <BlogStats {...stats} />
      <EngagementChart data={chartData} />

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

        <TabsContent value="published">
          <BlogList filter={filter} onFilterChange={setFilter} />
        </TabsContent>

        <TabsContent value="drafts">
          <BlogList filter={filter} onFilterChange={setFilter} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
