import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { GsapPage } from "@/components/GsapPage";
import { FinlioAppIcon } from "@/components/FinlioAppIcon";
import { MarkdownArticle } from "@/components/MarkdownArticle";

export const metadata: Metadata = {
  title: "Finlio.app — Gokulakrishnan",
  description: "A note on building Finlio, from a founder who still writes the code.",
};

export default async function FinlioWritingPage() {
  const source = await readFile(
    path.join(process.cwd(), "src/content/writing/finlio.md"),
    "utf8",
  );

  return (
    <GsapPage className="page page--writing">
      <div className="writing-shell">
        <nav className="writing-nav" aria-label="On this page">
          <a className="writing-nav-index" href="/">
            ← Index
          </a>
          <a href="#why-this-exists">Why this exists</a>
          <a href="#building-it">Building it</a>
          <a href="#where-we-are">Where we are</a>
        </nav>

        <div className="writing-main">
          <article className="article writing-article">
            <header className="writing-hero">
              <div className="writing-title-row">
                <FinlioAppIcon className="app-icon--hero" />
                <h1 className="writing-title">Finlio</h1>
              </div>
              <time dateTime="2026-08-05">5 August, 2026</time>
            </header>
            <MarkdownArticle
              source={source}
              skipTitle
              media={
                <figure className="writing-media">
                  <img src="/finliobanner.jpeg" alt="Finlio" />
                </figure>
              }
            />
          </article>
          <Footer />
        </div>
      </div>
    </GsapPage>
  );
}
