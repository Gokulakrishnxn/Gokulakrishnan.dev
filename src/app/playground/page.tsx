import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/Footer";
import { GsapPage } from "@/components/GsapPage";

export const metadata: Metadata = {
  title: "Playground — Gokulakrishnan",
  description: "Small experiments and UI sketches.",
};

export default function PlaygroundPage() {
  return (
    <GsapPage className="page">
      <div className="homepage">
        <article className="article">
          <header className="resume-page-header">
            <a className="resume-back" href="/">
              <ArrowLeft size={14} />
              Back
            </a>
            <h1>Playground</h1>
          </header>
          <p>
            Small experiments, motion sketches, and things that don&apos;t
            belong on the homepage yet.
          </p>
        </article>
        <Footer />
      </div>
    </GsapPage>
  );
}
