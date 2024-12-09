"use client"

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { BlogHeader } from '@/components/editor/blog-header';
import { TagInput } from '@/components/editor/tag-input';
import { Calendar, Eye } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Dynamically import the Markdown editor to avoid SSR issues
const MarkdownEditor = dynamic(
  () => import('@uiw/react-markdown-editor').then((mod) => mod.default),
  { ssr: false }
);

const MarkdownPreview = dynamic(
  () => import('@uiw/react-markdown-preview').then((mod) => mod.default),
  { ssr: false }
);

export default function WritePage() {
  const [blog, setBlog] = useState({
    title: '',
    tagline: '',
    imageUrl: '',
    content: '',
    tags: [] as string[],
  });

  const [activeTab, setActiveTab] = useState('write');

  const updateBlog = (field: string, value: any) => {
    setBlog((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveDraft = async () => {
    // TODO: Implement draft saving logic
    console.log('Saving draft:', blog);
  };

  const handleSchedule = () => {
    // TODO: Implement scheduling modal
    console.log('Opening schedule modal');
  };

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Write New Blog</h1>
        <div className="flex gap-4">
          <Button variant="outline" onClick={handleSaveDraft}>
            Save Draft
          </Button>
          <Button onClick={handleSchedule}>
            <Calendar className="mr-2 h-4 w-4" />
            Schedule
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        <BlogHeader
          title={blog.title}
          tagline={blog.tagline}
          imageUrl={blog.imageUrl}
          onUpdate={updateBlog}
        />

        <TagInput
          tags={blog.tags}
          onUpdate={(tags) => updateBlog('tags', tags)}
        />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="write">Write</TabsTrigger>
            <TabsTrigger value="preview">
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="write" className="min-h-[500px]">
            <MarkdownEditor
              value={blog.content}
              onChange={(value) => updateBlog('content', value)}
              className="h-[500px]"
            />
          </TabsContent>

          <TabsContent value="preview" className="min-h-[500px]">
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <MarkdownPreview source={blog.content} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}