import Link from "next/link"
import { Github, Linkedin, Twitter, Mail, MapPin, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const footerLinks = {
  navigation: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/experience", label: "Experience" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
  resources: [
    { href: "/resume", label: "Resume" },
    { href: "https://cv.gokulakrishnan.dev", label: "Download CV", external: true },
  ],
  social: [
    {
      href: "https://github.com/gokulakrishnxn",
      label: "GitHub",
      icon: Github,
    },
    {
      href: "https://www.linkedin.com/in/gokulakrishnxn/",
      label: "LinkedIn",
      icon: Linkedin,
    },
    {
      href: "https://x.com/Gokulakrishnxn",
      label: "Twitter",
      icon: Twitter,
    },
    {
      href: "mailto:Gokulakrishnxn@gmail.com",
      label: "Email",
      icon: Mail,
    },
  ],
}

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2 space-y-4">
            <div>
              <h3 className="text-xl font-bold">Gokulakrishnan</h3>
              <p className="text-muted-foreground">Software Engineer & Data Scientist</p>
            </div>
            <p className="text-sm text-muted-foreground max-w-md text-pretty">
              Passionate about building technology that makes a difference. Specializing in full-stack development, AI,
              and data science solutions.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              Chennai, India
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex gap-2">
                {footerLinks.social.map((social) => {
                  const Icon = social.icon
                  return (
                    <Link key={social.href} href={social.href} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Icon className="h-4 w-4" />
                        <span className="sr-only">{social.label}</span>
                      </Button>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} Gokulakrishnan. Built with</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span>using Next.js & TailwindCSS</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Made with v0.app</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
