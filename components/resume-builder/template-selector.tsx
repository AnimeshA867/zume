"use client"

import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { resumeTemplates } from "@/components/resume-templates"

interface TemplateSelectorProps {
  selectedTemplate: string
  onSelectTemplate: (templateId: string) => void
}

export function TemplateSelector({ selectedTemplate, onSelectTemplate }: TemplateSelectorProps) {
  const [open, setOpen] = useState(false)

  const handleSelectTemplate = (templateId: string) => {
    onSelectTemplate(templateId)
    setOpen(false)
  }

  const currentTemplate = resumeTemplates.find((template) => template.id === selectedTemplate)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          <span>Template: {currentTemplate?.name || "Select"}</span>
          <span className="sr-only">Change template</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Choose a Template</DialogTitle>
          <DialogDescription>
            Select a template for your resume. You can preview how your resume will look with each template.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 md:grid-cols-3">
          {resumeTemplates.map((template) => (
            <div
              key={template.id}
              className={`cursor-pointer rounded-lg border p-2 transition-all hover:shadow-md ${
                selectedTemplate === template.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => handleSelectTemplate(template.id)}
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md bg-muted">
                <Image
                  src={template.previewImage || "/placeholder.svg"}
                  alt={template.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-2 text-center">
                <h3 className="font-medium">{template.name}</h3>
                <p className="text-xs text-muted-foreground">{template.description}</p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
