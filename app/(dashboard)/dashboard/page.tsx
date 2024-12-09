"use client"

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { PenLine, Eye, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { Blog, BlogFilter } from '@/lib/types/blog';

// Temporary mock data
const mockBlogs: Blog[] = [
  {
    id: '1',
    title: 'Getting Started with Next.js',
    tagline: 'A comprehensive guide to Next.js',
    content: '...',
    status: 'published',
    tags: ['nextjs', 'react', 'webdev'],
    view_count: 1200,
    comment_count: 8,
    author_id: '1',
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
    published_at: '2024-01-01',
    platforms: {
      medium: true,
      hashnode: true,
    },
  },
  // Add more mock blogs as needed
];

export default function DashboardPage() {
  const [filter, setFilter] = useState<BlogFilter>({
    status: 'published',
    sortBy: 'newest',
  });

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

      <Tabs defaultValue="published" className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-4">
            <Select
              value={filter.sortBy}
              onValueChange={(value: any) =>
                setFilter({ ...filter, sortBy: value })
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="published" className="space-y-4">
          {mockBlogs.map((blog) => (
            <div
              key={blog.id}
              className="p-6 border rounded-lg bg-card hover:shadow-sm transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    <Link
                      href={`/dashboard/edit/${blog.id}`}
                      className="hover:underline"
                    >
                      {blog.title}
                    </Link>
                  </h2>
                  <p className="text-muted-foreground mb-4">{blog.tagline}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Eye className="mr-1 h-4 w-4" />
                      {blog.view_count} views
                    </span>
                    <span className="flex items-center">
                      <MessageSquare className="mr-1 h-4 w-4" />
                      {blog.comment_count} comments
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex gap-2">
                    {blog.platforms.medium && (
                      <Badge variant="secondary">Medium</Badge>
                    )}
                    {blog.platforms.hashnode && (
                      <Badge variant="secondary">Hashnode</Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {blog.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="drafts">
          {/* Similar structure for drafts */}
        </TabsContent>
      </Tabs>
    </div>
  );
}