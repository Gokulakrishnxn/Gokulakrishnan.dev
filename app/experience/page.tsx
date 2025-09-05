import { BrowserNavigation } from "@/components/browser-navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Briefcase, 
  Award, 
  Calendar, 
  MapPin, 
  Building,
  Star,
  ExternalLink,
  Code,
  Users
} from "lucide-react"
import { Highlighter } from "@/components/magicui/highlighter"

interface ExperienceItem {
  id: string
  title: string
  company: string
  location: string
  duration: string
  description: string
  achievements: string[]
  technologies: string[]
  status: 'current' | 'previous'
  type: 'full-time' | 'part-time' | 'contract' | 'freelance'
  link?: string
}

const experienceData: ExperienceItem[] = [
  {
    id: "1",
    title: "Full Stack Developer",
    company: "Tech Solutions Inc.",
    location: "Remote",
    duration: "2023 - Present",
    description: "Developing and maintaining web applications using modern technologies. Working on both frontend and backend development with focus on user experience and performance optimization.",
    achievements: [
      "Led development of 3 major web applications",
      "Improved application performance by 40% through optimization",
      "Mentored 2 junior developers",
      "Implemented CI/CD pipelines reducing deployment time by 60%"
    ],
    technologies: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS", "Docker"],
    status: 'current',
    type: 'full-time'
  },
  {
    id: "2",
    title: "Frontend Developer",
    company: "Digital Agency Co.",
    location: "New York, NY",
    duration: "2022 - 2023",
    description: "Specialized in creating responsive and interactive user interfaces for various client projects. Focused on modern JavaScript frameworks and user experience design.",
    achievements: [
      "Developed 15+ client websites with 100% mobile responsiveness",
      "Reduced page load times by 50% through optimization",
      "Collaborated with design team to implement pixel-perfect UIs",
      "Maintained 99.9% uptime for all client projects"
    ],
    technologies: ["React", "Vue.js", "JavaScript", "CSS3", "Figma", "Git"],
    status: 'previous',
    type: 'full-time'
  },
  {
    id: "3",
    title: "Junior Web Developer",
    company: "StartupXYZ",
    location: "San Francisco, CA",
    duration: "2021 - 2022",
    description: "Worked on building and maintaining web applications for a fast-growing startup. Gained experience in full-stack development and agile methodologies.",
    achievements: [
      "Contributed to 5+ production applications",
      "Implemented automated testing reducing bugs by 30%",
      "Collaborated with cross-functional teams",
      "Learned modern development practices and tools"
    ],
    technologies: ["JavaScript", "Python", "Django", "PostgreSQL", "Docker"],
    status: 'previous',
    type: 'full-time'
  },
  {
    id: "4",
    title: "Freelance Web Developer",
    company: "Self-Employed",
    location: "Remote",
    duration: "2020 - 2021",
    description: "Provided web development services to small businesses and startups. Built custom websites and web applications from scratch.",
    achievements: [
      "Completed 20+ client projects",
      "Built custom e-commerce solutions",
      "Maintained 100% client satisfaction rate",
      "Developed expertise in multiple frameworks"
    ],
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "WordPress"],
    status: 'previous',
    type: 'freelance'
  }
]

