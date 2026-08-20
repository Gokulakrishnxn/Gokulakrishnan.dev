"use client";

import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { projectItems, type ProjectItem } from "@/data/projects";
import { gsap, useGSAP } from "@/lib/gsap-client";

function FolderGlyph({ open }: { open: boolean }) {
  return (
    <span className="project-folder-glyph" aria-hidden="true">
      <svg
        className={`project-folder-svg${open ? " is-open" : ""}`}
        viewBox="0 0 96 78"
        fill="none"
      >
        <path
          className="project-folder-paper"
          d="M22 28h52a6 6 0 0 1 6 6v28a6 6 0 0 1-6 6H22a6 6 0 0 1-6-6V34a6 6 0 0 1 6-6Z"
        />
        <path
          className="project-folder-tab"
          d="M10 24c0-3.3 2.7-6 6-6h20l8 7h36c3.3 0 6 2.7 6 6v3H10v-10Z"
        />
        <path
          className="project-folder-body"
          d="M10 30c0-2.2 1.8-4 4-4h68c2.2 0 4 1.8 4 4v36c0 3.3-2.7 6-6 6H16c-3.3 0-6-2.7-6-6V30Z"
        />
      </svg>
    </span>
  );
}

function ProjectFolder({
  project,
  open,
  onToggle,
}: {
  project: ProjectItem;
  open: boolean;
  onToggle: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const panel = panelRef.current;
    if (!panel) return;
    gsap.set(panel, { height: 0, autoAlpha: 0, y: -6 });
  });

  useGSAP(
    () => {
      const panel = panelRef.current;
      if (!panel) return;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      gsap.to(panel, {
        height: open ? "auto" : 0,
        autoAlpha: open ? 1 : 0,
        y: open ? 0 : -6,
        duration: reduced ? 0 : open ? 0.52 : 0.34,
        ease: open ? "power2.out" : "power2.inOut",
        overwrite: "auto",
      });
    },
    { dependencies: [open] },
  );

  return (
    <article className={`project-folder${open ? " is-open" : ""}`}>
      <button
        type="button"
        className="project-folder-face"
        aria-expanded={open}
        aria-controls={`folder-${project.title}`}
        onClick={onToggle}
      >
        <FolderGlyph open={open} />
        <span className="project-folder-name">{project.title}</span>
      </button>

      <div
        ref={panelRef}
        id={`folder-${project.title}`}
        className="project-folder-panel"
        aria-hidden={!open}
      >
        <div className="project-folder-window">
          <div className="project-folder-chrome">
            <span className="project-folder-chrome-title">
              {project.title}
            </span>
            <button
              type="button"
              className="project-folder-close"
              aria-label={`Close ${project.title}`}
              onClick={onToggle}
            >
              <X size={14} />
            </button>
          </div>
          <div className="project-folder-body-copy">
            {project.logo ? (
              <img
                src={project.logo}
                alt=""
                width={28}
                height={28}
                className="app-icon app-icon--folder"
              />
            ) : null}
            <p className="project-folder-about">{project.about}</p>
            <ul className="project-folder-stack">
              {project.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <a
              className="project-folder-visit"
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open project
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export function ProjectFolders() {
  const [openTitle, setOpenTitle] = useState<string | null>(null);

  useEffect(() => {
    if (!openTitle) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenTitle(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openTitle]);

  return (
    <section className="project-folders" aria-label="Project folders">
      {projectItems.map((project) => (
        <ProjectFolder
          key={project.title}
          project={project}
          open={openTitle === project.title}
          onToggle={() =>
            setOpenTitle((current) =>
              current === project.title ? null : project.title,
            )
          }
        />
      ))}
    </section>
  );
}
