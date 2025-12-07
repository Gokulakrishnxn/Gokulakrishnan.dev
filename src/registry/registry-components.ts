import type { Registry } from "shadcn/schema";

export const components: Registry["items"] = [
  {
    name: "theme-switcher",
    type: "registry:component",
    description:
      "A theme switcher component for Next.js apps with next-themes and Tailwind CSS, supporting system, light, and dark modes.",
    title: "Theme Switcher",
    author: "Gokulakrishnan <gokulakrishnxn@gmail.com>",
    dependencies: ["next-themes", "lucide-react", "motion"],
    registryDependencies: ["@ncdai/utils"],
    files: [
      {
        path: "theme-switcher/theme-switcher.tsx",
        type: "registry:component",
      },
    ],
    docs: "https://gokulakrishnan.dev/components/theme-switcher-component",
  },
  {
    name: "flip-sentences",
    type: "registry:component",
    title: "Flip Sentences",
    author: "Gokulakrishnan <gokulakrishnxn@gmail.com>",
    dependencies: ["motion"],
    registryDependencies: ["@ncdai/utils"],
    files: [
      {
        path: "flip-sentences/flip-sentences.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "apple-hello-effect",
    type: "registry:component",
    description:
      "Create a Xin chào and Hello writing effect inspired by Apple using Motion for React.",
    title: "Apple Hello Effect",
    author: "Gokulakrishnan <gokulakrishnxn@gmail.com>",
    dependencies: ["motion"],
    registryDependencies: ["@ncdai/utils"],
    files: [
      {
        path: "apple-hello-effect/apple-hello-effect.tsx",
        type: "registry:component",
      },
    ],
    docs: "https://gokulakrishnan.dev/components/writing-effect-inspired-by-apple",
  },
  {
    name: "wheel-picker",
    type: "registry:component",
    description:
      "iOS-like wheel picker for React with smooth inertia scrolling and infinite loop support.",
    title: "Wheel Picker",
    author: "Gokulakrishnan <gokulakrishnxn@gmail.com>",
    dependencies: ["@ncdai/react-wheel-picker"],
    registryDependencies: ["@ncdai/utils"],
    files: [
      {
        path: "wheel-picker/wheel-picker.tsx",
        type: "registry:component",
      },
    ],
    docs: "https://gokulakrishnan.dev/components/react-wheel-picker",
  },
  {
    name: "work-experience",
    type: "registry:component",
    description:
      "Displays a list of work experiences with role details and durations.",
    title: "Work Experience",
    author: "Gokulakrishnan <gokulakrishnxn@gmail.com>",
    dependencies: ["react-markdown", "lucide-react"],
    devDependencies: ["@tailwindcss/typography", "tw-animate-css"],
    registryDependencies: ["@ncdai/utils", "collapsible", "separator"],
    files: [
      {
        path: "work-experience/work-experience.tsx",
        type: "registry:component",
      },
    ],
    cssVars: {
      light: {
        background: "oklch(1 0 0)",
        muted: "oklch(0.967 0.001 286.375)",
        "muted-foreground": "oklch(0.552 0.016 285.938)",
        border: "oklch(0.92 0.004 286.32)",
      },
      dark: {
        background: "oklch(0.141 0.005 285.823)",
        muted: "oklch(0.274 0.006 286.033)",
        "muted-foreground": "oklch(0.705 0.015 286.067)",
        border: "oklch(0.274 0.006 286.033)",
      },
    },
    css: {
      '@import "tw-animate-css"': {},
      "@plugin @tailwindcss/typography": {},
    },
    docs: "https://gokulakrishnan.dev/components/work-experience-component",
  },
  {
    name: "shimmering-text",
    type: "registry:component",
    description: "Smooth shimmering text animation built with Motion.",
    title: "Shimmering Text",
    author: "Gokulakrishnan <gokulakrishnxn@gmail.com>",
    dependencies: ["motion"],
    registryDependencies: ["@ncdai/utils"],
    files: [
      {
        path: "shimmering-text/shimmering-text.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "slide-to-unlock",
    type: "registry:component",
    description:
      "A sleek, interactive slider inspired by the classic iPhone OS 'slide to unlock' gesture.",
    title: "Slide to Unlock",
    author: "Gokulakrishnan <gokulakrishnxn@gmail.com>",
    dependencies: ["motion"],
    registryDependencies: ["@ncdai/utils", "@ncdai/shimmering-text"],
    files: [
      {
        path: "slide-to-unlock/slide-to-unlock.tsx",
        type: "registry:component",
      },
    ],
    docs: "https://gokulakrishnan.dev/components/slide-to-unlock",
  },
  {
    name: "testimonials-marquee",
    type: "registry:component",
    description:
      "A testimonials marquee component for showcasing user feedback in a scrolling format.",
    title: "Testimonials Marquee",
    author: "Gokulakrishnan <gokulakrishnxn@gmail.com>",
    registryDependencies: ["@ncdai/utils", "@kibo-ui/marquee"],
    files: [
      {
        path: "testimonials-marquee/testimonials-marquee.tsx",
        type: "registry:component",
      },
    ],
    docs: "https://gokulakrishnan.dev/components/testimonials-marquee",
  },
  {
    name: "github-stars",
    type: "registry:component",
    description:
      "Display GitHub repository star count with formatted numbers and a tooltip showing the full count.",
    title: "GitHub Stars",
    author: "Gokulakrishnan <gokulakrishnxn@gmail.com>",
    registryDependencies: ["button", "tooltip"],
    files: [
      {
        path: "github-stars/github-stars.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "ai-chat-interface",
    type: "registry:component",
    description:
      "A reusable AI chat interface component with message history, loading states, and customizable styling. Perfect for integrating AI assistants into your applications.",
    title: "AI Chat Interface",
    author: "Gokulakrishnan <gokulakrishnxn@gmail.com>",
    dependencies: ["lucide-react"],
    registryDependencies: ["@ncdai/utils", "button", "textarea"],
    files: [
      {
        path: "ai-chat-interface/ai-chat-interface.tsx",
        type: "registry:component",
      },
    ],
    docs: "https://gokulakrishnan.dev/components/ai-chat-interface",
  },
  {
    name: "ai-prompt-builder",
    type: "registry:component",
    description:
      "Build and test AI prompts with variable substitution. Create reusable prompt templates and dynamically fill variables for different use cases.",
    title: "AI Prompt Builder",
    author: "Gokulakrishnan <gokulakrishnxn@gmail.com>",
    dependencies: ["lucide-react"],
    registryDependencies: ["@ncdai/utils", "button", "textarea"],
    files: [
      {
        path: "ai-prompt-builder/ai-prompt-builder.tsx",
        type: "registry:component",
      },
    ],
    docs: "https://gokulakrishnan.dev/components/ai-prompt-builder",
  },
  {
    name: "token-counter",
    type: "registry:component",
    description:
      "Count tokens, characters, and words in text. Essential tool for AI developers working with LLMs to estimate token usage and costs.",
    title: "Token Counter",
    author: "Gokulakrishnan <gokulakrishnxn@gmail.com>",
    dependencies: ["lucide-react"],
    registryDependencies: ["@ncdai/utils", "button", "textarea"],
    files: [
      {
        path: "token-counter/token-counter.tsx",
        type: "registry:component",
      },
    ],
    docs: "https://gokulakrishnan.dev/components/token-counter",
  },
];
