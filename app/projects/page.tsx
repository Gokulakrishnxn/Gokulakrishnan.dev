"use client"

import { useState } from "react"
import { BrowserNavigation } from "@/components/browser-navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Filter, Globe, Database, Brain, Smartphone, Code2, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Highlighter } from "@/components/magicui/highlighter"

interface Project {
  id: string
  title: string
  description: string
  image?: string
  category: string
  technologies: string[]
  github: string
  demo: string
  featured: boolean
}

const projectCategories = [
  { id: "all", label: "All Projects", icon: Code2 },
  { id: "web", label: "Web Development", icon: Globe },
  { id: "data", label: "Data Science", icon: Database },
  { id: "ai", label: "AI/ML", icon: Brain },
  { id: "mobile", label: "Mobile", icon: Smartphone },
]

const projects: Project[] = []

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)

  const filteredProjects = projects.filter((project) => {
    const categoryMatch = selectedCategory === "all" || project.category === selectedCategory
    const featuredMatch = !showFeaturedOnly || project.featured
    return categoryMatch && featuredMatch
  })

  const featuredProjects = projects.filter(project => project.featured)

  return (
    <div className="min-h-screen bg-background">
      <BrowserNavigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Hero Section */}
        <section className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight">
              <Highlighter action="highlight" color="#EC4899" size="lg">
                My <span className="text-muted-foreground">Projects</span>
              </Highlighter>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
              A collection of projects showcasing my expertise in web development, data science, and AI. Each project represents a unique challenge and learning opportunity.
            </p>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-8 sm:py-12 lg:py-16 max-w-6xl mx-auto">
          <div className="space-y-6 sm:space-y-8">
            <div className="flex items-center gap-3">
              <Star className="h-6 w-6 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                <Highlighter action="underline" color="#F97316" size="md">
                  Featured Projects
                </Highlighter>
              </h2>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredProjects.map((project) => (
                <div key={project.id} className="group">
                  <div className="relative overflow-hidden rounded-2xl bg-background border border-border hover:border-border/80 transition-all duration-300">
                    <div className="relative">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={600}
                        height={300}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                        Featured
                      </Badge>
                    </div>
                    
                    <div className="p-6 space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 4).map((tech: string) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 4 && (
                          <Badge variant="secondary" className="text-xs">
                            +{project.technologies.length - 4}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex gap-3 pt-2">
                        <Link href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1">
                          <Button variant="outline" size="sm" className="w-full gap-2">
                            <Github className="h-4 w-4" />
                            Code
                          </Button>
                        </Link>
                        <Link href={project.demo} target="_blank" rel="noopener noreferrer" className="flex-1">
                          <Button size="sm" className="w-full gap-2">
                            <ExternalLink className="h-4 w-4" />
                            Demo
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* All Projects */}
        <section className="py-16 max-w-6xl mx-auto">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                <Highlighter action="highlight" color="#6366F1" size="md">
                  All Projects
                </Highlighter>
              </h2>
              <p className="text-lg text-muted-foreground">
                Explore my complete portfolio of projects across different technologies and domains
              </p>
            </div>

        {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {projectCategories.map((category) => {
                const Icon = category.icon
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {category.label}
                  </Button>
                )
              })}
            </div>

            <Button
              variant={showFeaturedOnly ? "default" : "outline"}
              size="sm"
              onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
              className="gap-2"
            >
              <Filter className="h-4 w-4" />
              Featured Only
            </Button>
          </div>

        {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
                <div key={project.id} className="group">
                  <div className="relative overflow-hidden rounded-xl bg-background border border-border hover:border-border/80 transition-all duration-300">
                    <div className="relative">
                      <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                        width={400}
                        height={200}
                        className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {project.featured && (
                        <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                          Featured
                        </Badge>
                  )}
                </div>

                    <div className="p-4 space-y-3">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                          {project.description}
                        </p>
                      </div>

                  <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map((tech: string) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                        {project.technologies.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                            +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>

                      <div className="flex gap-2 pt-1">
                    <Link href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1">
                          <Button variant="outline" size="sm" className="w-full gap-1 text-xs">
                            <Github className="h-3 w-3" />
                        Code
                      </Button>
                    </Link>
                    <Link href={project.demo} target="_blank" rel="noopener noreferrer" className="flex-1">
                          <Button size="sm" className="w-full gap-1 text-xs">
                            <ExternalLink className="h-3 w-3" />
                        Demo
                      </Button>
                    </Link>
                      </div>
                    </div>
                  </div>
                </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No projects found matching your criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory("all")
                  setShowFeaturedOnly(false)
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 max-w-4xl mx-auto">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
              <Highlighter action="underline" color="#14B8A6" size="md">
                Project Statistics
              </Highlighter>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-primary">{projects.length}+</div>
                  <div className="text-sm text-muted-foreground">Projects Completed</div>
                </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-primary">15+</div>
                  <div className="text-sm text-muted-foreground">Technologies Used</div>
                </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-primary">3</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
              <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-primary">100%</div>
                  <div className="text-sm text-muted-foreground">Client Satisfaction</div>
                </div>
              </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 max-w-4xl mx-auto">
          <div className="space-y-8 text-center">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                <Highlighter action="highlight" color="#DC2626" size="md">
                  Interested in Working Together?
                </Highlighter>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm always excited to take on new challenges and collaborate on innovative projects. Let's discuss how we can bring your ideas to life.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="gap-2">
                Start a Project
              </Button>
            </Link>
            <Link href="/about">
                <Button variant="outline" size="lg" className="gap-2">
                Learn More About Me
              </Button>
            </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
