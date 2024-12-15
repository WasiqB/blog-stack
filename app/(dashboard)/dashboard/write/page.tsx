"use client";

import { BlogHeader } from "@/components/editor/header/blog-header";
import { TagInput } from "@/components/editor/tags/tag-input";
import { BlogEditor } from "@/components/editor/content/markdown-editor";
import { ScheduleModal } from "@/components/editor/publish/schedule-modal";
import { Button } from "@/components/ui/button";
import { useBlogEditor } from "@/lib/hooks/use-blog-editor";

export default function WritePage() {
  const { blog, updateField, saveDraft, scheduleBlog, isSaving } =
    useBlogEditor();

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Write New Blog</h1>
        <div className="flex gap-4">
          <Button variant="outline" onClick={saveDraft} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Draft"}
          </Button>
          <ScheduleModal onSchedule={scheduleBlog} />
        </div>
      </div>

      <div className="space-y-8">
        <BlogHeader
          title={blog.title}
          tagline={blog.tagline}
          imageUrl={blog.imageUrl}
          onUpdate={updateField}
        />

        <TagInput
          tags={blog.tags}
          onUpdate={(tags) => updateField("tags", tags)}
        />

        <BlogEditor
          content={blog.content}
          onChange={(value) => updateField("content", value)}
        />
      </div>
    </div>
  );
}
