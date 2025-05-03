"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Loader2, ThumbsUp, AlertCircle } from "lucide-react";
// import { useToast } from "@/components/ui/use-toast"
import { useToast } from "@/hooks/use-toast";
import type { ResumeSection } from "@/lib/types";
import React from "react";

interface ResumeRatingProps {
  sections: ResumeSection[];
  jobDescription: string;
}

export function ResumeRating({ sections, jobDescription }: ResumeRatingProps) {
  const [isRating, setIsRating] = useState(false);
  const [rating, setRating] = useState<{
    score: number;
    feedback: string[];
    strengths: string[];
    improvements: string[];
  } | null>(null);
  const { toast } = useToast();

  const handleRateResume = async () => {
    if (!jobDescription) {
      toast({
        title: "Job Description Required",
        description:
          "Please enter a job description to rate your resume against.",
        variant: "destructive",
      });
      return;
    }

    setIsRating(true);

    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Mock rating data
    // In a real implementation, this would use AI to analyze the resume against the job description
    const mockRating = {
      score: Math.floor(Math.random() * 30) + 70, // Random score between 70-99
      feedback: [
        "Your resume is well-structured and easy to read.",
        "The experience section effectively highlights your achievements.",
        "Your skills align with many of the job requirements.",
      ],
      strengths: [
        "Strong technical skills that match the job requirements",
        "Clear demonstration of achievements with metrics",
        "Well-organized sections with relevant information",
      ],
      improvements: [
        "Consider adding more keywords from the job description",
        "Quantify more of your achievements with specific metrics",
        "Tailor your summary more specifically to this position",
      ],
    };

    setRating(mockRating);
    setIsRating(false);

    toast({
      title: "Resume Rated",
      description:
        "Your resume has been analyzed and rated based on the job description.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resume Rating</CardTitle>
        <CardDescription>
          Get an AI-powered assessment of how well your resume matches the job
          description.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {rating ? (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{rating.score}%</div>
              <p className="text-sm text-muted-foreground">Match Score</p>
            </div>
            <Progress value={rating.score} className="h-2" />

            <div className="mt-6 space-y-4">
              <div>
                <h4 className="mb-2 font-medium flex items-center">
                  <ThumbsUp className="mr-2 h-4 w-4 text-green-500" />
                  Strengths
                </h4>
                <ul className="space-y-1 text-sm">
                  {rating.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-2 font-medium flex items-center">
                  <AlertCircle className="mr-2 h-4 w-4 text-amber-500" />
                  Suggested Improvements
                </h4>
                <ul className="space-y-1 text-sm">
                  {rating.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{improvement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Button
              onClick={() => setRating(null)}
              variant="outline"
              className="w-full mt-4"
            >
              Reset Rating
            </Button>
          </div>
        ) : (
          <Button
            onClick={handleRateResume}
            disabled={isRating}
            className="w-full"
          >
            {isRating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Resume...
              </>
            ) : (
              "Rate My Resume"
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
