"use client";
import type React from "react";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResumeSection } from "@/components/resume-builder/resume-section";
import { TemplateSelector } from "@/components/resume-builder/template-selector";
import { ResumePreview } from "@/components/resume-builder/resume-preview";
// import { useToast } from "@/components/ui/use-toast";
// import { useToast } from "@/components/ui/use-toast";
import { useToast } from "@/hooks/use-toast";
import type {
  ResumeSection as ResumeSectionType,
  PersonalDetailsType,
} from "@/lib/types";
import { PersonalDetails } from "@/components/resume-builder/personal-details";

import { Download, Plus, Wand2, Loader2 } from "lucide-react";
import { ResumeUpload } from "@/components/resume-builder/resume-upload";
import { ResumeRating } from "@/components/resume-builder/resume-rating";
import { ImageUpload } from "@/components/resume-builder/image-upload";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/components/auth-provider";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { generatePDF } from "../actions/generate-pdf";
import {
  defaultSections,
  sectionTypes,
  defaultPersonalDetails,
} from "./lib/defaultData";

export default function ResumeBuilderPage() {
  const [jobDescription, setJobDescription] = useState("");
  const [sections, setSections] =
    useState<ResumeSectionType[]>(defaultSections);
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [personalDetails, setPersonalDetails] = useState<PersonalDetailsType>(
    defaultPersonalDetails
  );

  // Load saved data from localStorage if available

  useEffect(() => {
    const savedSections = localStorage.getItem("zume-resume-sections");
    const savedTemplate = localStorage.getItem("zume-resume-template");
    const savedJobDescription = localStorage.getItem("zume-job-description");
    const savedProfileImage = localStorage.getItem("zume-profile-image");
    const savedPersonalDetails = localStorage.getItem("zume-personal-details");

    if (savedSections) {
      setSections(JSON.parse(savedSections));
    }

    if (savedTemplate) {
      setSelectedTemplate(savedTemplate);
    }

    if (savedJobDescription) {
      setJobDescription(savedJobDescription);
    }

    if (savedProfileImage) {
      setProfileImage(savedProfileImage);
    }
    if (savedPersonalDetails) {
      setPersonalDetails(JSON.parse(savedPersonalDetails));
    }
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("zume-resume-sections", JSON.stringify(sections));
    localStorage.setItem("zume-resume-template", selectedTemplate);
    localStorage.setItem("zume-job-description", jobDescription);
    localStorage.setItem(
      "zume-personal-details",
      JSON.stringify(personalDetails)
    );

    if (profileImage) {
      localStorage.setItem("zume-profile-image", profileImage);
    } else {
      localStorage.removeItem("zume-profile-image");
    }
  }, [
    sections,
    selectedTemplate,
    jobDescription,
    profileImage,
    personalDetails,
  ]);

  // Handle PDF download when URL is available
  useEffect(() => {
    if (downloadUrl) {
      // Create a link and trigger download
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `resume-${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Reset download URL
      setDownloadUrl(null);
    }
  }, [downloadUrl]);

  const handleAnalyzeJobDescription = () => {
    if (!jobDescription.trim()) {
      toast({
        title: "Error",
        description: "Please enter a job description to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    // Simulate AI analysis
    setTimeout(() => {
      // Extract keywords (this would be done by AI in a real implementation)
      const keywords = extractKeywords(jobDescription);

      // Update skills section with extracted keywords
      const updatedSections = sections.map((section) => {
        if (section.title === "Skills") {
          return {
            ...section,
            content: `<p>Technical Skills: ${keywords.technical.join(
              ", "
            )}<br>Soft Skills: ${keywords.soft.join(", ")}</p>`,
          };
        }
        return section;
      });

      setSections(updatedSections);
      setIsAnalyzing(false);

      toast({
        title: "Analysis Complete",
        description: "Job description analyzed and skills updated.",
      });
    }, 2000);
  };

  const extractKeywords = (text: string) => {
    // This is a simplified mock implementation
    // In a real app, this would use AI to extract relevant keywords
    const technicalSkills = [
      "JavaScript",
      "React",
      "TypeScript",
      "Node.js",
      "HTML/CSS",
    ];
    const softSkills = [
      "Communication",
      "Teamwork",
      "Problem Solving",
      "Time Management",
    ];

    // Filter skills based on job description
    const filteredTechnical = technicalSkills.filter((skill) =>
      text.toLowerCase().includes(skill.toLowerCase())
    );

    const filteredSoft = softSkills.filter((skill) =>
      text.toLowerCase().includes(skill.toLowerCase())
    );

    // Add some default skills if none were found
    return {
      technical:
        filteredTechnical.length > 0
          ? filteredTechnical
          : ["JavaScript", "React"],
      soft:
        filteredSoft.length > 0
          ? filteredSoft
          : ["Communication", "Problem Solving"],
    };
  };

  const handleAddSection = (sectionType: string) => {
    const sectionTemplate = sectionTypes.find(
      (type) => type.id === sectionType
    );

    if (!sectionTemplate) return;

    const newSection: ResumeSectionType = {
      id: uuidv4(),
      title: sectionTemplate.title,
      content: sectionTemplate.content,
      order: sections.length,
      type: sectionType,
    };

    setSections([...sections, newSection]);

    toast({
      title: "Section Added",
      description: `${sectionTemplate.title} section has been added to your resume.`,
    });
  };

  const handleUpdateSection = (id: string, content: string) => {
    const updatedSections = sections.map((section) => {
      if (section.id === id) {
        return { ...section, content };
      }
      return section;
    });

    setSections(updatedSections);
  };

  const handleDeleteSection = (id: string) => {
    const updatedSections = sections.filter((section) => section.id !== id);
    setSections(updatedSections);
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedItem(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();

    if (!draggedItem || draggedItem === targetId) {
      return;
    }

    const draggedIndex = sections.findIndex(
      (section) => section.id === draggedItem
    );
    const targetIndex = sections.findIndex(
      (section) => section.id === targetId
    );

    const newSections = [...sections];
    const draggedSection = newSections[draggedIndex];

    // Remove the dragged item
    newSections.splice(draggedIndex, 1);

    // Insert it at the target position
    newSections.splice(targetIndex, 0, draggedSection);

    // Update order property
    const updatedSections = newSections.map((section, index) => ({
      ...section,
      order: index,
    }));

    setSections(updatedSections);
    setDraggedItem(null);
  };

  const handleDownloadPDF = async () => {
    // Check if user is logged in
    if (!user && !isLoading) {
      setShowAuthDialog(true);
      return;
    }

    setIsDownloading(true);

    try {
      // Prepare resume data for the server action
      const resumeData = {
        sections: sections.sort((a, b) => a.order - b.order),
        templateId: selectedTemplate,
        profileImage: profileImage,
        personalDetails: personalDetails,
      };

      // Create form data for the server action
      const formData = new FormData();
      formData.append("resumeData", JSON.stringify(resumeData));

      // Call the server action
      const result = await generatePDF(formData);

      if (result.success && result.url) {
        setDownloadUrl(result.url);
        toast({
          title: "Download Complete",
          description: "Your resume has been downloaded successfully.",
        });
      } else {
        toast({
          title: "Download Failed",
          description:
            result.error || "Failed to generate PDF. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("PDF generation error:", error);
      toast({
        title: "Download Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleSignIn = () => {
    setShowAuthDialog(false);
    router.push("/auth/sign-in?redirect=/resume-builder");
  };

  const handleUpdatePersonalDetails = (details: PersonalDetailsType) => {
    setPersonalDetails(details);
  };
  return (
    <div className="container py-8">
      <h1 className="mb-6 text-3xl font-bold">Resume Builder</h1>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <ImageUpload
              initialImage={profileImage}
              onImageChange={setProfileImage}
            />

            <ResumeUpload
              onExtract={(extractedSections) => {
                setSections(extractedSections);
                toast({
                  title: "Resume Extracted",
                  description:
                    "Your resume has been successfully extracted and loaded.",
                });
              }}
            />
          </div>

          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 text-xl font-semibold">Job Description</h2>
              <Textarea
                placeholder="Paste job description here..."
                className="min-h-[200px]"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
              <Button
                className="mt-4 w-full"
                onClick={handleAnalyzeJobDescription}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Analyze Job Description
                    <Wand2 className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Resume Sections</h2>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Section
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {sectionTypes.map((type) => (
                    <DropdownMenuItem
                      key={type.id}
                      onClick={() => handleAddSection(type.id)}
                    >
                      {type.title}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <PersonalDetails
              initialDetails={personalDetails}
              onUpdate={handleUpdatePersonalDetails}
            />
            {sections
              .sort((a, b) => a.order - b.order)
              .map((section) => {
                if (section.title.toLowerCase() !== "contact information") {
                  return (
                    <ResumeSection
                      key={section.id}
                      id={section.id}
                      title={section.title}
                      content={section.content}
                      onUpdate={handleUpdateSection}
                      onDelete={handleDeleteSection}
                      onDragStart={handleDragStart}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    />
                  );
                }
                return null;
              })}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Resume Preview</h2>
            <form ref={formRef} action={handleDownloadPDF}>
              <Button
                type="submit"
                variant="outline"
                disabled={isDownloading}
                onClick={(e) => {
                  e.preventDefault();
                  handleDownloadPDF();
                }}
              >
                {isDownloading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating PDF...
                  </>
                ) : (
                  <>
                    Download PDF
                    <Download className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </div>

          <TemplateSelector
            selectedTemplate={selectedTemplate}
            onSelectTemplate={setSelectedTemplate}
          />

          <ResumeRating sections={sections} jobDescription={jobDescription} />

          <div className="h-[800px] rounded-lg border">
            <Tabs defaultValue="preview">
              <div className="flex items-center justify-between border-b px-4">
                <TabsList className="my-2">
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="preview" className="h-[calc(800px-48px)]">
                <ResumePreview
                  sections={sections.sort((a, b) => a.order - b.order)}
                  templateId={selectedTemplate}
                  profileImage={profileImage}
                  personalDetails={personalDetails}
                />
              </TabsContent>
              <TabsContent value="code" className="h-[calc(800px-48px)] p-4">
                <pre className="h-full overflow-auto rounded-lg bg-muted p-4">
                  <code>
                    {JSON.stringify(
                      {
                        personalDetails,
                        profileImage: profileImage ? "data:image/..." : null,
                        sections,
                      },
                      null,
                      2
                    )}
                  </code>
                </pre>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Authentication Dialog */}
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign in Required</DialogTitle>
            <DialogDescription>
              You need to sign in to download your resume as a PDF.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAuthDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSignIn}>Sign In</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
