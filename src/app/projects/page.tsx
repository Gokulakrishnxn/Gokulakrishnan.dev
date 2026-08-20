import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/Footer";
import { GsapPage } from "@/components/GsapPage";
import { StorageUsageChart } from "@/components/ui/dither-storage";

export const metadata: Metadata = {
  title: "Projects — Gokulakrishnan",
  description: "Works and projects by Gokulakrishnan.",
};

export default function ProjectsPage() {
  return (
    <GsapPage className="page">
      <div className="homepage">
        <article className="article">
          <header className="resume-page-header">
            <a className="resume-back" href="/">
              <ArrowLeft size={14} />
              Back
            </a>
            <h1>Projects</h1>
          </header>
          <p>Update soon.</p>
        </article>

        <section className="projects-updating" aria-label="Projects, update soon">
          <StorageUsageChart theme="dark" compact />
        </section>

        <Footer />
      </div>
    </GsapPage>
  );
}
