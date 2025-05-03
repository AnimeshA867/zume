import { ResumeTemplate } from "../resume-templates";

interface ContactSectionProps {
  name: string;
  email: string;
  address: string;
  linkedIn: string;
  phone: string;
  github: string;
  website: string;
  template: ResumeTemplate;
}

const ContactSection = ({
  name,
  email,
  address,
  linkedIn,
  phone,
  github,
  website,
  template,
}: ContactSectionProps) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
};

export default ContactSection;
