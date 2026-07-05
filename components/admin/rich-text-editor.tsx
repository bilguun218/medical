"use client";

import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableRow } from "@tiptap/extension-table-row";
import {
  Bold,
  Heading1,
  Heading2,
  ImageIcon,
  Italic,
  Link2,
  List,
  ListOrdered,
  Quote,
  Table2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function RichTextEditor({
  value,
  onChange,
  minHeight = "min-h-48"
}: {
  value: string;
  onChange: (value: string) => void;
  minHeight?: string;
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https"
      }),
      Image.configure({
        allowBase64: false,
        inline: false
      }),
      Table.configure({
        resizable: false
      }),
      TableRow,
      TableHeader,
      TableCell
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class: cn("focus-ring rounded-b-lg border border-t-0 bg-white p-3 text-sm leading-7 outline-none", minHeight)
      }
    },
    onUpdate({ editor: currentEditor }) {
      const html = currentEditor.getHTML();
      onChange(html === "<p></p>" ? "" : html);
    }
  });

  useEffect(() => {
    if (!editor || editor.getHTML() === (value || "<p></p>")) return;
    editor.commands.setContent(value || "", { emitUpdate: false });
  }, [editor, value]);

  if (!editor) {
    return <div className={cn("rounded-lg border bg-white", minHeight)} />;
  }

  const iconButton = "h-9 w-9 px-0";

  return (
    <div>
      <div className="flex flex-wrap gap-1 rounded-t-lg border bg-slate-50 p-2">
        <Button type="button" variant={editor.isActive("bold") ? "default" : "ghost"} size="sm" className={iconButton} title="Тод" onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold className="h-4 w-4" />
        </Button>
        <Button type="button" variant={editor.isActive("italic") ? "default" : "ghost"} size="sm" className={iconButton} title="Налуу" onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic className="h-4 w-4" />
        </Button>
        <Button type="button" variant={editor.isActive("heading", { level: 1 }) ? "default" : "ghost"} size="sm" className={iconButton} title="Гарчиг 1" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button type="button" variant={editor.isActive("heading", { level: 2 }) ? "default" : "ghost"} size="sm" className={iconButton} title="Гарчиг 2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button type="button" variant={editor.isActive("bulletList") ? "default" : "ghost"} size="sm" className={iconButton} title="Сумтай жагсаалт" onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List className="h-4 w-4" />
        </Button>
        <Button type="button" variant={editor.isActive("orderedList") ? "default" : "ghost"} size="sm" className={iconButton} title="Дугаартай жагсаалт" onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button type="button" variant={editor.isActive("blockquote") ? "default" : "ghost"} size="sm" className={iconButton} title="Ишлэл" onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <Quote className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant={editor.isActive("link") ? "default" : "ghost"}
          size="sm"
          className={iconButton}
          title="Холбоос"
          onClick={() => {
            const current = editor.getAttributes("link").href as string | undefined;
            const href = window.prompt("URL", current ?? "");
            if (href === null) return;
            if (!href) {
              editor.chain().focus().unsetLink().run();
              return;
            }
            editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
          }}
        >
          <Link2 className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className={iconButton}
          title="Зураг"
          onClick={() => {
            const src = window.prompt("Зургийн URL", "");
            if (src) {
              editor.chain().focus().setImage({ src }).run();
            }
          }}
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className={iconButton}
          title="Хүснэгт"
          onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
        >
          <Table2 className="h-4 w-4" />
        </Button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
