import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { GsapPage } from "@/components/GsapPage";
import { AriaAppIcon } from "@/components/AriaAppIcon";
import { MarkdownArticle } from "@/components/MarkdownArticle";

export const metadata: Metadata = {
  title: "ARIA — Gokulakrishnan",
  description:
    "A note on contributing to ARIA as an AI Engineer at The Binary Holdings.",
};

export default async function AriaWritingPage() {
  const source = await readFile(
    path.join(process.cwd(), "src/content/writing/aria.md"),
    "utf8",
  );

  return (
    <GsapPage className="page page--writing">
      <div className="writing-shell">
        <nav className="writing-nav" aria-label="On this page">
          <a className="writing-nav-index" href="/">
            ← Index
          </a>
          <a href="#why-it-matters">Why it matters</a>
          <a href="#my-part">My part</a>
          <a href="#what-i-want-next-to-my-name">What I want next to my name</a>
        </nav>

        <div className="writing-main">
          <article className="article writing-article">
            <header className="writing-hero">
              <div className="writing-title-row">
                <AriaAppIcon className="aria-app-icon--hero" />
                <h1 className="writing-title">ARIA</h1>
              </div>
              <time dateTime="2026-07-22">22 July, 2026</time>
            </header>
            <MarkdownArticle source={source} skipTitle />
          </article>
          <Footer />
        </div>
      </div>
    </GsapPage>
  );
}
