import type { Metadata } from "next";
import { Download, Eye, Printer } from "lucide-react";
import type { ReactNode } from "react";
import { GitHubMark, Link, LinkedInMark } from "@/components/BrandMarks";
import { Footer } from "@/components/Footer";
import {
  academicProjects,
  education,
  freelanceExperience,
  honors,
  publications,
  resumeHeader,
  skills,
} from "@/data/resume";
import { PrintButton } from "./PrintButton";

export const metadata: Metadata = {
  title: "Resume — Gokulakrishnan",
  description: "Résumé for Gokulakrishnan — AI Engineer.",
};

const linkIcons: Record<string, ReactNode> = {
  "github.com/Gokulakrishnxn": <GitHubMark />,
  "Gokulakrishnan.dev": "🌍 ",
  "linkedin.com/in/gokulakrishnxn": <LinkedInMark />,
};

export default function ResumePage() {
  return (
    <div className="page">
      <div className="homepage">
        <article className="article">
          <header>
            <Link href="/">← Gokulakrishnan</Link>
            <h1 style={{ marginTop: "1rem" }}>Resume</h1>
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
            <PrintButton>
              <Printer size={14} />
              Print / Save as PDF
            </PrintButton>
          </div>
        </article>

        <section className="resume-sheet">
          <header className="resume-sheet-header">
            <h2>{resumeHeader.name}</h2>
            <p>
              {resumeHeader.location} | {resumeHeader.email} |{" "}
              {resumeHeader.phone}
            </p>
            <p className="resume-sheet-links">
              {resumeHeader.links.map((link, index) => (
                <span key={link.href}>
                  {index > 0 ? " | " : ""}
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    {linkIcons[link.label]}
                    {link.label}
                  </a>
                </span>
              ))}
            </p>
          </header>

          <h3 className="resume-section-title">Education</h3>
          <p className="resume-line-strong">{education.school}</p>
          <p className="resume-line-muted">{education.period}</p>
          <p>{education.degree}</p>
          <p className="resume-line-muted">{education.cgpa}</p>

          <h3 className="resume-section-title">Skills</h3>
          {skills.map((skill) => (
            <p key={skill.label}>
              <span className="resume-line-strong">{skill.label}:</span>{" "}
              {skill.value}
            </p>
          ))}

          <h3 className="resume-section-title">Freelance Experience</h3>
          <p className="resume-line-strong">{freelanceExperience.org}</p>
          <p className="resume-line-muted">{freelanceExperience.role}</p>
          <ul className="resume-list">
            {freelanceExperience.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>

          <h3 className="resume-section-title">Academic Projects</h3>
          {academicProjects.map((project) => (
            <div className="resume-project" key={project.title}>
              <p className="resume-line-strong">{project.title}</p>
              <p className="resume-line-muted">{project.period}</p>
              <p className="resume-line-muted">
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

          <h3 className="resume-section-title">Publications</h3>
          <ul className="resume-list">
            {publications.map((pub) => (
              <li key={pub}>{pub}</li>
            ))}
          </ul>

          <h3 className="resume-section-title">Honors &amp; Leadership</h3>
          <ul className="resume-list">
            {honors.map((honor) => (
              <li key={honor}>{honor}</li>
            ))}
          </ul>
        </section>

        <Footer />
      </div>
    </div>
  );
}
