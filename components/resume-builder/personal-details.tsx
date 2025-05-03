"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { PersonalDetailsType } from "@/lib/types";

interface PersonalDetailsProps {
  initialDetails: PersonalDetailsType;
  onUpdate: (details: PersonalDetailsType) => void;
}

export function PersonalDetails({
  initialDetails,
  onUpdate,
}: PersonalDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [details, setDetails] = useState<PersonalDetailsType>(initialDetails);

  const handleChange = (field: keyof PersonalDetailsType, value: string) => {
    setDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    onUpdate(details);
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">Personal Details</CardTitle>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <Button size="sm" onClick={handleSave}>
              Save
            </Button>
          ) : (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={details.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                value={details.position}
                onChange={(e) => handleChange("position", e.target.value)}
                placeholder="Software Engineer"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={details.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={details.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="(123) 456-7890"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={details.location}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="New York, NY"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                value={details.linkedin}
                onChange={(e) => handleChange("linkedin", e.target.value)}
                placeholder="linkedin.com/in/johndoe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="github">GitHub (Optional)</Label>
              <Input
                id="github"
                value={details.github || ""}
                onChange={(e) => handleChange("github", e.target.value)}
                placeholder="github.com/johndoe"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <div>
                <p className="font-semibold">{details.name || "Your Name"}</p>
                <p className="text-sm text-muted-foreground">
                  {details.position || "Your Position"}
                </p>
              </div>
              <div className="text-sm">
                <p>{details.location || "Your Location"}</p>
                <p>{details.phone || "Your Phone"}</p>
                <p>{details.email || "Your Email"}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 text-sm">
              {details.linkedin && (
                <span className="text-primary">
                  LinkedIn:{" "}
                  {details.linkedin.replace(/^https?:\/\/(www\.)?/, "")}
                </span>
              )}
              {details.github && (
                <span className="text-primary">
                  GitHub: {details.github.replace(/^https?:\/\/(www\.)?/, "")}
                </span>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
