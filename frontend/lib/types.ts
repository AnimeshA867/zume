export interface PersonalDetailsType {
  name: string;
  position: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github?: string;
}

export interface ResumeSection {
  id: string;
  title: string;
  content: string;
  order: number;
  type?: string;
}

export interface JobDescription {
  text: string;
  keywords: string[];
}

export interface ResumeData {
  personalDetails: PersonalDetailsType;
  sections: ResumeSection[];
  templateId: string;
  profileImage?: string | null;
}
