"use client"

import type React from "react"

import { useState } from "react"
import { BrowserNavigation } from "@/components/browser-navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, MapPin, Clock, Send, Github, Linkedin, Twitter, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real app, you would send the data to your backend
    console.log("Form submitted:", formData)

    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" })
    setIsSubmitting(false)

    // Show success message (in a real app, you'd use a toast or notification)
    alert("Thank you for your message! I'll get back to you soon.")
  }

  return (
    <div className="min-h-screen bg-background">
      <BrowserNavigation />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center space-y-6 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-balance">Get In Touch</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Let's discuss your project, collaboration opportunities, or just have a conversation about technology
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Send Me a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What's this about?"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell me about your project, ideas, or just say hello..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full gap-2" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Direct Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Email</p>
                    <Link
                      href="mailto:Gokulakrishnxn@gmail.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      Gokulakrishnxn@gmail.com
                    </Link>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground">Chennai, India</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Response Time</p>
                    <p className="text-muted-foreground">Usually within 24 hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle>Connect With Me</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link
                  href="https://github.com/gokulakrishnxn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <Github className="h-5 w-5" />
                  <div>
                    <p className="font-medium">GitHub</p>
                    <p className="text-sm text-muted-foreground">@gokulakrishnxn</p>
                  </div>
                </Link>

                <Link
                  href="https://www.linkedin.com/in/gokulakrishnxn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                  <div>
                    <p className="font-medium">LinkedIn</p>
                    <p className="text-sm text-muted-foreground">@gokulakrishnxn</p>
                  </div>
                </Link>

                <Link
                  href="https://x.com/Gokulakrishnxn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                  <div>
                    <p className="font-medium">Twitter</p>
                    <p className="text-sm text-muted-foreground">@Gokulakrishnxn</p>
                  </div>
                </Link>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card>
              <CardHeader>
                <CardTitle>Current Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                    <span className="font-medium">Available for new projects</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    I'm currently open to freelance projects, full-time opportunities, and interesting collaborations.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="py-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">What type of projects do you work on?</h3>
                <p className="text-sm text-muted-foreground">
                  I specialize in full-stack web applications, data science projects, and AI/ML implementations. From
                  MVPs to enterprise solutions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">What's your typical project timeline?</h3>
                <p className="text-sm text-muted-foreground">
                  Project timelines vary based on complexity. Simple websites take 2-4 weeks, while complex applications
                  can take 2-6 months.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Do you work with international clients?</h3>
                <p className="text-sm text-muted-foreground">
                  I work with clients worldwide and am comfortable with remote collaboration across different time
                  zones.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">What's your preferred tech stack?</h3>
                <p className="text-sm text-muted-foreground">
                  I primarily work with React/Next.js, Node.js, TypeScript, and Python. I'm always open to learning new
                  technologies based on project needs.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 text-center">
          <Card>
            <CardContent className="p-8 space-y-4">
              <h2 className="text-2xl font-bold">Ready to Start Your Project?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
                Whether you have a detailed project plan or just an idea, I'd love to hear from you. Let's discuss how
                we can bring your vision to life.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="mailto:Gokulakrishnxn@gmail.com">
                  <Button size="lg" className="gap-2">
                    <Mail className="h-4 w-4" />
                    Email Me Directly
                  </Button>
                </Link>
                <Link href="/projects">
                  <Button variant="outline" size="lg" className="gap-2 bg-transparent">
                    View My Work
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
