"use client";

import { Button } from "@/components/ui/button";
import { Bold, Italic, Link, List, Image } from "lucide-react";

interface EditorToolbarProps {
  onAction: (action: string) => void;
}

export function EditorToolbar({ onAction }: EditorToolbarProps) {
  return (
    <div className="flex items-center gap-2 p-2 border-b">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onAction("bold")}
        title="Bold"
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onAction("italic")}
        title="Italic"
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onAction("link")}
        title="Insert Link"
      >
        <Link className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onAction("list")}
        title="Bullet List"
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onAction("image")}
        title="Insert Image"
      >
        <Image className="h-4 w-4" />
      </Button>
    </div>
  );
}
