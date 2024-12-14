"use client"

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Eye, MessageSquare } from 'lucide-react';
import { Blog } from '@/lib/types/blog';
import { format } from 'date-fns';

interface BlogCardProps {
  blog: Blog;
}

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <div className="p-6 border rounded-lg bg-card hover:shadow-sm transition-shadow">
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
            <span>
              {format(new Date(blog.created_at), 'MMM d, yyyy')}
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
  );
}