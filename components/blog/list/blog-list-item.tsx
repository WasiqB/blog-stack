"use client";

import { Blog } from "@/lib/types/blog";
import { Badge } from "@/components/ui/badge";
import { BlogActions } from "./blog-list-actions";
import { Eye, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { deleteBlog } from "@/lib/services/blog/blog-crud";

interface BlogListItemProps {
  blog: Blog;
  onDelete: () => void;
}

export function BlogListItem({ blog, onDelete }: BlogListItemProps) {
  const handleDelete = async () => {
    try {
      await deleteBlog(blog.id, blog.author_id);
      onDelete();
      toast.success("Blog deleted successfully");
    } catch (error) {
      toast.error("Failed to delete blog");
    }
  };

  return (
    <div className="p-6 border rounded-lg bg-card hover:shadow-sm transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
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
            <span>{format(new Date(blog.created_at), "MMM d, yyyy")}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <BlogActions blogId={blog.id} onDelete={handleDelete} />
          <div className="flex gap-2">
            {blog.platforms.medium && <Badge variant="secondary">Medium</Badge>}
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
