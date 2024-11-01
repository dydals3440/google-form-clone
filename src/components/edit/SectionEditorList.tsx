import { useSurveyStore } from "../../store/store.tsx";
import SectionEditor from "./SectionEditor.tsx";
import EditorMenu from "./EditorMenu.tsx";

export default function SectionEditorList() {
  const surveyStore = useSurveyStore();
  return (
    <div className="relative">
      {/* bottom-30이라, sm이 아닐 떄 길어짐, 이를 해결 bottom - auto */}
      <EditorMenu className="fixed bottom-30 left-[calc(100%-72px)] sm:bottom-auto sm:top-[263px] sm:left-[calc(50%+340px)]" />
      {surveyStore.sections.map((section) => (
        <SectionEditor key={section.id} section={section} />
      ))}
    </div>
  );
}
