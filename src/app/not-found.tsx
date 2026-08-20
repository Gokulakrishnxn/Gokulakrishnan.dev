import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/Footer";
import { GsapPage } from "@/components/GsapPage";

export const metadata: Metadata = {
  title: "404 — Gokulakrishnan",
  description: "This page isn’t on the site.",
};

export default function NotFound() {
  return (
    <GsapPage className="page page--lost">
      <div className="homepage">
        <article className="article lost">
          <p className="lost-code" aria-hidden="true">
            404
          </p>
          <header>
            <h1>This page isn’t here.</h1>
          </header>
          <p>
            That path isn’t on this site. Home, the résumé, and the writing
            still are — or ask Peter in the corner.
          </p>
          <div className="lost-actions">
            <a className="resume-back" href="/">
              <ArrowLeft size={14} />
              Home
            </a>
            <a className="resume-action-btn" href="/resume">
              Resume
            </a>
            <a className="resume-action-btn" href="/projects">
              Projects
            </a>
          </div>
        </article>
        <Footer />
      </div>
    </GsapPage>
  );
}
