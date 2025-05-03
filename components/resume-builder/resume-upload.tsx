"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Upload, FileText, Loader2 } from "lucide-react";
// import { useToast } from "@/components/ui/use-toast"
import { useToast } from "@/hooks/use-toast";
import type { ResumeSection, PersonalDetailsType } from "@/lib/types";

interface ResumeUploadProps {
  onExtract: (sections: ResumeSection[]) => void;
  onExtractPersonalDetails?: (details: PersonalDetailsType) => void;
}

export function ResumeUpload({
  onExtract,
  onExtractPersonalDetails,
}: ResumeUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a resume file to upload.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    // Simulate file upload
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsUploading(false);
    setIsExtracting(true);

    // Simulate extraction process
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock extracted data
    // In a real implementation, this would parse the resume file
    const extractedSections: ResumeSection[] = [
      {
        id: "summary",
        title: "Summary",
        content:
          "<p>Experienced software engineer with 5+ years of experience in web development and cloud technologies.</p>",
        order: 0,
        type: "summary",
      },
      {
        id: "experience",
        title: "Experience",
        content:
          "<p><strong>Senior Developer</strong> | ABC Tech | 2020 - Present</p><ul><li>Led development of cloud-based applications</li><li>Improved system performance by 40%</li></ul><p><strong>Web Developer</strong> | XYZ Solutions | 2018 - 2020</p><ul><li>Developed responsive web applications</li><li>Collaborated with design team on UI/UX improvements</li></ul>",
        order: 1,
        type: "experience",
      },
      {
        id: "education",
        title: "Education",
        content:
          "<p><strong>Bachelor of Science in Computer Science</strong><br>University of Technology | 2018</p><ul><li>GPA: 3.8/4.0</li><li>Relevant Coursework: Data Structures, Algorithms, Web Development</li></ul>",
        order: 2,
        type: "education",
      },
      {
        id: "skills",
        title: "Skills",
        content:
          "<p><strong>Technical Skills:</strong> JavaScript, React, Node.js, AWS, Python<br><strong>Soft Skills:</strong> Communication, Teamwork, Problem Solving</p>",
        order: 3,
        type: "skills",
      },
      {
        id: "certifications",
        title: "Certifications",
        content:
          "<p><strong>AWS Certified Developer</strong> | Amazon Web Services | 2022</p><ul><li>Expertise in developing and maintaining applications on AWS</li></ul><p><strong>React Developer Certification</strong> | Meta | 2021</p><ul><li>Advanced knowledge of React and related technologies</li></ul>",
        order: 4,
        type: "certifications",
      },
    ];
    const extractedPersonalDetails: PersonalDetailsType = {
      name: "John Doe",
      position: "Senior Software Engineer",
      email: "john.doe@example.com",
      phone: "(123) 456-7890",
      location: "New York, NY",
      linkedin: "linkedin.com/in/johndoe",
      github: "github.com/johndoe",
    };
    onExtract(extractedSections);
    setIsExtracting(false);
    if (onExtractPersonalDetails) {
      onExtractPersonalDetails(extractedPersonalDetails);
    }
    toast({
      title: "Resume Extracted",
      description:
        "Your resume has been successfully analyzed and information extracted.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Existing Resume</CardTitle>
        <CardDescription>
          Upload your existing resume to extract information automatically.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {file
                ? file.name
                : "Drag and drop your resume or click to browse"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Supports PDF, DOCX, and TXT files
            </p>
          </div>
          <input
            type="file"
            id="resume-upload"
            className="hidden"
            accept=".pdf,.docx,.txt"
            onChange={handleFileChange}
          />
          <label htmlFor="resume-upload">
            <Button variant="outline" className="cursor-pointer" asChild>
              <span>
                <Upload className="mr-2 h-4 w-4" />
                Browse Files
              </span>
            </Button>
          </label>
          {file && (
            <Button
              onClick={handleUpload}
              disabled={isUploading || isExtracting}
              className="w-full"
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : isExtracting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Extracting...
                </>
              ) : (
                "Extract Information"
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
