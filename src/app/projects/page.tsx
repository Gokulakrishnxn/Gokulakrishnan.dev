import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/Footer";
import { GsapPage } from "@/components/GsapPage";
import { ProjectFolders } from "@/components/ProjectFolders";

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
          <p>Open a folder to read about a project.</p>
        </article>

        <ProjectFolders />

        <Footer />
      </div>
    </GsapPage>
  );
}
