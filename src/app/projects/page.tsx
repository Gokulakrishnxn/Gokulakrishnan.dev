import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { GsapPage } from "@/components/GsapPage";
import { Reveal } from "@/components/motion/reveal";
import { StorageUsageChart } from "@/components/ui/dither-storage";

export const metadata: Metadata = {
  title: "Projects — Gokulakrishnan",
  description: "Works and projects by Gokulakrishnan.",
};

export default function ProjectsPage() {
  return (
    <GsapPage className="page">
      <div className="homepage">
        <article className="article reveal-flow">
          <header className="resume-page-header">
            <h1>Projects</h1>
          </header>
          <p>Update soon.</p>
        </article>

        <Reveal>
          <section className="projects-updating" aria-label="Projects, update soon">
            <StorageUsageChart theme="dark" compact />
          </section>
        </Reveal>

        <Footer />
      </div>
    </GsapPage>
  );
}
