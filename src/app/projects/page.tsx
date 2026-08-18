import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  BinaryHoldingsMark,
  FinlioMark,
  Link,
} from "@/components/BrandMarks";
import { Footer } from "@/components/Footer";
import { projectItems } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects — Gokulakrishnan",
  description: "Works and projects by Gokulakrishnan.",
};

const marksByTitle: Record<string, () => ReactNode> = {
  Finlio: () => <FinlioMark />,
  Quarix: () => <BinaryHoldingsMark />,
};

export default function ProjectsPage() {
  return (
    <div className="page">
      <div className="homepage">
        <article className="article">
          <header>
            <Link href="/">← Gokulakrishnan</Link>
            <h1 style={{ marginTop: "1rem" }}>Projects</h1>
          </header>
          <p>A few things I&apos;ve built and worked on.</p>
        </article>

        <section className="post-list" data-variant="primary">
          <ul>
            <li>
              <ul>
                {projectItems.map((project) => (
                  <li key={project.title}>
                    <a
                      className="post-item project-item"
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div>
                        <h2>
                          {marksByTitle[project.title]?.()}
                          {project.title}
                        </h2>
                        <p className="project-desc">{project.description}</p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </section>

        <Footer />
      </div>
    </div>
  );
}
