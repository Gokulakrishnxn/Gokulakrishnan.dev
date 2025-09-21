import { Badge } from "@/components/ui/badge"
import { Award, Github, Linkedin, Twitter, Mail, Download, ExternalLink } from "lucide-react"
import Link from "next/link"
import { PixelImage } from "@/components/magicui/pixel-image"
import { Highlighter } from "@/components/magicui/highlighter"

const certifications = [
  {
    provider: "Microsoft",
    title: "Azure Fundamentals",
    year: "2024",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  },
  {
    provider: "Google",
    title: "Cloud Digital Leader",
    year: "2024",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  },
  {
    provider: "Meta",
    title: "Frontend Developer Professional",
    year: "2024",
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  },
  {
    provider: "Google",
    title: "Data Analytics Professional",
    year: "2023",
    color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Hero Section */}
        <section className="space-y-8 sm:space-y-12 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Profile Photo */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl blur-xl"></div>
                <div className="relative">
                  <PixelImage
                    src="/placeholder-user.jpg"
                    alt="Gokulakrishnan"
                    customGrid={{ rows: 6, cols: 6 }}
                    grayscaleAnimation={true}
                    className="w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto rounded-2xl shadow-2xl"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2 space-y-6 sm:space-y-8">
              <div className="space-y-4 sm:space-y-6">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight">
                  <Highlighter action="highlight" color="#10B981" size="lg">
                    Hi 👋🏻 I'm <span className="text-muted-foreground">Gokulakrishnan</span>
                  </Highlighter>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                  A curious builder who turns ideas into technology. From crafting web apps to exploring AI and data science, I'm always learning, experimenting, and striving to make an impact.
                </p>
              </div>

              {/* Social Links */}
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="https://github.com/gokulakrishnan" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background border border-border hover:bg-muted transition-colors"
                >
                  <Github className="h-4 w-4" />
                  <span className="text-sm font-medium">GitHub</span>
                </Link>
                <Link 
                  href="https://linkedin.com/in/gokulakrishnan" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background border border-border hover:bg-muted transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                  <span className="text-sm font-medium">LinkedIn</span>
                </Link>
                <Link 
                  href="https://twitter.com/gokulakrishnan" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background border border-border hover:bg-muted transition-colors"
                >
                  <Twitter className="h-4 w-4" />
                  <span className="text-sm font-medium">Twitter</span>
                </Link>
                <Link 
                  href="mailto:hello@gokulakrishnan.dev"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background border border-border hover:bg-muted transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span className="text-sm font-medium">Email</span>
                </Link>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/projects">
                  <button className="px-6 py-3 bg-foreground text-background rounded-lg font-medium hover:bg-foreground/90 transition-colors flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    View My Work
                  </button>
                </Link>
                <Link href="https://cv.gokulakrishnan.dev" target="_blank" rel="noopener noreferrer">
                  <button className="px-6 py-3 bg-background border border-border text-foreground rounded-lg font-medium hover:bg-muted transition-colors flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download Resume
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-8 sm:py-12 lg:py-16 max-w-4xl mx-auto">
          <div className="space-y-6 sm:space-y-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              <Highlighter action="underline" color="#8B5CF6" size="md">
                My Journey
              </Highlighter>
            </h2>
            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
              <p>
                In 2025, I continued my journey as a software engineer, specializing in innovative full-stack
                development and later expanding my interests into data science. I focus on building and scaling
                impactful solutions, leveraging my diverse skill set across modern technologies.
              </p>
              <p>
                I've completed multiple certifications from Microsoft, Google, and Meta, and contributed to a variety of
                small-scale projects that reflect both technical depth and creative problem-solving. Each project has
                been an opportunity to learn something new and push the boundaries of what's possible.
              </p>
              <p>
                I'm passionate about creating new things and constantly striving to learn. My work is fueled by the
                belief that technology should enhance lives and empower people. Whether it's building a seamless user
                interface or analyzing complex datasets, I approach every challenge with curiosity and determination.
              </p>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-16 max-w-4xl mx-auto">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                <Highlighter action="highlight" color="#F59E0B" size="md">
                  Certifications & Achievements
                </Highlighter>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Professional certifications that validate my expertise and commitment to continuous learning
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center justify-between p-6 rounded-lg bg-background border border-border hover:bg-muted/50 transition-colors">
                  <div className="space-y-2">
                    <Badge className={cert.color}>{cert.provider}</Badge>
                    <h3 className="font-semibold text-lg">{cert.title}</h3>
                    <p className="text-sm text-muted-foreground">Earned in {cert.year}</p>
                  </div>
                  <Award className="h-8 w-8 text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
