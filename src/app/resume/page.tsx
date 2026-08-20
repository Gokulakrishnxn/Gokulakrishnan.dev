import type { Metadata } from "next";
import { ArrowLeft, Download, Eye } from "lucide-react";
import type { ReactNode } from "react";
import { GitHubMark, LinkedInMark } from "@/components/BrandMarks";
import { WebAppIcon } from "@/components/WebAppIcon";
import { Footer } from "@/components/Footer";
import { GsapPage } from "@/components/GsapPage";
import {
  academicProjects,
  education,
  freelanceExperience,
  honors,
  publications,
  resumeHeader,
  skills,
} from "@/data/resume";

export const metadata: Metadata = {
  title: "Resume — Gokulakrishnan",
  description: "Résumé for Gokulakrishnan — AI Engineer.",
};

const linkIcons: Record<string, ReactNode> = {
  "github.com/Gokulakrishnxn": <GitHubMark />,
  "Gokulakrishnan.dev": <WebAppIcon className="app-icon--inline" />,
  "linkedin.com/in/gokulakrishnxn": <LinkedInMark />,
};

function ResumeRow({
  left,
  right,
  strong = true,
}: {
  left: ReactNode;
  right: ReactNode;
  strong?: boolean;
}) {
  return (
    <div className="resume-row">
      <span className={strong ? "resume-line-strong" : undefined}>{left}</span>
      <span className="resume-line-muted resume-row-right">{right}</span>
    </div>
  );
}

export default function ResumePage() {
  return (
    <GsapPage className="page page--resume">
      <div className="homepage">
        <article className="article">
          <header className="resume-page-header">
            <a className="resume-back" href="/">
              <ArrowLeft size={14} />
              Back
            </a>
            <h1>Resume</h1>
          </header>
          <div className="resume-actions">
            <a
              className="resume-action-btn"
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Eye size={14} />
              View PDF
            </a>
            <a
              className="resume-action-btn resume-action-btn--primary"
              href="/resume.pdf"
              download="GokulakrishnanResume.pdf"
            >
              <Download size={14} />
              Download PDF
            </a>
          </div>
        </article>

        <section className="resume-sheet">
          <header className="resume-sheet-header">
            <h2 className="gsap-name">{resumeHeader.name}</h2>
            <p className="resume-contact">
              <span>{resumeHeader.location}</span>
              <span className="resume-dot">|</span>
              <a href={`mailto:${resumeHeader.email}`}>{resumeHeader.email}</a>
              <span className="resume-dot">|</span>
              <a href={`tel:${resumeHeader.phone.replace(/\s/g, "")}`}>
                {resumeHeader.phone}
              </a>
            </p>
            <p className="resume-sheet-links">
              {resumeHeader.links.map((link, index) => (
                <span key={link.href} className="resume-sheet-link">
                  {index > 0 ? <span className="resume-dot">|</span> : null}
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    {linkIcons[link.label]}
                    {link.label}
                  </a>
                </span>
              ))}
            </p>
          </header>

          <div className="resume-section">
            <h3 className="resume-section-title">Education</h3>
            <ResumeRow left={education.school} right={education.period} />
            <ResumeRow
              left={education.degree}
              right={education.cgpa}
              strong={false}
            />
          </div>

          <div className="resume-section">
            <h3 className="resume-section-title">Skills</h3>
            {skills.map((skill) => (
              <p className="resume-skill" key={skill.label}>
                <span className="resume-line-strong">{skill.label}:</span>{" "}
                {skill.value}
              </p>
            ))}
          </div>

          <div className="resume-section">
            <h3 className="resume-section-title">Freelance Experience</h3>
            <ResumeRow
              left={freelanceExperience.org}
              right={freelanceExperience.role}
            />
            <ul className="resume-list">
              {freelanceExperience.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>

          <div className="resume-section">
            <h3 className="resume-section-title">Academic Projects</h3>
            {academicProjects.map((project) => (
              <div className="resume-project" key={project.title}>
                <ResumeRow left={project.title} right={project.period} />
                <p className="resume-line-muted resume-project-meta">
                  {project.meta} |{" "}
                  <a
                    href={project.githubHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </p>
                <ul className="resume-list">
                  {project.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="resume-section">
            <h3 className="resume-section-title">Publications</h3>
            <ul className="resume-list">
              {publications.map((pub) => (
                <li key={pub}>{pub}</li>
              ))}
            </ul>
          </div>

          <div className="resume-section">
            <h3 className="resume-section-title">Honors &amp; Leadership</h3>
            <ul className="resume-list">
              {honors.map((honor) => (
                <li key={honor}>{honor}</li>
              ))}
            </ul>
          </div>
        </section>

        <Footer />
      </div>
    </GsapPage>
  );
}
