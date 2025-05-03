"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Highlight from "@tiptap/extension-highlight"
import Link from "@tiptap/extension-link"
import { Button } from "@/components/ui/button"
import { Bold, Italic, List, ListOrdered, Highlighter, LinkIcon, Link2OffIcon as LinkOff } from "lucide-react"
import { useEffect, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const [linkUrl, setLinkUrl] = useState<string>("")
  const [isLinkPopoverOpen, setIsLinkPopoverOpen] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight.configure({
        multicolor: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline underline-offset-2 hover:text-primary/80",
        },
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: "min-h-[150px] focus:outline-none",
      },
    },
  })

  // Update editor content when content prop changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [editor, content])

  const setLink = () => {
    if (!editor) return

    // Check if URL is valid
    if (linkUrl) {
      // Add https:// if no protocol is specified
      const url = linkUrl.match(/^https?:\/\//) ? linkUrl : `https://${linkUrl}`

      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
    }

    setIsLinkPopoverOpen(false)
    setLinkUrl("")
  }

  const removeLink = () => {
    if (!editor) return

    editor.chain().focus().extendMarkRange("link").unsetLink().run()
  }

  if (!editor) {
    return null
  }

  return (
    <div className="border rounded-md">
      <div className="flex items-center gap-1 border-b p-2 bg-muted/30 flex-wrap">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "bg-muted" : ""}
          aria-label="Bold"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "bg-muted" : ""}
          aria-label="Italic"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "bg-muted" : ""}
          aria-label="Bullet List"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "bg-muted" : ""}
          aria-label="Ordered List"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={editor.isActive("highlight") ? "bg-muted" : ""}
          aria-label="Highlight"
        >
          <Highlighter className="h-4 w-4" />
        </Button>

        <Popover open={isLinkPopoverOpen} onOpenChange={setIsLinkPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={editor.isActive("link") ? "bg-muted" : ""}
              aria-label="Insert Link"
            >
              <LinkIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4">
            <div className="space-y-2">
              <h4 className="font-medium">Insert Link</h4>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="https://example.com"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      setLink()
                    }
                  }}
                />
                <Button onClick={setLink}>Add</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {editor.isActive("link") && (
          <Button type="button" variant="ghost" size="sm" onClick={removeLink} aria-label="Remove Link">
            <LinkOff className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="p-3">
        <EditorContent editor={editor} className="prose prose-sm max-w-none" />
      </div>
    </div>
  )
}
