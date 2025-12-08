import { useMemo } from "react";

import { CollapsibleList } from "@/components/collapsible-list";

import { PROJECTS } from "../../data/projects";
import type { Project } from "../../types/projects";
import { Panel, PanelHeader, PanelTitle, PanelTitleSup } from "../panel";
import { ProjectItem } from "./project-item";

function parseDate(dateString: string | undefined): number {
  if (!dateString) return 0;

  // Handle formats like "10.2025", "11.2025"
  if (dateString.includes(".")) {
    const [month, year] = dateString.split(".");
    return parseInt(year || month, 10) * 100 + parseInt(month || "0", 10);
  }

  return parseInt(dateString, 10) * 100;
}

function sortProjectsByPeriod(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    const aEnd = a.period.end
      ? parseDate(a.period.end)
      : Number.MAX_SAFE_INTEGER;
    const bEnd = b.period.end
      ? parseDate(b.period.end)
      : Number.MAX_SAFE_INTEGER;

    // Sort by end date (most recent first), if end dates are equal, sort by start date
    if (aEnd !== bEnd) {
      return bEnd - aEnd;
    }

    const aStart = parseDate(a.period.start);
    const bStart = parseDate(b.period.start);
    return bStart - aStart;
  });
}

export function Projects() {
  const sortedProjects = useMemo(() => sortProjectsByPeriod(PROJECTS), []);

  return (
    <Panel id="projects">
      <PanelHeader>
        <PanelTitle>
          Projects
          <PanelTitleSup>({sortedProjects.length})</PanelTitleSup>
        </PanelTitle>
      </PanelHeader>

      <CollapsibleList
        items={sortedProjects}
        max={4}
        renderItem={(item) => <ProjectItem project={item} />}
      />
    </Panel>
  );
}
