"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Trash2, User } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
  initialImage?: string | null
  onImageChange: (imageData: string | null) => void
}

export function ImageUpload({ initialImage = null, onImageChange }: ImageUploadProps) {
  const [image, setImage] = useState<string | null>(initialImage)
  const [isHovering, setIsHovering] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      // Check file size (limit to 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert("File size should be less than 2MB")
        return
      }

      // Check file type
      if (!file.type.match("image.*")) {
        alert("Please select an image file")
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          const imageData = event.target.result as string
          setImage(imageData)
          onImageChange(imageData)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setImage(null)
    onImageChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Photo</CardTitle>
        <CardDescription>Add a professional photo to your resume (optional)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          {image ? (
            <div
              className="relative w-32 h-32 mb-4 rounded-full overflow-hidden border"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <Image src={image || "/placeholder.svg"} alt="Profile" fill className="object-cover" />
              {isHovering && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleRemoveImage}
                    className="h-8 w-8 p-0 rounded-full"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="w-32 h-32 mb-4 rounded-full bg-muted flex items-center justify-center">
              <User className="h-12 w-12 text-muted-foreground" />
            </div>
          )}

          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />

          <Button variant="outline" onClick={triggerFileInput} className="mt-2">
            <Upload className="mr-2 h-4 w-4" />
            {image ? "Change Photo" : "Upload Photo"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
