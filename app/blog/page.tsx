import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react"
import Link from "next/link"

const blogPosts = [
  {
    slug: "building-scalable-react-applications",
    title: "Building Scalable React Applications: Best Practices and Patterns",
    excerpt:
      "Learn how to structure and build React applications that can grow with your team and requirements. We'll explore component architecture, state management, and performance optimization techniques.",
    publishedAt: "2024-12-15",
    readingTime: "8 min read",
    tags: ["React", "JavaScript", "Architecture", "Performance"],
    featured: true,
  },
  {
    slug: "machine-learning-for-web-developers",
    title: "Machine Learning for Web Developers: Getting Started with TensorFlow.js",
    excerpt:
      "Discover how to integrate machine learning models directly into your web applications using TensorFlow.js. From image classification to natural language processing.",
    publishedAt: "2024-12-10",
    readingTime: "12 min read",
    tags: ["Machine Learning", "TensorFlow", "JavaScript", "AI"],
    featured: true,
  },
  {
    slug: "nextjs-15-new-features",
    title: "What's New in Next.js 15: A Comprehensive Guide",
    excerpt:
      "Explore the latest features and improvements in Next.js 15, including enhanced performance, new APIs, and developer experience improvements.",
    publishedAt: "2024-12-05",
    readingTime: "6 min read",
    tags: ["Next.js", "React", "Web Development", "Framework"],
    featured: false,
  },
  {
    slug: "data-visualization-with-d3",
    title: "Creating Interactive Data Visualizations with D3.js and React",
    excerpt:
      "Learn how to combine the power of D3.js with React to create stunning, interactive data visualizations for your web applications.",
    publishedAt: "2024-11-28",
    readingTime: "10 min read",
    tags: ["D3.js", "React", "Data Visualization", "JavaScript"],
    featured: false,
  },
  {
    slug: "typescript-advanced-patterns",
    title: "Advanced TypeScript Patterns for Better Code Quality",
    excerpt:
      "Dive deep into advanced TypeScript patterns and techniques that will help you write more maintainable and type-safe code.",
    publishedAt: "2024-11-20",
    readingTime: "9 min read",
    tags: ["TypeScript", "JavaScript", "Code Quality", "Patterns"],
    featured: false,
  },
  {
    slug: "aws-serverless-architecture",
    title: "Building Serverless Applications with AWS Lambda and API Gateway",
    excerpt:
      "A complete guide to building and deploying serverless applications using AWS services. Learn about Lambda functions, API Gateway, and best practices.",
    publishedAt: "2024-11-15",
    readingTime: "11 min read",
    tags: ["AWS", "Serverless", "Lambda", "Cloud"],
    featured: false,
  },
]

const allTags = Array.from(new Set(blogPosts.flatMap((post) => post.tags))).sort()

export default function BlogPage() {
  const featuredPosts = blogPosts.filter((post) => post.featured)
  const recentPosts = blogPosts.filter((post) => !post.featured)

  return (
    <div className="min-h-screen bg-background">

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center space-y-6 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-balance">Blog & Articles</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Thoughts on software engineering, data science, and the latest in technology
          </p>
        </section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="py-12">
            <h2 className="text-2xl font-bold mb-8">Featured Articles</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Card key={post.slug} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <div className="text-6xl opacity-20">📝</div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-accent text-accent-foreground">Featured</Badge>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(post.publishedAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {post.readingTime}
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed line-clamp-3">{post.excerpt}</p>

                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {post.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{post.tags.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <Link href={`/blog/${post.slug}`}>
                      <Button className="w-full gap-2 group-hover:gap-3 transition-all">
                        Read Article
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* All Posts */}
        <section className="py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">All Articles</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{blogPosts.length} articles</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <Card key={post.slug} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.readingTime}
                    </div>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{post.excerpt}</p>

                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {post.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{post.tags.length - 2}
                      </Badge>
                    )}
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-2 group-hover:gap-3 transition-all bg-transparent"
                    >
                      Read More
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Tags Section */}
        <section className="py-12">
          <h2 className="text-2xl font-bold mb-6">Browse by Topic</h2>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-12">
          <Card className="text-center">
            <CardContent className="p-8 space-y-4">
              <h2 className="text-2xl font-bold">Stay Updated</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
                Get notified when I publish new articles about software engineering, data science, and technology
                trends.
              </p>
              <Link href="/contact">
                <Button size="lg" className="gap-2">
                  Get In Touch
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
