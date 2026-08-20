# Gokulakrishnan

Personal site for [Gokulakrishnan](https://www.gokulakrishnan.dev) — AI Engineer at The Binary Holdings (Bnry Labs), founder of [Quarix](https://www.quarix.one).

The site is a small Next.js app: homepage, résumé, projects, writing, and **Peter**, a personal AI assistant that answers from the portfolio.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- GSAP for page motion
- [thinking-orbs](https://orbs.jakubantalik.com) for Peter’s status animation
- Google Gemini (`gemini-flash-lite-latest`) for Peter’s replies

## Pages

| Path | What it is |
| --- | --- |
| `/` | Bio, GitHub activity, writing |
| `/resume` | Résumé with PDF view / download |
| `/projects` | Finlio and Quarix |
| `/writing/finlio` | Note on building Finlio |
| `/writing/aria` | Note on ARIA at Bnry Labs |
| `/playground` | Small experiments |

Peter sits in the bottom-right corner on every page.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment

Create `.env.local` in the repo root (this file is gitignored):

```bash
# Free key: https://aistudio.google.com/apikey
GEMINI_API_KEY=your_key_here
```

Without a key, Peter still answers from a small on-site fallback. With a key, he uses Gemini.

Optional:

```bash
PETER_MODEL=gemini-flash-lite-latest
OPENAI_API_KEY=                     # used only if Gemini is unset
```

Never commit `.env.local`. The assistant prompt, portfolio brief, and model key stay on the server.

## Scripts

```bash
npm run dev      # local server
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
```

## Peter

Peter is Gokulakrishnan’s personal AI assistant.

- Casual, short answers
- Leads with the engineer job, not “student”
- Knows work, writing, résumé, and public contact
- Turns down gossip and off-topic personal questions
- Runs through a server action, not a public `/api/peter` route

Edit the voice and facts in:

- `src/lib/peter.ts` — prompt, safety, model call
- `src/lib/peter-knowledge.ts` — portfolio brief
- `src/app/actions/send.ts` — server entry

## Deploy

Works on [Vercel](https://vercel.com). Add `GEMINI_API_KEY` in the project environment variables before deploying.
