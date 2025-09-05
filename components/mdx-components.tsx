import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"

export const mdxComponents = {
  h1: ({ children, ...props }: any) => (
    <h1 className="text-4xl font-bold mb-6 text-balance" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: any) => (
    <h2 className="text-3xl font-semibold mb-4 mt-8 text-balance" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: any) => (
    <h3 className="text-2xl font-semibold mb-3 mt-6" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: any) => (
    <h4 className="text-xl font-semibold mb-2 mt-4" {...props}>
      {children}
    </h4>
  ),
  p: ({ children, ...props }: any) => (
    <p className="mb-4 leading-relaxed text-muted-foreground" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: any) => (
    <ul className="mb-4 ml-6 list-disc space-y-1" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol className="mb-4 ml-6 list-decimal space-y-1" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: any) => (
    <li className="text-muted-foreground" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }: any) => (
    <blockquote className="border-l-4 border-primary pl-4 my-6 italic text-muted-foreground" {...props}>
      {children}
    </blockquote>
  ),
  code: ({ children, className, ...props }: any) => {
    const isInline = !className

    if (isInline) {
      return (
        <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
          {children}
        </code>
      )
    }

    return (
      <Card className="mb-6">
        <CardContent className="p-0">
          <pre className="p-4 overflow-x-auto bg-muted rounded-lg">
            <code className="text-sm font-mono" {...props}>
              {children}
            </code>
          </pre>
        </CardContent>
      </Card>
    )
  },
  pre: ({ children, ...props }: any) => (
    <Card className="mb-6">
      <CardContent className="p-0">
        <pre className="p-4 overflow-x-auto bg-muted rounded-lg text-sm font-mono" {...props}>
          {children}
        </pre>
      </CardContent>
    </Card>
  ),
  a: ({ children, href, ...props }: any) => (
    <a
      href={href}
      className="text-primary hover:underline font-medium"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  img: ({ src, alt, ...props }: any) => (
    <Card className="mb-6">
      <CardContent className="p-4">
        <img src={src || "/placeholder.svg"} alt={alt} className="w-full rounded-lg" {...props} />
        {alt && <p className="text-sm text-muted-foreground text-center mt-2">{alt}</p>}
      </CardContent>
    </Card>
  ),
  hr: () => <Separator className="my-8" />,
  table: ({ children, ...props }: any) => (
    <Card className="mb-6">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full" {...props}>
            {children}
          </table>
        </div>
      </CardContent>
    </Card>
  ),
  th: ({ children, ...props }: any) => (
    <th className="border-b border-border p-3 text-left font-semibold" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: any) => (
    <td className="border-b border-border p-3 text-muted-foreground" {...props}>
      {children}
    </td>
  ),
  // Custom components
  Callout: ({ children, type = "info" }: { children: React.ReactNode; type?: "info" | "warning" | "error" }) => (
    <Alert className="mb-6">
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  ),
  CodeBlock: ({ children, title }: { children: React.ReactNode; title?: string }) => (
    <Card className="mb-6">
      {title && (
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-mono">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className="p-0">
        <pre className="p-4 overflow-x-auto bg-muted rounded-b-lg text-sm font-mono">{children}</pre>
      </CardContent>
    </Card>
  ),
}
