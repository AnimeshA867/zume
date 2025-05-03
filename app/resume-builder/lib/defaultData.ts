import { v4 as uuidv4 } from "uuid";
import type {
  PersonalDetailsType,
  ResumeSection as ResumeSectionType,
} from "@/lib/types";

export const defaultSections: ResumeSectionType[] = [
  {
    id: uuidv4(),
    title: "Summary",
    content:
      "<p>Experienced professional with a track record of success in...</p>",
    order: 0,
    type: "summary",
  },
  {
    id: uuidv4(),
    title: "Experience",
    content:
      "<p>Company Name | Position Title | Date - Date</p><ul><li>Accomplishment 1</li><li>Accomplishment 2</li><li>Accomplishment 3</li></ul>",
    order: 1,
    type: "experience",
  },
  {
    id: uuidv4(),
    title: "Education",
    content:
      "<p>University Name | Degree | Graduation Date</p><ul><li>GPA: 3.8/4.0</li><li>Relevant Coursework: Course 1, Course 2</li></ul>",
    order: 2,
    type: "education",
  },
  {
    id: uuidv4(),
    title: "Skills",
    content:
      "<p>Technical Skills: Skill 1, Skill 2, Skill 3<br>Soft Skills: Communication, Leadership, Problem Solving</p>",
    order: 3,
    type: "skills",
  },
];

export const defaultPersonalDetails: PersonalDetailsType = {
  name: "Your Name",
  position: "Your Position",
  email: "your.email@example.com",
  phone: "(123) 456-7890",
  location: "City, State",
  linkedin: "linkedin.com/in/yourname",
  github: "",
};

// Available section types for adding new sections
export const sectionTypes = [
  {
    id: "certifications",
    title: "Certifications",
    content:
      "<p>Certification Name | Issuing Organization | Date</p><ul><li>Details about the certification</li><li>Skills or knowledge gained</li></ul>",
  },
  {
    id: "projects",
    title: "Projects",
    content:
      "<p>Project Name | Role | Date</p><ul><li>Description of the project</li><li>Technologies used</li><li>Outcomes or achievements</li></ul>",
  },
  {
    id: "languages",
    title: "Languages",
    content:
      "<p>Language 1 - Proficiency Level<br>Language 2 - Proficiency Level</p>",
  },
  {
    id: "volunteer",
    title: "Volunteer Experience",
    content:
      "<p>Organization Name | Role | Date</p><ul><li>Responsibilities and contributions</li><li>Impact or results</li></ul>",
  },
  {
    id: "publications",
    title: "Publications",
    content:
      "<p>Title of Publication | Publisher | Date</p><p>Brief description or abstract</p>",
  },
  {
    id: "awards",
    title: "Awards & Honors",
    content:
      "<p>Award Name | Issuing Organization | Date</p><p>Brief description of the award and its significance</p>",
  },
  {
    id: "references",
    title: "References",
    content:
      '<p>Reference Name | Position | Company<br>Email: email@example.com | Phone: (123) 456-7890</p><p>"Reference quote or note about availability upon request."</p>',
  },
  {
    id: "custom",
    title: "Custom Section",
    content: "<p>Add your content here...</p>",
  },
];
