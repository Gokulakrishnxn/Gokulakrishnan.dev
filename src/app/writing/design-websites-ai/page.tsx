import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { GsapPage } from "@/components/GsapPage";
import { MarkdownArticle } from "@/components/MarkdownArticle";
import { WebAppIcon } from "@/components/WebAppIcon";

export const metadata: Metadata = {
  title: "How I Design Websites Using AI — Gokulakrishnan",
  description:
    "I'm not a natural designer. Here's how I go from idea to a real website with AI, without ending up with something generic.",
};

export default async function DesignWebsitesAiWritingPage() {
  const source = await readFile(
    path.join(process.cwd(), "src/content/writing/design-websites-ai.md"),
    "utf8",
  );

  return (
    <GsapPage className="page page--writing">
      <div className="writing-shell">
        <nav className="writing-nav" aria-label="On this page">
          <a href="#i-was-terrible-at-design-at-first">Terrible at first</a>
          <a href="#my-first-client-was-a-caf">First client</a>
          <a href="#then-college-taught-me-design">College</a>
          <a href="#now-how-i-use-ai">How I use AI</a>
          <a href="#step-1-get-clear">Get clear</a>
          <a href="#step-2-collect-inspiration">Inspiration</a>
          <a href="#step-3-write-three-files">Three files</a>
          <a href="#step-4-build-and-keep-improving">Build</a>
          <a href="#what-i-learned">What I learned</a>
        </nav>

        <div className="writing-main">
          <article className="article writing-article">
            <header className="writing-hero">
              <div className="writing-title-row">
                <WebAppIcon className="app-icon--hero" />
                <h1 className="writing-title">How I Design Websites Using AI :)</h1>
              </div>
              <time dateTime="2026-09-30">30 September, 2026</time>
            </header>
            <MarkdownArticle source={source} skipTitle />
          </article>
          <Footer />
        </div>
      </div>
    </GsapPage>
  );
}