const getStatusColor = (status: ExperienceItem['status']) => {
  switch (status) {
    case 'current':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'previous':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

const getStatusText = (status: ExperienceItem['status']) => {
  switch (status) {
    case 'current':
      return 'Current'
    case 'previous':
      return 'Previous'
    default:
      return 'Unknown'
  }
}

const getTypeIcon = (type: ExperienceItem['type']) => {
  switch (type) {
    case 'full-time':
      return <Briefcase className="h-5 w-5" />
    case 'part-time':
      return <Users className="h-5 w-5" />
    case 'contract':
      return <Code className="h-5 w-5" />
    case 'freelance':
      return <Building className="h-5 w-5" />
    default:
      return <Briefcase className="h-5 w-5" />
  }
}

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-background">
      <BrowserNavigation />

      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="space-y-8 max-w-4xl mx-auto">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              <Highlighter action="highlight" color="#EF4444" size="lg">
                Work <span className="text-muted-foreground">Experience</span>
              </Highlighter>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              My professional journey and career development. From full-stack development to specialized roles, 
              I've gained diverse experience across different technologies and industries.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-primary">{experienceData.filter(e => e.type === 'full-time').length}</div>
              <div className="text-sm text-muted-foreground">Full-time</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-primary">{experienceData.filter(e => e.type === 'freelance').length}</div>
              <div className="text-sm text-muted-foreground">Freelance</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-primary">{experienceData.filter(e => e.status === 'current').length}</div>
              <div className="text-sm text-muted-foreground">Current</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-primary">{experienceData.filter(e => e.status === 'previous').length}</div>
              <div className="text-sm text-muted-foreground">Previous</div>
            </div>
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="py-16 max-w-6xl mx-auto">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                <Highlighter action="underline" color="#06B6D4" size="md">
                  Professional Journey
                </Highlighter>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A comprehensive overview of my work experience and career progression
              </p>
            </div>

            {/* Timeline Container */}
            <div className="relative">
              {/* Central Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-0.5 w-0.5 h-full bg-gradient-to-b from-primary via-primary/50 to-primary/20"></div>
              
              <div className="space-y-16">
                {experienceData.map((item, index) => (
                  <div key={item.id} className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    {/* Timeline Dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-background border-4 border-primary flex items-center justify-center shadow-lg">
                          <div className="text-primary">
                            {getTypeIcon(item.type)}
                          </div>
                        </div>
                        {/* Pulse effect */}
                        <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
                      </div>
                    </div>
                    
                    {/* Content Card */}
                    <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                      <Card className="group hover:shadow-xl transition-all duration-500 border-border/50 hover:border-primary/30 bg-background/80 backdrop-blur-sm">
                        <CardContent className="p-8">
                          <div className="space-y-6">
                            {/* Header */}
                            <div className="space-y-3">
                              <div className="flex items-start justify-between gap-4">
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                                      {item.title}
                                    </h3>
                                    {item.link && (
                                      <a 
                                        href={item.link} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                      >
                                        <ExternalLink className="h-4 w-4" />
                                      </a>
                                    )}
                                  </div>
                                  <div className="text-lg font-semibold text-primary">
                                    {item.company}
                                  </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                  <Badge className={`${getStatusColor(item.status)} border-0`}>
                                    {getStatusText(item.status)}
                                  </Badge>
                                  <div className="text-sm font-medium text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                                    {item.type.replace('-', ' ').toUpperCase()}
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Details */}
                            <div className="space-y-4">
                              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4" />
                                  <span className="font-medium">{item.duration}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4" />
                                  <span className="font-medium">{item.location}</span>
                                </div>
                              </div>
                              
                              <p className="text-muted-foreground leading-relaxed">
                                {item.description}
                              </p>
                              
                              {/* Achievements */}
                              <div className="space-y-3">
                                <h4 className="font-semibold text-foreground flex items-center gap-2">
                                  <Star className="h-4 w-4 text-primary" />
                                  Key Achievements
                                </h4>
                                <div className="grid gap-2">
                                  {item.achievements.map((achievement, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                                      <span className="text-sm text-muted-foreground">{achievement}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Technologies */}
                              <div className="space-y-3">
                                <h4 className="font-semibold text-foreground flex items-center gap-2">
                                  <Code className="h-4 w-4 text-primary" />
                                  Technologies Used
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {item.technologies.map((tech, idx) => (
                                    <Badge key={idx} variant="secondary" className="text-xs">
                                      {tech}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 max-w-4xl mx-auto">
          <div className="space-y-8 text-center">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                <Highlighter action="highlight" color="#84CC16" size="md">
                  Ready for New Challenges
                </Highlighter>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm always excited to take on new projects and opportunities. With a diverse background in full-stack development, 
                I'm ready to contribute to innovative teams and build amazing products.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/resume">
                <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                  View Full Resume
                </button>
              </a>
              <a href="/contact">
                <button className="px-6 py-3 bg-background border border-border text-foreground rounded-lg font-medium hover:bg-muted transition-colors">
                  Let's Connect
                </button>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
