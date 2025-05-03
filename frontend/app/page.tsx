import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { DotBackground } from "@/components/dot-background";
import { FeatureCard } from "@/components/feature-card";
import {
  ArrowRight,
  FileText,
  Palette,
  MousePointerClick,
  Highlighter,
  Sparkles,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section with Dot Background */}
      <DotBackground className="bg-background py-20 md:py-32">
        <div className="container flex flex-col items-center text-center">
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
            <Sparkles className="mr-1 inline-block h-3.5 w-3.5" />
            AI-Powered Resume Builder
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Build Job-Winning <span className="text-primary">Resumes</span> with
            AI
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Zume helps you analyze job descriptions and tailor resumes using
            drag-and-drop editing and smart templates.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/resume-builder">
              <Button size="lg" className="h-12 px-8 rounded-full">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="#features">
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 rounded-full"
              >
                See Features
              </Button>
            </Link>
          </div>

          {/* Floating Resume Preview */}
          <div className="relative mt-16 w-full max-w-3xl mx-auto">
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>

            <div className="relative bg-background rounded-xl border shadow-xl overflow-hidden transform transition-all hover:shadow-2xl">
              <Image
                src="/placeholder.svg?height=720&width=1280"
                alt="Resume Builder Screenshot"
                width={1280}
                height={720}
                className="w-full h-auto"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-background/80 to-transparent"></div>
            </div>
          </div>
        </div>
      </DotBackground>

      {/* Features Section */}
      <section id="features" className="bg-muted/50 py-20">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Powerful Features to Boost Your Job Search
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything you need to create professional, tailored resumes that
              get noticed.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={FileText}
              title="AI Keyword Extraction"
              description="Automatically extract relevant skills and keywords from job descriptions to tailor your resume."
            />
            <FeatureCard
              icon={Palette}
              title="Resume Templates"
              description="Choose from professionally designed templates with live preview to find the perfect style."
            />
            <FeatureCard
              icon={MousePointerClick}
              title="Drag-and-Drop Builder"
              description="Easily rearrange sections and customize your resume with our intuitive builder."
            />
            <FeatureCard
              icon={Highlighter}
              title="Rich Text Editing"
              description="Highlight important parts of your resume to make them stand out to recruiters."
            />
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="py-20">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              See Zume in Action
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our intuitive interface makes resume building simple and
              effective.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="group overflow-hidden rounded-xl border shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <div className="aspect-video relative overflow-hidden bg-muted">
                <Image
                  src="/placeholder.svg?height=720&width=1280"
                  alt="Resume Builder Screenshot"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold">
                  AI-Powered Resume Builder
                </h3>
                <p className="text-muted-foreground">
                  Analyze job descriptions and get tailored recommendations for
                  your resume.
                </p>
              </div>
            </div>
            <div className="group overflow-hidden rounded-xl border shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <div className="aspect-video relative overflow-hidden bg-muted">
                <Image
                  src="/placeholder.svg?height=720&width=1280"
                  alt="Template Selection Screenshot"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold">
                  Template Selection
                </h3>
                <p className="text-muted-foreground">
                  Choose from multiple professional templates with live preview.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <DotBackground className="bg-primary text-primary-foreground py-20">
        <div className="container text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Build Your Job-Winning Resume?
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80">
            Join thousands of job seekers who have found success with Zume.
          </p>
          <div className="mt-8">
            <Link href="/resume-builder">
              <Button
                size="lg"
                variant="secondary"
                className="h-12 px-8 rounded-full"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </DotBackground>
    </div>
  );
}
