"use client";

import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BlogFilter } from "@/lib/types/blog";

interface BlogListFiltersProps {
  filter: BlogFilter;
  onFilterChange: (filter: BlogFilter) => void;
  availableTags: string[];
}

export function BlogListFilters({
  filter,
  onFilterChange,
  availableTags,
}: BlogListFiltersProps) {
  const handleTagClick = (tag: string) => {
    const currentTags = filter.tags || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter((t) => t !== tag)
      : [...currentTags, tag];

    onFilterChange({
      ...filter,
      tags: newTags.length > 0 ? newTags : undefined,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Select
          value={filter.sortBy || "newest"}
          onValueChange={(value: any) =>
            onFilterChange({ ...filter, sortBy: value })
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

      {availableTags.length > 0 && (
        <div>
          <p className="text-sm font-medium mb-2">Filter by Tags</p>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <Badge
                key={tag}
                variant={filter.tags?.includes(tag) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
