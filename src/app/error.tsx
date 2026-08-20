"use client";

import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/Footer";
import { GsapPage } from "@/components/GsapPage";

export default function ErrorPage({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <GsapPage className="page page--lost">
      <div className="homepage">
        <article className="article lost">
          <p className="lost-code" aria-hidden="true">
            500
          </p>
          <header>
            <h1>Something broke.</h1>
          </header>
          <p>
            That wasn’t meant to happen. Try again, or go home — Peter’s still
            in the corner if you need a way back.
          </p>
          <div className="lost-actions">
            <a className="resume-back" href="/">
              <ArrowLeft size={14} />
              Home
            </a>
            <button className="resume-action-btn resume-action-btn--primary" type="button" onClick={() => retry()}>
              Try again
            </button>
          </div>
        </article>
        <Footer />
      </div>
    </GsapPage>
  );
}
