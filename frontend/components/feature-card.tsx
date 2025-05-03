import type { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border bg-background p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
      <div className="absolute -z-10 inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      {/* Decorative dots */}
      <div className="absolute bottom-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-10 transition-opacity">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full bg-primary"></div>
        <div className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full bg-primary"></div>
        <div className="absolute top-3/4 left-1/4 w-1 h-1 rounded-full bg-primary"></div>
        <div className="absolute top-1/4 left-3/4 w-1 h-1 rounded-full bg-primary"></div>
        <div className="absolute top-3/4 left-3/4 w-1 h-1 rounded-full bg-primary"></div>
      </div>
    </div>
  )
}
