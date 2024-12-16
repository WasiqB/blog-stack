"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const MarkdownPreview = dynamic(
  () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[500px] w-full" />,
  }
);

interface EditorPreviewProps {
  content: string;
}

export function EditorPreview({ content }: EditorPreviewProps) {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none p-4">
      <MarkdownPreview source={content} />
    </div>
  );
}
