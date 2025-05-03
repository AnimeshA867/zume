"use client";

import { useEffect, useRef } from "react";
import { resumeTemplates } from "@/components/resume-templates";
import type { ResumeSection, PersonalDetailsType } from "@/lib/types";
import Image from "next/image";
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";

interface ResumePreviewProps {
  sections: ResumeSection[];
  templateId: string;
  profileImage?: string | null;
  personalDetails: PersonalDetailsType;
}

export function ResumePreview({
  sections,
  templateId,
  profileImage,
  personalDetails,
}: ResumePreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null);

  const template =
    resumeTemplates.find((t) => t.id === templateId) || resumeTemplates[0];

  useEffect(() => {
    // Apply template styles to the preview
    if (previewRef.current) {
      const { styles } = template;
      const preview = previewRef.current;

      preview.style.fontFamily = styles.fontFamily;

      // Reset all heading colors
      const headings = preview.querySelectorAll("h1, h2, h3, h4, h5, h6");
      headings.forEach((heading) => {
        (heading as HTMLElement).style.color = styles.headingColor;
      });

      // Apply section spacing
      const sectionDivs = preview.querySelectorAll(".resume-section");
      sectionDivs.forEach((section) => {
        (section as HTMLElement).style.marginBottom = styles.sectionSpacing;
      });

      // Apply header style
      const headers = preview.querySelectorAll(".section-header");
      headers.forEach((header) => {
        (
          header as HTMLElement
        ).className = `section-header ${styles.headerStyle}`;
      });

      // Apply highlight styles
      const highlights = preview.querySelectorAll("mark");
      highlights.forEach((highlight) => {
        (highlight as HTMLElement).style.backgroundColor =
          styles.accentColor + "33"; // Add transparency
        (highlight as HTMLElement).style.color = styles.headingColor;
        (highlight as HTMLElement).style.padding = "0 0.125em";
        (highlight as HTMLElement).style.borderRadius = "0.125em";
      });

      // Style links
      const links = preview.querySelectorAll("a");
      links.forEach((link) => {
        (link as HTMLElement).style.color = styles.accentColor;
        (link as HTMLElement).style.textDecoration = "underline";
        (link as HTMLElement).style.textUnderlineOffset = "2px";
      });
    }
  }, [template, sections]);

  return (
    <div
      ref={previewRef}
      className="h-full w-full overflow-auto rounded-lg border bg-white p-8 shadow"
    >
      <div className="mx-auto max-w-[8.5in] space-y-6">
        {/* Header with personal details */}
        <div
          className="border-b pb-4"
          style={{ borderColor: template.styles.accentColor }}
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex items-center gap-4">
              {profileImage && (
                <div className="relative w-20 h-20 rounded-full overflow-hidden border flex-shrink-0">
                  <Image
                    src={profileImage || "/placeholder.svg"}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <h1
                  className="text-2xl font-bold"
                  style={{ color: template.styles.headingColor }}
                >
                  {personalDetails.name || "Your Name"}
                </h1>
                <p className="text-lg font-medium text-muted-foreground">
                  {personalDetails.position || "Your Position"}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-1 text-sm">
              {personalDetails.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{personalDetails.location}</span>
                </div>
              )}
              {personalDetails.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{personalDetails.phone}</span>
                </div>
              )}
              {personalDetails.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a href={`mailto:${personalDetails.email}`}>
                    {personalDetails.email}
                  </a>
                </div>
              )}
              {personalDetails.linkedin && (
                <div className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={
                      personalDetails.linkedin.startsWith("http")
                        ? personalDetails.linkedin
                        : `https://${personalDetails.linkedin}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {personalDetails.linkedin.replace(
                      /^https?:\/\/(www\.)?/,
                      ""
                    )}
                  </a>
                </div>
              )}
              {personalDetails.github && (
                <div className="flex items-center gap-2">
                  <Github className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={
                      personalDetails.github.startsWith("http")
                        ? personalDetails.github
                        : `https://${personalDetails.github}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {personalDetails.github.replace(/^https?:\/\/(www\.)?/, "")}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Resume sections */}
        {sections.map((section) => (
          <div key={section.id} className="resume-section">
            <h2
              className="section-header text-xl font-bold"
              style={{ color: template.styles.headingColor }}
            >
              {section.title}
            </h2>
            <div
              className="mt-2 prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
