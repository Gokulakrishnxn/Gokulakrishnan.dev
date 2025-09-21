"use client"

import { BrowserNavigation } from "@/components/browser-navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Download, ExternalLink, Mail, MapPin, Globe, Github, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"
import { Highlighter } from "@/components/magicui/highlighter"

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-background">
      <BrowserNavigation />

      <main className="container mx-auto px-4 py-8">
        {/* Header Actions */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-4 py-6">
          <div>
            <h1 className="text-3xl font-bold">Resume</h1>
            <p className="text-muted-foreground">Professional summary and detailed experience</p>
          </div>
          <div className="flex gap-3">
            <Link href="https://cv.gokulakrishnan.dev" target="_blank" rel="noopener noreferrer">
              <Button className="gap-2">
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
            </Link>
            <Button variant="outline" onClick={() => window.print()} className="gap-2">
              Print Resume
            </Button>
          </div>
        </section>

        {/* Resume Content */}
        <div className="max-w-4xl mx-auto">
          <Card className="print:shadow-none print:border-none">
            <CardContent className="p-8 space-y-8">
              {/* Header */}
              <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold">
                  <Highlighter action="highlight" color="#3B82F6" size="lg">
                    Gokulakrishnan
                  </Highlighter>
                </h1>
                <p className="text-xl text-muted-foreground">Software Engineer & Data Scientist</p>

                {/* Contact Info */}
                <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    Gokulakrishnxn@gmail.com
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    Chennai, India
                  </div>
                  <div className="flex items-center gap-1">
                    <Globe className="h-4 w-4" />
                    gokulakrishnan.dev
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-4">
                  <Link
                    href="https://github.com/gokulakrishnxn"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Github className="h-5 w-5" />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/gokulakrishnxn/"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Link>
                  <Link href="https://x.com/Gokulakrishnxn" className="text-muted-foreground hover:text-foreground">
                    <Twitter className="h-5 w-5" />
                  </Link>
                </div>
              </div>

              <Separator />

              {/* Professional Summary */}
              <section>
                <h2 className="text-2xl font-bold mb-4">
                  <Highlighter action="underline" color="#10B981" size="md">
                    Professional Summary
                  </Highlighter>
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Passionate software engineer and data scientist with 3+ years of experience in full-stack development,
                  machine learning, and data analytics. Proven track record of building scalable web applications,
                  implementing ML models, and delivering data-driven solutions. Strong expertise in modern web
                  technologies, cloud platforms, and agile methodologies. Committed to continuous learning and creating
                  technology that enhances lives and empowers people.
                </p>
              </section>

              <Separator />

              {/* Technical Skills */}
              <section>
                <h2 className="text-2xl font-bold mb-4">Technical Skills</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Frontend Development</h3>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {["React", "Next.js", "TypeScript", "JavaScript", "TailwindCSS", "HTML/CSS"].map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Backend Development</h3>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {["Node.js", "Python", "Express", "REST APIs", "GraphQL", "Microservices"].map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Database & Cloud</h3>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {["PostgreSQL", "MongoDB", "AWS", "Docker", "Redis", "Firebase"].map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Data Science & AI</h3>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {["Python", "Pandas", "Scikit-learn", "TensorFlow", "Machine Learning", "Data Analysis"].map(
                        (skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </section>

              <Separator />

              {/* Professional Experience */}
              <section>
                <h2 className="text-2xl font-bold mb-6">Professional Experience</h2>
                <div className="space-y-6">
                  {/* Senior Software Engineer */}
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold">Senior Software Engineer</h3>
                        <p className="text-muted-foreground">TechCorp Solutions • Chennai, India</p>
                      </div>
                      <p className="text-sm text-muted-foreground">Jan 2024 - Present</p>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                      <li>• Architected microservices-based e-commerce platform serving 100K+ users</li>
                      <li>• Reduced application load time by 40% through performance optimization</li>
                      <li>• Led team of 4 developers delivering 3 major product releases</li>
                      <li>• Implemented CI/CD pipelines reducing deployment time from 2 hours to 15 minutes</li>
                    </ul>
                  </div>

                  {/* Data Scientist */}
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold">Data Scientist</h3>
                        <p className="text-muted-foreground">DataInsights Analytics • Remote</p>
                      </div>
                      <p className="text-sm text-muted-foreground">Jun 2023 - Dec 2023</p>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                      <li>• Built predictive models improving revenue forecasting accuracy by 25%</li>
                      <li>• Designed ETL pipelines processing 1TB+ of data daily</li>
                      <li>• Created interactive dashboards for C-level executives</li>
                      <li>• Collaborated with cross-functional teams on technical solutions</li>
                    </ul>
                  </div>

                  {/* Full Stack Developer */}
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold">Full Stack Developer</h3>
                        <p className="text-muted-foreground">StartupHub Innovations • Chennai, India</p>
                      </div>
                      <p className="text-sm text-muted-foreground">Mar 2022 - May 2023</p>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                      <li>• Delivered 8 web applications from concept to production</li>
                      <li>• Improved mobile user engagement by 60% with responsive designs</li>
                      <li>• Integrated third-party APIs and payment gateways</li>
                      <li>• Mentored 2 junior developers and conducted code reviews</li>
                    </ul>
                  </div>
                </div>
              </section>

              <Separator />

              {/* Education */}
              <section>
                <h2 className="text-2xl font-bold mb-4">Education</h2>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">Bachelor of Technology in Computer Science</h3>
                    <p className="text-muted-foreground">Hindustan University • Chennai, India</p>
                    <p className="text-sm text-muted-foreground">CGPA: 8.7/10</p>
                  </div>
                  <p className="text-sm text-muted-foreground">2022 - 2026</p>
                </div>
              </section>

              <Separator />

              {/* Certifications */}
              <section>
                <h2 className="text-2xl font-bold mb-4">Certifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="text-sm">
                    <p className="font-medium">Microsoft Azure Fundamentals (AZ-900)</p>
                    <p className="text-muted-foreground">Microsoft • 2024</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Google Cloud Digital Leader</p>
                    <p className="text-muted-foreground">Google Cloud • 2024</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Meta Frontend Developer Professional</p>
                    <p className="text-muted-foreground">Meta • 2024</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Google Data Analytics Professional</p>
                    <p className="text-muted-foreground">Google • 2023</p>
                  </div>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>

        {/* Additional Actions */}
        <section className="py-12 text-center space-y-6">
          <h2 className="text-2xl font-bold">Interested in My Work?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Explore my projects, learn more about my experience, or get in touch to discuss opportunities.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/projects">
              <Button size="lg" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                View Projects
              </Button>
            </Link>
            <Link href="/experience">
              <Button variant="outline" size="lg" className="gap-2 bg-transparent">
                Detailed Experience
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="secondary" size="lg">
                Contact Me
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
