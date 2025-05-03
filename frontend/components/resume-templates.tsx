export type ResumeTemplate = {
  id: string
  name: string
  description: string
  previewImage: string
  styles: {
    fontFamily: string
    headingColor: string
    accentColor: string
    sectionSpacing: string
    headerStyle: string
  }
}

export const resumeTemplates: ResumeTemplate[] = [
  {
    id: "modern",
    name: "Modern",
    description: "A clean, professional template with a sidebar for skills and contact info.",
    previewImage: "/placeholder.svg?height=400&width=300",
    styles: {
      fontFamily: "Inter, sans-serif",
      headingColor: "#4f46e5",
      accentColor: "#818cf8",
      sectionSpacing: "1.5rem",
      headerStyle: "border-b border-gray-200 pb-4",
    },
  },
  {
    id: "classic",
    name: "Classic",
    description: "A traditional resume layout with a focus on experience and education.",
    previewImage: "/placeholder.svg?height=400&width=300",
    styles: {
      fontFamily: "Georgia, serif",
      headingColor: "#1e3a8a",
      accentColor: "#3b82f6",
      sectionSpacing: "1.25rem",
      headerStyle: "border-b-2 border-gray-300 pb-2",
    },
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "A minimalist design that lets your experience speak for itself.",
    previewImage: "/placeholder.svg?height=400&width=300",
    styles: {
      fontFamily: "system-ui, sans-serif",
      headingColor: "#18181b",
      accentColor: "#71717a",
      sectionSpacing: "1rem",
      headerStyle: "pb-2",
    },
  },
]
