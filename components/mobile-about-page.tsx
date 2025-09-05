"use client"

import { MobileNavigation } from "./mobile-navigation"
import { Highlighter } from "./magicui/highlighter"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink,
  Code,
  Database,
  Brain,
  Award,
  BookOpen,
  Users,
  Calendar,
  MapPin
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const skills = [
  { name: "Frontend", items: ["React", "Next.js", "TypeScript", "TailwindCSS"], color: "bg-blue-500" },
  { name: "Backend", items: ["Node.js", "Python", "Express", "FastAPI"], color: "bg-green-500" },
  { name: "Data & AI", items: ["Python", "TensorFlow", "Pandas", "Scikit-learn"], color: "bg-purple-500" },
  { name: "Tools", items: ["Git", "Docker", "AWS", "Vercel"], color: "bg-orange-500" },
]

const certifications = [
  { name: "AWS Certified Developer", issuer: "Amazon Web Services", year: "2024" },
  { name: "Google Data Analytics", issuer: "Google", year: "2023" },
  { name: "React Developer", issuer: "Meta", year: "2023" },
]

export function MobileAboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <MobileNavigation />
      
      <main className="px-4 py-6 space-y-8">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <div className="relative mx-auto w-32 h-32">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-xl"></div>
            <div className="relative">
              <Image
                src="/placeholder-user.jpg"
                alt="Gokulakrishnan"
                width={128}
                height={128}
                className="w-32 h-32 rounded-full object-cover shadow-2xl"
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <h1 className="text-2xl font-bold text-foreground">
              <Highlighter action="highlight" color="#10B981" size="lg">
                Hi 👋🏻 I'm <span className="text-muted-foreground">Gokulakrishnan</span>
              </Highlighter>
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed px-4">
              A curious builder who turns ideas into technology. From crafting web apps to exploring AI and data science, I'm always learning, experimenting, and striving to make an impact.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-4">
            <Link href="https://github.com/gokulakrishnan" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="gap-2">
                <Github className="h-4 w-4" />
                GitHub
              </Button>
            </Link>
            <Link href="https://linkedin.com/in/gokulakrishnan" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="gap-2">
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </Button>
            </Link>
            <Link href="mailto:gokulakrishnan@example.com">
              <Button variant="outline" size="sm" className="gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Button>
            </Link>
          </div>
        </section>

        {/* Quick Info */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-foreground text-center">
            <Highlighter action="underline" color="#8B5CF6" size="md">
              Quick Info
            </Highlighter>
          </h2>
          
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-3">
              <CardContent className="p-0 space-y-2 text-center">
                <div className="flex justify-center">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="text-xs font-medium text-foreground">Location</div>
                <div className="text-xs text-muted-foreground">India</div>
              </CardContent>
            </Card>
            
            <Card className="p-3">
              <CardContent className="p-0 space-y-2 text-center">
                <div className="flex justify-center">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="text-xs font-medium text-foreground">Experience</div>
                <div className="text-xs text-muted-foreground">2+ Years</div>
              </CardContent>
            </Card>
            
            <Card className="p-3">
              <CardContent className="p-0 space-y-2 text-center">
                <div className="flex justify-center">
                  <Code className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="text-xs font-medium text-foreground">Specialty</div>
                <div className="text-xs text-muted-foreground">Full Stack</div>
              </CardContent>
            </Card>
            
            <Card className="p-3">
              <CardContent className="p-0 space-y-2 text-center">
                <div className="flex justify-center">
                  <Users className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="text-xs font-medium text-foreground">Status</div>
                <div className="text-xs text-muted-foreground">Available</div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Skills */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-foreground text-center">
            <Highlighter action="highlight" color="#F59E0B" size="md">
              Skills & Technologies
            </Highlighter>
          </h2>
          
          <div className="space-y-3">
            {skills.map((skill) => (
              <Card key={skill.name} className="p-4">
                <CardContent className="p-0 space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${skill.color}`}></div>
                    <h3 className="font-semibold text-foreground">{skill.name}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <Badge key={item} variant="secondary" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Story */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-foreground text-center">
            <Highlighter action="underline" color="#8B5CF6" size="md">
              My Journey
            </Highlighter>
          </h2>
          
          <Card>
            <CardContent className="p-4 space-y-3">
              <p className="text-sm text-muted-foreground leading-relaxed">
                In 2025, I continued my journey as a software engineer, specializing in innovative full-stack
                development and later expanding my interests into data science. I focus on building and scaling
                impactful solutions, leveraging my diverse skill set across modern technologies.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                My approach combines technical expertise with creative problem-solving, always seeking to
                understand the bigger picture and deliver solutions that make a real difference.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Certifications */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-foreground text-center">
            <Highlighter action="highlight" color="#F59E0B" size="md">
              Certifications
            </Highlighter>
          </h2>
          
          <div className="space-y-3">
            {certifications.map((cert, index) => (
              <Card key={index} className="p-4">
                <CardContent className="p-0 space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-foreground text-sm">{cert.name}</h3>
                      <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {cert.year}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center space-y-4 pb-8">
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">
              <Highlighter action="highlight" color="#DC2626" size="md">
                Let's Connect
              </Highlighter>
            </h2>
            <p className="text-sm text-muted-foreground">
              Interested in working together? I'd love to hear about your project.
            </p>
          </div>
          
          <div className="flex flex-col gap-3">
            <Link href="/contact">
              <Button className="w-full gap-2">
                <Mail className="h-4 w-4" />
                Get In Touch
              </Button>
            </Link>
            <Link href="/projects">
              <Button variant="outline" className="w-full gap-2">
                <ExternalLink className="h-4 w-4" />
                View My Work
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
