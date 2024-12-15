"use client";

import dynamic from "next/dynamic";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye } from "lucide-react";

const MarkdownEditor = dynamic(
  () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
  { ssr: false }
);

const MarkdownPreview = dynamic(
  () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
  { ssr: false }
);

interface EditorProps {
  content: string;
  onChange: (value: string) => void;
}

export function BlogEditor({ content, onChange }: EditorProps) {
  return (
    <Tabs defaultValue="write" className="space-y-4">
      <TabsList>
        <TabsTrigger value="write">Write</TabsTrigger>
        <TabsTrigger value="preview">
          <Eye className="mr-2 h-4 w-4" />
          Preview
        </TabsTrigger>
      </TabsList>

      <TabsContent value="write" className="min-h-[500px]">
        <MarkdownEditor
          value={content}
          onChange={onChange}
          className="h-[500px]"
        />
      </TabsContent>

      <TabsContent value="preview" className="min-h-[500px]">
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <MarkdownPreview source={content} />
        </div>
      </TabsContent>
    </Tabs>
  );
}
