import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Zume</h3>
            <p className="text-sm text-muted-foreground">
              Build job-winning resumes with AI-powered keyword analysis and smart templates.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold">Product</h3>
            <Link href="/resume-builder" className="text-sm text-muted-foreground hover:text-foreground">
              Resume Builder
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold">Company</h3>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              About
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Blog
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold">Legal</h3>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Zume. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              GitHub
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Twitter
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
