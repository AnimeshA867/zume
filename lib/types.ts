export interface ResumeSection {
  id: string
  title: string
  content: string
  order: number
  type?: string
}

export interface JobDescription {
  text: string
  keywords: string[]
}
