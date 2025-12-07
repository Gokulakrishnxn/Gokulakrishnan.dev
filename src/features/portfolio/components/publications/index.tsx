import { CollapsibleList } from "@/components/collapsible-list";

import { PUBLICATIONS } from "../../data/publications";
import { Panel, PanelHeader, PanelTitle, PanelTitleSup } from "../panel";
import { PublicationItem } from "./publication-item";

export function Publications() {
  return (
    <Panel id="publications">
      <PanelHeader>
        <PanelTitle>
          Publications
          <PanelTitleSup>({PUBLICATIONS.length})</PanelTitleSup>
        </PanelTitle>
      </PanelHeader>

      <CollapsibleList
        items={PUBLICATIONS}
        max={4}
        renderItem={(item) => <PublicationItem publication={item} />}
      />
    </Panel>
  );
}





