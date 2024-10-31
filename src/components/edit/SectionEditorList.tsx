import { useSurveyStore } from "../../store/store.tsx";
import SectionEditor from "./SectionEditor.tsx";

export default function SectionEditorList() {
  const surveyStore = useSurveyStore();
  return (
    <div className="relative">
      <div className="absolute top-0 -right-50">
        <button onClick={() => surveyStore.addQuestion()}>+</button>
      </div>
      {surveyStore.sections.map((section) => (
        <SectionEditor key={section.id} section={section} />
      ))}
    </div>
  );
}
