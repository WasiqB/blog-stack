"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { EditorToolbar } from "./editor-toolbar";

const MarkdownEditor = dynamic(
  () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[500px] w-full" />,
  }
);

interface EditorContentProps {
  content: string;
  onChange: (value: string) => void;
}

export function EditorContent({ content, onChange }: EditorContentProps) {
  const handleToolbarAction = (action: string) => {
    // Implement toolbar actions
    console.log("Toolbar action:", action);
  };

  return (
    <div className="border rounded-md">
      <EditorToolbar onAction={handleToolbarAction} />
      <MarkdownEditor
        value={content}
        onChange={onChange}
        className="min-h-[500px]"
      />
    </div>
  );
}
