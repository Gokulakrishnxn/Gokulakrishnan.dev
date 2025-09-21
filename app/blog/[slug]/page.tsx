"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft, Share2, Github, Linkedin, Twitter, ArrowRight } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

// Sample blog post data - in a real app, this would come from a CMS or markdown files
const blogPosts = {
  "building-scalable-react-applications": {
    title: "Building Scalable React Applications: Best Practices and Patterns",
    publishedAt: "2024-12-15",
    readingTime: "8 min read",
    tags: ["React", "JavaScript", "Architecture", "Performance"],
    content: `
# Building Scalable React Applications: Best Practices and Patterns

Building React applications that can scale with your team and requirements is crucial for long-term success. In this article, we'll explore proven patterns and best practices that will help you create maintainable, performant React applications.

## Component Architecture

### 1. Component Composition Over Inheritance

React favors composition over inheritance, and for good reason. Instead of creating complex inheritance hierarchies, build small, focused components that can be composed together.

\`\`\`jsx
// Good: Composition
function UserProfile({ user, actions }) {
  return (
    <Card>
      <UserAvatar user={user} />
      <UserInfo user={user} />
      <UserActions actions={actions} />
    </Card>
  )
}

// Avoid: Large monolithic components
function UserProfile({ user }) {
  return (
    <div>
      {/* 200+ lines of JSX */}
    </div>
  )
}
\`\`\`

### 2. Container and Presentational Components

Separate your components into containers (smart components) that handle logic and data, and presentational components (dumb components) that focus purely on rendering.

\`\`\`jsx
// Container Component
function UserListContainer() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers().then(setUsers).finally(() => setLoading(false))
  }, [])

  return <UserList users={users} loading={loading} />
}

// Presentational Component
function UserList({ users, loading }) {
  if (loading) return <LoadingSpinner />
  
  return (
    <ul>
      {users.map(user => (
        <UserListItem key={user.id} user={user} />
      ))}
    </ul>
  )
}
\`\`\`

## State Management

### 1. Start with Local State

Don't reach for complex state management solutions immediately. Start with local component state and lift state up only when necessary.

\`\`\`jsx
function SearchInput({ onSearch }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
    </form>
  )
}
\`\`\`

### 2. Use Context for Truly Global State

React Context is perfect for truly global state that many components need access to, like user authentication or theme preferences.

\`\`\`jsx
const AuthContext = createContext()

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuthStatus().then(setUser).finally(() => setLoading(false))
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
\`\`\`

## Performance Optimization

### 1. Memoization with React.memo

Use React.memo to prevent unnecessary re-renders of components when their props haven't changed.

\`\`\`jsx
const UserCard = React.memo(function UserCard({ user, onEdit }) {
  return (
    <Card>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <Button onClick={() => onEdit(user.id)}>Edit</Button>
    </Card>
  )
})
\`\`\`

### 2. Optimize Expensive Calculations

Use useMemo for expensive calculations and useCallback for function references that are passed as props.

\`\`\`jsx
function UserList({ users, searchTerm }) {
  const filteredUsers = useMemo(() => {
    return users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [users, searchTerm])

  const handleUserClick = useCallback((userId) => {
    // Handle user click
  }, [])

  return (
    <div>
      {filteredUsers.map(user => (
        <UserCard 
          key={user.id} 
          user={user} 
          onClick={handleUserClick}
        />
      ))}
    </div>
  )
}
\`\`\`

## Code Organization

### 1. Feature-Based Folder Structure

Organize your code by features rather than by file types. This makes it easier to locate related files and understand the application structure.

\`\`\`
src/
  features/
    auth/
      components/
        LoginForm.jsx
        SignupForm.jsx
      hooks/
        useAuth.js
      services/
        authApi.js
    users/
      components/
        UserList.jsx
        UserCard.jsx
      hooks/
        useUsers.js
      services/
        userApi.js
\`\`\`

### 2. Custom Hooks for Reusable Logic

Extract reusable logic into custom hooks to keep your components clean and promote code reuse.

\`\`\`jsx
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      setStoredValue(value)
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }

  return [storedValue, setValue]
}
\`\`\`

## Testing Strategy

### 1. Test User Behavior, Not Implementation

Focus on testing what users can see and do, rather than internal implementation details.

\`\`\`jsx
import { render, screen, fireEvent } from '@testing-library/react'
import UserForm from './UserForm'

test('submits form with user data', () => {
  const mockOnSubmit = jest.fn()
  render(<UserForm onSubmit={mockOnSubmit} />)

  fireEvent.change(screen.getByLabelText(/name/i), {
    target: { value: 'John Doe' }
  })
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: 'john@example.com' }
  })
  fireEvent.click(screen.getByRole('button', { name: /submit/i }))

  expect(mockOnSubmit).toHaveBeenCalledWith({
    name: 'John Doe',
    email: 'john@example.com'
  })
})
\`\`\`

## Conclusion

Building scalable React applications requires thoughtful architecture, proper state management, performance optimization, and good testing practices. By following these patterns and best practices, you'll create applications that are maintainable, performant, and enjoyable to work with.

Remember, scalability isn't just about handling more users or data—it's also about making your codebase scalable for your development team. Start simple, measure performance, and optimize when necessary.

What patterns have you found most helpful in your React applications? I'd love to hear about your experiences in the comments below.
    `,
  },
  "machine-learning-for-web-developers": {
    title: "Machine Learning for Web Developers: Getting Started with TensorFlow.js",
    publishedAt: "2024-12-10",
    readingTime: "12 min read",
    tags: ["Machine Learning", "TensorFlow", "JavaScript", "AI"],
    content: `
# Machine Learning for Web Developers: Getting Started with TensorFlow.js

Machine learning is no longer confined to Python and data science notebooks. With TensorFlow.js, web developers can now integrate powerful ML models directly into their applications, running inference in the browser or on Node.js servers.

## Why TensorFlow.js?

TensorFlow.js brings several advantages to web developers:

- **No server required**: Models run directly in the browser
- **Privacy-first**: Data never leaves the user's device
- **Real-time inference**: Immediate predictions without network latency
- **Familiar ecosystem**: Use JavaScript/TypeScript you already know

## Getting Started

### Installation

\`\`\`bash
npm install @tensorflow/tfjs
\`\`\`

### Your First Model

Let's start with a simple linear regression model:

\`\`\`javascript
import * as tf from '@tensorflow/tfjs'

// Create a simple model
const model = tf.sequential({
  layers: [
    tf.layers.dense({ inputShape: [1], units: 1 })
  ]
})

// Compile the model
model.compile({
  optimizer: 'sgd',
  loss: 'meanSquaredError'
})

// Training data
const xs = tf.tensor2d([1, 2, 3, 4], [4, 1])
const ys = tf.tensor2d([1, 3, 5, 7], [4, 1])

// Train the model
await model.fit(xs, ys, { epochs: 100 })

// Make predictions
const prediction = model.predict(tf.tensor2d([5], [1, 1]))
prediction.print() // Should output approximately 9
\`\`\`

## Real-World Applications

### 1. Image Classification

Here's how to use a pre-trained MobileNet model for image classification:

\`\`\`javascript
import * as tf from '@tensorflow/tfjs'

async function classifyImage(imageElement) {
  // Load pre-trained MobileNet model
  const model = await tf.loadLayersModel('https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v3_small_100_224/classification/5/default/1')
  
  // Preprocess the image
  const tensor = tf.browser.fromPixels(imageElement)
    .resizeNearestNeighbor([224, 224])
    .toFloat()
    .div(255.0)
    .expandDims()
  
  // Make prediction
  const predictions = await model.predict(tensor).data()
  
  // Get top prediction
  const topPrediction = Array.from(predictions)
    .map((p, i) => ({ probability: p, className: IMAGENET_CLASSES[i] }))
    .sort((a, b) => b.probability - a.probability)[0]
  
  return topPrediction
}
\`\`\`

### 2. Sentiment Analysis

Build a sentiment analysis model for text:

\`\`\`javascript
class SentimentAnalyzer {
  constructor() {
    this.model = null
    this.tokenizer = null
  }

  async loadModel() {
    this.model = await tf.loadLayersModel('/models/sentiment-model.json')
    this.tokenizer = await fetch('/models/tokenizer.json').then(r => r.json())
  }

  preprocessText(text) {
    // Tokenize and pad sequences
    const tokens = text.toLowerCase().split(' ')
    const indices = tokens.map(token => this.tokenizer[token] || 0)
    
    // Pad to fixed length
    const maxLength = 100
    const padded = indices.slice(0, maxLength)
    while (padded.length < maxLength) {
      padded.push(0)
    }
    
    return tf.tensor2d([padded])
  }

  async predict(text) {
    const processed = this.preprocessText(text)
    const prediction = await this.model.predict(processed).data()
    
    return {
      sentiment: prediction[0] > 0.5 ? 'positive' : 'negative',
      confidence: Math.abs(prediction[0] - 0.5) * 2
    }
  }
}
\`\`\`

## Performance Optimization

### 1. Model Quantization

Reduce model size and improve inference speed:

\`\`\`javascript
// Convert model to quantized format
const quantizedModel = await tf.loadLayersModel('model.json')
await quantizedModel.save('indexeddb://quantized-model')
\`\`\`

### 2. WebGL Backend

Leverage GPU acceleration:

\`\`\`javascript
// Set WebGL backend for GPU acceleration
await tf.setBackend('webgl')

// Verify backend
console.log('Backend:', tf.getBackend())
\`\`\`

### 3. Memory Management

Properly dispose of tensors to prevent memory leaks:

\`\`\`javascript
function processImage(imageData) {
  return tf.tidy(() => {
    const tensor = tf.browser.fromPixels(imageData)
    const resized = tensor.resizeNearestNeighbor([224, 224])
    const normalized = resized.div(255.0)
    
    // All intermediate tensors are automatically disposed
    return normalized
  })
}
\`\`\`

## Building a Complete Application

Let's build a real-time object detection app:

\`\`\`javascript
class ObjectDetector {
  constructor() {
    this.model = null
    this.video = null
    this.canvas = null
  }

  async initialize() {
    // Load COCO-SSD model
    this.model = await cocoSsd.load()
    
    // Setup video stream
    this.video = document.getElementById('video')
    this.canvas = document.getElementById('canvas')
    
    const stream = await navigator.mediaDevices.getUserMedia({ video: true })
    this.video.srcObject = stream
    
    this.video.addEventListener('loadeddata', () => {
      this.detectObjects()
    })
  }

  async detectObjects() {
    if (this.model && this.video.readyState === 4) {
      const predictions = await this.model.detect(this.video)
      this.drawPredictions(predictions)
    }
    
    requestAnimationFrame(() => this.detectObjects())
  }

  drawPredictions(predictions) {
    const ctx = this.canvas.getContext('2d')
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    
    predictions.forEach(prediction => {
      const [x, y, width, height] = prediction.bbox
      
      // Draw bounding box
      ctx.strokeStyle = '#00ff00'
      ctx.lineWidth = 2
      ctx.strokeRect(x, y, width, height)
      
      // Draw label
      ctx.fillStyle = '#00ff00'
      ctx.font = '16px Arial'
      ctx.fillText(
        \`\${prediction.class} (\${Math.round(prediction.score * 100)}%)\`,
        x, y - 10
      )
    })
  }
}

// Usage
const detector = new ObjectDetector()
detector.initialize()
\`\`\`

## Best Practices

### 1. Progressive Enhancement

Start with a basic experience and enhance with ML:

\`\`\`javascript
class SmartSearch {
  constructor() {
    this.mlEnabled = false
    this.initializeML()
  }

  async initializeML() {
    try {
      this.model = await tf.loadLayersModel('/models/search-model.json')
      this.mlEnabled = true
    } catch (error) {
      console.warn('ML model failed to load, falling back to basic search')
    }
  }

  search(query) {
    if (this.mlEnabled) {
      return this.smartSearch(query)
    } else {
      return this.basicSearch(query)
    }
  }
}
\`\`\`

### 2. Error Handling

Always handle ML failures gracefully:

\`\`\`javascript
async function safePredict(model, input) {
  try {
    return await model.predict(input)
  } catch (error) {
    console.error('Prediction failed:', error)
    return null // or default prediction
  }
}
\`\`\`

## Conclusion

TensorFlow.js opens up exciting possibilities for web developers to integrate machine learning into their applications. Start with pre-trained models, experiment with transfer learning, and gradually build more sophisticated ML-powered features.

The key is to start simple, focus on user experience, and progressively enhance your applications with intelligent features that truly add value.

Ready to dive deeper? Check out the [TensorFlow.js documentation](https://www.tensorflow.org/js) and start building your first ML-powered web application today!
    `,
  },
}

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts[params.slug as keyof typeof blogPosts]

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">

      <main className="container mx-auto px-4 py-8">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link href="/blog">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>

        {/* Article Header */}
        <article className="max-w-4xl mx-auto">
          <header className="text-center space-y-6 py-12">
            <h1 className="text-4xl md:text-5xl font-bold text-balance leading-tight">{post.title}</h1>

            <div className="flex flex-wrap items-center justify-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readingTime}
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Share Buttons */}
            <div className="flex items-center justify-center gap-2">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </header>

          {/* Article Content */}
          <Card className="mb-12">
            <CardContent className="p-8 md:p-12">
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br />") }} />
              </div>
            </CardContent>
          </Card>

          {/* Author Bio */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <div className="flex items-start gap-6">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                  👨‍💻
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Gokulakrishnan</h3>
                  <p className="text-muted-foreground mb-4">
                    Software Engineer & Data Scientist passionate about building technology that makes a difference. I
                    write about web development, machine learning, and the latest in tech.
                  </p>
                  <div className="flex gap-2">
                    <Link href="https://github.com/gokulakrishnxn" target="_blank">
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                        <Github className="h-4 w-4" />
                        GitHub
                      </Button>
                    </Link>
                    <Link href="https://www.linkedin.com/in/gokulakrishnxn/" target="_blank">
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                        <Linkedin className="h-4 w-4" />
                        LinkedIn
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Articles */}
          <section>
            <h2 className="text-2xl font-bold mb-6">More Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(blogPosts)
                .filter(([slug]) => slug !== params.slug)
                .slice(0, 2)
                .map(([slug, relatedPost]) => (
                  <Card key={slug} className="group hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span>
                          {new Date(relatedPost.publishedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <span>{relatedPost.readingTime}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {relatedPost.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Link href={`/blog/${slug}`}>
                        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                          Read Article
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </section>
        </article>
      </main>
    </div>
  )
}
