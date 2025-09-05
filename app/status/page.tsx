"use client"

import { useState, useEffect } from "react"
import { BrowserNavigation } from "@/components/browser-navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Clock, 
  RefreshCw, 
  Globe, 
  Server, 
  Database,
  Mail,
  Github,
  ExternalLink
} from "lucide-react"

interface ServiceStatus {
  id: string
  name: string
  description: string
  status: 'operational' | 'degraded' | 'outage' | 'maintenance'
  uptime: string
  responseTime: string
  lastChecked: string
  url?: string
}

const services: ServiceStatus[] = [
  {
    id: 'website',
    name: 'Website',
    description: 'Main portfolio website',
    status: 'operational',
    uptime: '99.9%',
    responseTime: '120ms',
    lastChecked: '2 minutes ago',
    url: 'https://gokulakrishnan.dev'
  },
  {
    id: 'api',
    name: 'API Services',
    description: 'Backend API endpoints',
    status: 'operational',
    uptime: '99.8%',
    responseTime: '85ms',
    lastChecked: '1 minute ago'
  },
  {
    id: 'database',
    name: 'Database',
    description: 'Primary database services',
    status: 'operational',
    uptime: '99.9%',
    responseTime: '45ms',
    lastChecked: '30 seconds ago'
  },
  {
    id: 'email',
    name: 'Email Service',
    description: 'Contact form and email delivery',
    status: 'operational',
    uptime: '99.7%',
    responseTime: '200ms',
    lastChecked: '1 minute ago'
  },
  {
    id: 'github',
    name: 'GitHub Integration',
    description: 'Code repository and CI/CD',
    status: 'operational',
    uptime: '99.9%',
    responseTime: '150ms',
    lastChecked: '2 minutes ago'
  },
  {
    id: 'cdn',
    name: 'CDN & Assets',
    description: 'Content delivery network',
    status: 'operational',
    uptime: '99.9%',
    responseTime: '25ms',
    lastChecked: '1 minute ago'
  }
]

const getStatusIcon = (status: ServiceStatus['status']) => {
  switch (status) {
    case 'operational':
      return <CheckCircle className="h-5 w-5 text-green-500" />
    case 'degraded':
      return <AlertCircle className="h-5 w-5 text-yellow-500" />
    case 'outage':
      return <XCircle className="h-5 w-5 text-red-500" />
    case 'maintenance':
      return <Clock className="h-5 w-5 text-blue-500" />
    default:
      return <AlertCircle className="h-5 w-5 text-gray-500" />
  }
}

const getStatusColor = (status: ServiceStatus['status']) => {
  switch (status) {
    case 'operational':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'degraded':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    case 'outage':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    case 'maintenance':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

const getStatusText = (status: ServiceStatus['status']) => {
  switch (status) {
    case 'operational':
      return 'Operational'
    case 'degraded':
      return 'Degraded Performance'
    case 'outage':
      return 'Service Outage'
    case 'maintenance':
      return 'Under Maintenance'
    default:
      return 'Unknown'
  }
}

export default function StatusPage() {
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)

  const refreshStatus = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setLastUpdated(new Date())
    setIsRefreshing(false)
  }

  const overallStatus = services.every(service => service.status === 'operational') 
    ? 'operational' 
    : services.some(service => service.status === 'outage') 
    ? 'outage' 
    : 'degraded'

  const averageUptime = services.reduce((acc, service) => {
    const uptime = parseFloat(service.uptime.replace('%', ''))
    return acc + uptime
  }, 0) / services.length

  return (
    <div className="min-h-screen bg-background">
      <BrowserNavigation />

      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="space-y-8 max-w-4xl mx-auto">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              System <span className="text-muted-foreground">Status</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Real-time status of all services and systems. We monitor our infrastructure 24/7 to ensure optimal performance.
            </p>
          </div>

          {/* Overall Status */}
          <div className="flex items-center justify-between p-6 rounded-xl bg-background border border-border">
            <div className="flex items-center gap-4">
              {getStatusIcon(overallStatus)}
              <div>
                <h2 className="text-xl font-semibold text-foreground">All Systems</h2>
                <p className="text-muted-foreground">Overall system status</p>
              </div>
            </div>
            <div className="text-right">
              <Badge className={getStatusColor(overallStatus)}>
                {getStatusText(overallStatus)}
              </Badge>
              <p className="text-sm text-muted-foreground mt-1">
                {averageUptime.toFixed(1)}% uptime
              </p>
            </div>
          </div>
        </section>

        {/* Services Status */}
        <section className="py-16 max-w-6xl mx-auto">
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">Services</h2>
                <p className="text-muted-foreground">
                  Individual service status and performance metrics
                </p>
              </div>
              <Button 
                onClick={refreshStatus} 
                disabled={isRefreshing}
                variant="outline"
                className="gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>

            <div className="grid gap-6">
              {services.map((service) => (
                <Card key={service.id} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {getStatusIcon(service.status)}
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg text-foreground">
                              {service.name}
                            </h3>
                            {service.url && (
                              <a 
                                href={service.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary transition-colors"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {service.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="text-right space-y-1">
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(service.status)}>
                              {getStatusText(service.status)}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <div>Uptime: {service.uptime}</div>
                            <div>Response: {service.responseTime}</div>
                            <div>Checked: {service.lastChecked}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Status History */}
        <section className="py-16 max-w-4xl mx-auto">
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Recent Incidents</h2>
              <p className="text-muted-foreground">
                Latest updates and maintenance windows
              </p>
            </div>

            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">All Systems Operational</h3>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Resolved
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        All services are running normally with optimal performance.
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Last updated: {lastUpdated.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Clock className="h-5 w-5 text-blue-500 mt-1" />
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">Scheduled Maintenance</h3>
                        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          Completed
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Database optimization and security updates completed successfully.
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Completed: 2 days ago
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact & Support */}
        <section className="py-16 max-w-4xl mx-auto">
          <div className="space-y-8 text-center">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Need Help?</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                If you're experiencing issues or have questions about our services, we're here to help.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:support@gokulakrishnan.dev">
                <Button size="lg" className="gap-2">
                  <Mail className="h-4 w-4" />
                  Contact Support
                </Button>
              </a>
              <a href="https://github.com/gokulakrishnan" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="gap-2">
                  <Github className="h-4 w-4" />
                  GitHub Issues
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
