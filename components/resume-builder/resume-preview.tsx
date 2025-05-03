"use client"

import { useEffect, useRef } from "react"
import { resumeTemplates } from "@/components/resume-templates"
import type { ResumeSection } from "@/lib/types"
import Image from "next/image"

interface ResumePreviewProps {
  sections: ResumeSection[]
  templateId: string
  profileImage?: string | null
}

export function ResumePreview({ sections, templateId, profileImage }: ResumePreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null)

  const template = resumeTemplates.find((t) => t.id === templateId) || resumeTemplates[0]

  useEffect(() => {
    // Apply template styles to the preview
    if (previewRef.current) {
      const { styles } = template
      const preview = previewRef.current

      preview.style.fontFamily = styles.fontFamily

      // Reset all heading colors
      const headings = preview.querySelectorAll("h1, h2, h3, h4, h5, h6")
      headings.forEach((heading) => {
        ;(heading as HTMLElement).style.color = styles.headingColor
      })

      // Apply section spacing
      const sectionDivs = preview.querySelectorAll(".resume-section")
      sectionDivs.forEach((section) => {
        ;(section as HTMLElement).style.marginBottom = styles.sectionSpacing
      })

      // Apply header style
      const headers = preview.querySelectorAll(".section-header")
      headers.forEach((header) => {
        ;(header as HTMLElement).className = `section-header ${styles.headerStyle}`
      })

      // Apply highlight styles
      const highlights = preview.querySelectorAll("mark")
      highlights.forEach((highlight) => {
        ;(highlight as HTMLElement).style.backgroundColor = styles.accentColor + "33" // Add transparency
        ;(highlight as HTMLElement).style.color = styles.headingColor
        ;(highlight as HTMLElement).style.padding = "0 0.125em"
        ;(highlight as HTMLElement).style.borderRadius = "0.125em"
      })

      // Style links
      const links = preview.querySelectorAll("a")
      links.forEach((link) => {
        ;(link as HTMLElement).style.color = styles.accentColor
        ;(link as HTMLElement).style.textDecoration = "underline"
        ;(link as HTMLElement).style.textUnderlineOffset = "2px"
      })
    }
  }, [template, sections])

  return (
    <div ref={previewRef} className="h-full w-full overflow-auto rounded-lg border bg-white p-8 shadow">
      <div className="mx-auto max-w-[8.5in] space-y-6">
        {/* Header with optional profile image */}
        {profileImage && (
          <div className="flex items-center gap-4 mb-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border">
              <Image src={profileImage || "/placeholder.svg"} alt="Profile" fill className="object-cover" />
            </div>
            <div className="flex-1">
              {/* The first section (usually contact info) will be displayed next to the image */}
              {sections.length > 0 && sections[0].type === "contact" && (
                <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: sections[0].content }} />
              )}
            </div>
          </div>
        )}

        {/* Resume sections */}
        {sections.map(
          (section, index) =>
            // Skip the first section if it's contact info and we have a profile image
            !(profileImage && index === 0 && section.type === "contact") && (
              <div key={section.id} className="resume-section">
                <h2 className="section-header text-xl font-bold" style={{ color: template.styles.headingColor }}>
                  {section.title}
                </h2>
                <div className="mt-2 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: section.content }} />
              </div>
            ),
        )}
      </div>
    </div>
  )
}
