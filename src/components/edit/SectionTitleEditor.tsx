import Section from "../../models/section.ts";
import Panel, { PanelBody, PanelCap } from "../common/Panel.tsx";
import Input from "../common/Input.tsx";
import { observer } from "mobx-react-lite";

interface Props {
  capTitle: string;
  section: Section;
}

const SectionTitleEditor = observer(function SectionTitleEditor({
  capTitle,
  section,
}: Props) {
  return (
    <div>
      <PanelCap>{capTitle}</PanelCap>
      <Panel>
        <PanelBody className="flex flex-col">
          <Input
            className="mb-17 text-24 text-gray900 font-semibold py-8"
            value={section.title}
            onChange={(e) => section.setTitle(e.currentTarget.value)}
          />
          <Input
            className="text-16 text-gray700 py-3"
            value={section.description}
            onChange={(e) => section.setDescription(e.currentTarget.value)}
          />
        </PanelBody>
      </Panel>
    </div>
  );
});

export default SectionTitleEditor;
