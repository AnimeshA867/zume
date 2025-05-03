"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Grip, Trash2 } from "lucide-react"
import { RichTextEditor } from "./rich-text-editor"

interface ResumeSectionProps {
  id: string
  title: string
  content: string
  onUpdate: (id: string, content: string) => void
  onDelete: (id: string) => void
  onDragStart: (e: React.DragEvent, id: string) => void
  onDragOver: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent, id: string) => void
}

export function ResumeSection({
  id,
  title,
  content,
  onUpdate,
  onDelete,
  onDragStart,
  onDragOver,
  onDrop,
}: ResumeSectionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(content)
  const gripRef = useRef<HTMLDivElement>(null)

  const handleSave = () => {
    onUpdate(id, editedContent)
    setIsEditing(false)
  }

  const handleDragStart = (e: React.DragEvent) => {
    // Only allow dragging from the grip element
    if (e.target === gripRef.current || gripRef.current?.contains(e.target as Node)) {
      onDragStart(e, id)

      // Add a ghost image for better drag feedback
      const ghostElement = document.createElement("div")
      ghostElement.classList.add("bg-primary", "text-primary-foreground", "px-4", "py-2", "rounded")
      ghostElement.textContent = title
      document.body.appendChild(ghostElement)
      ghostElement.style.position = "absolute"
      ghostElement.style.top = "-1000px"
      e.dataTransfer.setDragImage(ghostElement, 0, 0)

      // Clean up the ghost element after drag
      setTimeout(() => {
        document.body.removeChild(ghostElement)
      }, 0)
    } else {
      // Prevent dragging if not from grip
      e.preventDefault()
      e.stopPropagation()
    }
  }

  return (
    <Card className="mb-4" onDragOver={onDragOver} onDrop={(e) => onDrop(e, id)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center">
          <div
            ref={gripRef}
            draggable
            onDragStart={handleDragStart}
            className="mr-2 p-1 rounded cursor-grab active:cursor-grabbing hover:bg-muted"
          >
            <Grip className="h-5 w-5 text-muted-foreground" />
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <Button size="sm" onClick={handleSave}>
              Save
            </Button>
          ) : (
            <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          )}
          <Button
            size="sm"
            variant="ghost"
            className="text-destructive hover:text-destructive"
            onClick={() => onDelete(id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <RichTextEditor content={editedContent} onChange={setEditedContent} />
        ) : (
          <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
        )}
      </CardContent>
    </Card>
  )
}
