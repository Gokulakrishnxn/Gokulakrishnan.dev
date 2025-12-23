import React from "react";

import { WorkExperience } from "@/registry/work-experience/work-experience";

import { WORK_EXPERIENCES } from "../../data/work-experiences";
import { Panel, PanelHeader, PanelTitle } from "../panel";

export function Experiences() {
  return (
    <Panel id="experience">
      <PanelHeader>
        <PanelTitle>Experience</PanelTitle>
      </PanelHeader>

      <div>
        <WorkExperience experiences={WORK_EXPERIENCES} />
      </div>
    </Panel>
  );
}
