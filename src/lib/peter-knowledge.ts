import "server-only";

import { projectItems } from "@/data/projects";
import {
  academicProjects,
  education,
  freelanceExperience,
  honors,
  publications,
  resumeHeader,
  skills,
} from "@/data/resume";
import { writingItems } from "@/data/writing";

const writingNotes = `
Finlio writing (/writing/finlio, 5 Aug 2026): Gokul is building Finlio as founder and engineer with Beny. It is a personal finance teammate — one view of money across banks, brokers, SIPs, EPF — plus a short morning brief in plain English. Default is local and readable; cloud is optional. Web first. Live at https://www.finlio.app. He is not trying to replace a broker or tell anyone what to buy.

ARIA writing (/writing/aria, 22 Jul 2026): Gokul did not start ARIA. He joined The Binary Holdings / Bnry Labs as an AI Engineer. ARIA is a research assistant that retrieves first, answers second, and leaves citations. His bar: if they cannot show the work, they should not ship the sentence.
`;

export function peterKnowledgeBrief() {
  const projects = projectItems
    .map(
      (project) =>
        `- ${project.title}: ${project.about} (${project.href}) Stack: ${project.stack.join(", ")}.`,
    )
    .join("\n");

  const writing = writingItems
    .map(
      (item) =>
        `- ${item.title} (${item.date}, ${item.href})${item.isLive ? " — live" : ""}`,
    )
    .join("\n");

  const skillLines = skills
    .map((skill) => `${skill.label}: ${skill.value}`)
    .join("\n");

  const academic = academicProjects
    .map(
      (project) =>
        `- ${project.title} (${project.period}). ${project.meta}. ${project.bullets[0] ?? ""}`,
    )
    .join("\n");

  const github = resumeHeader.links.find((link) =>
    link.label.includes("github.com"),
  );
  const site = resumeHeader.links.find((link) =>
    link.label.includes("Gokulakrishnan.dev"),
  );
  const linkedin = resumeHeader.links.find((link) =>
    link.label.includes("linkedin.com"),
  );

  return `
Name: ${resumeHeader.name}
Current role: He works as an AI Engineer at The Binary Holdings, for Bnry Labs. Say this first. He is an engineer, not a student.
Where: born Cuddalore, raised in Chennai, still based in ${resumeHeader.location}.
Studio: founded Quarix (https://www.quarix.one) — freelance studio growing into a software company. Builds AI agents, websites, mobile apps, SaaS.

Public contact (share when asked; prefer email / LinkedIn / GitHub over phone unless they ask):
- Email: ${resumeHeader.email}
- GitHub: ${github?.href ?? "https://github.com/Gokulakrishnxn"}
- Site: ${site?.href ?? "https://www.gokulakrishnan.dev"}
- LinkedIn: ${linkedin?.href ?? "https://linkedin.com/in/gokulakrishnxn/"}
- Phone (on the public résumé): ${resumeHeader.phone}

Do not mention X/Twitter. The homepage still has leftover template links that are not his.

Education (past): Graduated ${education.period.split("–")[1]?.trim() ?? "May 2026"}. ${education.degree} at ${education.school}. ${education.cgpa}. Do not use present tense (“studies”). Use “studied” / “graduated”.

Skills:
${skillLines}

Projects on this site:
${projects}

Writing on this site:
${writing}
${writingNotes}

Freelance: ${freelanceExperience.role} at ${freelanceExperience.org}.
${freelanceExperience.bullets[0]}

Academic work:
${academic}

Publications:
${publications.map((item) => `- ${item}`).join("\n")}

Honors:
${honors.map((item) => `- ${item}`).join("\n")}

Site map: homepage, /resume (PDF view/download), /projects, /writing/finlio, /writing/aria, /playground.
`.trim();
}
