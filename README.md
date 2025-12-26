# Gokulakrishnan - Portfolio

A minimal, pixel-perfect dev portfolio, component registry, and blog to showcase my work as an AI Engineer and Researcher.

Check out the live site: [gokulakrishnan.dev](https://gokulakrishnan.dev)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://assets.gokulakrishnan.dev/images/screenshot-desktop-dark.webp?t=1764345394">
  <source media="(prefers-color-scheme: light)" srcset="https://assets.gokulakrishnan.dev/images/screenshot-desktop-light.webp?t=1764345394">
  <img src="https://assets.gokulakrishnan.dev/images/screenshot-desktop-light.webp?t=1764345394" alt="Screenshot">
</picture>

## GitAds Sponsored

[![Sponsored by GitAds](https://gitads.dev/v1/ad-serve?source=Gokulakrishnxn/gokulakrishnan.dev@github)](https://gitads.dev/v1/ad-track?source=Gokulakrishnxn/gokulakrishnan.dev@github)

## Overview

### Stack

- **Next.js 16** - React framework with App Router
- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - Re-usable components built with Radix UI and Tailwind CSS
- **TypeScript** - Type-safe development
- **React 19** - Latest React features

### Featured

- ✨ **Clean & modern design** - Minimalist interface with attention to detail
- 🌓 **Light/Dark themes** - Seamless theme switching with system preference support
- 📇 **vCard integration** - Downloadable contact card
- 🔍 **SEO optimized** - JSON-LD schema, sitemap, robots.txt
- 🤖 **AI-ready** - Supports [/llms.txt](https://llmstxt.org) for AI agent accessibility
- 📧 **Spam-protected email** - Encoded contact information
- 📱 **PWA support** - Installable as Progressive Web App
- 📊 **Analytics** - PostHog integration with consent management via [c15t](https://c15t.com)
- ⏰ **Real-time Indian Time** - Live IST display in footer
- ♾️ **Infinity icon** - Modern representation for ongoing positions/projects

### Blog

- 📝 **MDX & Markdown support** - Write content with React components
- 🤖 **Raw `.mdx` endpoints** - AI-readable content format
- 💻 **Syntax highlighting** - Beautiful code blocks with Shiki
- 🖼️ **Dynamic OG images** - Auto-generated Open Graph images
- 📡 **RSS feed** - Subscribe to blog updates
- 🔍 **Search functionality** - Find posts quickly
- 📅 **Date display** - Publication dates for each post

### Component Registry

Easily build and distribute reusable components, hooks, and pages using a custom registry powered by the [shadcn CLI](https://ui.shadcn.com/docs/cli).

Each entry is well-documented and includes:

- 🎨 **Live preview** - See components in action
- 📋 **Code snippets** - Copy-ready code examples
- 📦 **One-click install** - Commands for pnpm, npm, yarn, bun
- 📚 **Documentation** - Comprehensive usage guides

### Analytics

User behavior tracking with [PostHog](https://posthog.com) to understand how visitors interact with the site:

- **Copy events** - Track code & command copies
- **Engagement** - Monitor name pronunciation plays, command menu usage
- **Search behavior** - Analyze search queries (debounced)
- **User actions** - Navigation, theme changes, content interactions

Built with privacy in mind:

- Consent management via [c15t](https://c15t.com)
- Cookieless mode until consent
- Production-only tracking
- Type-safe event schema with Zod

## Getting Started

### Prerequisites

- Node.js 22.x or higher
- pnpm >= 9 (recommended) or npm/yarn

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Gokulakrishnxn/gokulakrishnan.dev.git
cd gokulakrishnan.dev
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# Core Application
APP_URL=https://gokulakrishnan.dev

# Registry Configuration
REGISTRY_NAMESPACE=@gokulakrishnan
REGISTRY_NAMESPACE_URL=https://gokulakrishnan.dev/r/{name}.json

# External Services
GITHUB_API_TOKEN=your_github_token_here
NEXT_PUBLIC_DMCA_URL=your_dmca_url_here

# Analytics (Optional)
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://ph.gokulakrishnan.dev
NEXT_PUBLIC_POSTHOG_UI_HOST=https://us.i.posthog.com
```

4. **Run the development server**

```bash
pnpm dev
```

Open [http://localhost:1408](http://localhost:1408) in your browser.

### Available Scripts

- `pnpm dev` - Start development server on port 1408
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm preview` - Build and preview locally
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint errors
- `pnpm check-types` - Type check with TypeScript
- `pnpm format:check` - Check code formatting
- `pnpm format:write` - Format code with Prettier
- `pnpm registry:build` - Build component registry
- `pnpm registry:internal:build` - Build internal registry

## Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (app)/             # Main app routes
│   │   ├── (llms)/            # LLM-related routes
│   │   ├── og/                # Open Graph image generation
│   │   └── rss/               # RSS feed generation
│   ├── components/            # Shared UI components
│   ├── registry/              # Component registry source
│   ├── __registry__/          # Auto-generated registry files
│   ├── features/              # Feature-based modules
│   │   ├── blog/              # Blog functionality
│   │   └── portfolio/         # Portfolio data and components
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility libraries
│   └── styles/                # Global styles
├── public/                    # Static assets
├── packages/                  # Publishable packages
└── data/                      # Data files (views, etc.)
```

## Key Features

### Responsive Design

The site is fully responsive across mobile, tablet, and laptop screens with breakpoints:
- Mobile: Default styles
- Tablet: `sm:` prefix (640px+)
- Laptop: `md:` prefix (768px+) and `lg:` prefix (1024px+)

### Work Experience

- Company logos and information
- Expandable position details
- Skills and technologies
- Infinity icon (∞) for ongoing positions
- Employment period formatting

### Projects

- Project logos and thumbnails
- Detailed descriptions with Markdown support
- Skills and technologies tags
- External links with UTM tracking
- Infinity icon for ongoing projects

### Blog System

- MDX/Markdown content support
- Syntax highlighting with Shiki
- Dynamic OG image generation
- RSS feed generation
- Search functionality
- Date display for each post

## Environment Variables

See `.env.example` for required variables:

**Core Application**:
- `APP_URL` - Application base URL

**Registry Configuration**:
- `REGISTRY_NAMESPACE` - Namespace for shadcn CLI
- `REGISTRY_NAMESPACE_URL` - URL pattern for component resolution

**External Services**:
- `GITHUB_API_TOKEN` - GitHub Personal Access Token
- `NEXT_PUBLIC_DMCA_URL` - DMCA Protection badge URL

**Analytics** (Optional):
- `NEXT_PUBLIC_POSTHOG_KEY` - PostHog project API key
- `NEXT_PUBLIC_POSTHOG_HOST` - PostHog API host URL
- `NEXT_PUBLIC_POSTHOG_UI_HOST` - PostHog UI host URL

## Development

Please refer to the [Development Guide](./DEVELOPMENT.md) for more details.

### Code Style

- TypeScript with strict mode
- ESLint for code quality
- Prettier for code formatting
- Husky for git hooks
- lint-staged for pre-commit checks

### Adding Content

**Portfolio Data**: Edit files in `src/features/portfolio/data/`
- `user.ts` - Personal information
- `work-experiences.ts` - Work experience entries
- `projects.ts` - Project portfolio
- `tech-stack.ts` - Technology stack

**Blog Posts**: Add MDX files to `src/features/blog/content/`

**Components**: Add to `src/registry/` and run `pnpm registry:build`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Configure environment variables
4. Deploy automatically on push

The site is configured for Vercel deployment with:
- Automatic builds on push
- Environment variable management
- Edge runtime support

## License

Licensed under the [MIT license](./LICENSE).

You're free to use my code! Just make sure to <ins>remove all my personal information</ins> before publishing your website. It's awesome to see my code being useful to someone!

## Star History

[![Star History](https://starchart.cc/Gokulakrishnxn/gokulakrishnan.dev.svg?variant=adaptive&line=%23d37f2c)](https://starchart.cc/Gokulakrishnxn/gokulakrishnan.dev)

## Acknowledgments

- [React](https://react.dev)
- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)
- [Motion](https://motion.dev)
- [shadcn/ui](https://ui.shadcn.com)
- [Aceternity UI](https://ui.aceternity.com)
- [Kibo UI](https://www.kibo-ui.com)
- [Lucide](https://lucide.dev)
- [Fumadocs](https://fumadocs.dev)
- [PostHog](https://posthog.com)
- [c15t](https://c15t.com)
- And many other open-source libraries used in `package.json`

<!-- GitAds-Verify: QICCAB4PFWV9MHUGPGPN5B2I8SAXLAOK -->
