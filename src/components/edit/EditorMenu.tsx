import PlusIcon from "../../assets/plus.svg?react";
import SectionPlus from "../../assets/section-plus.svg?react";
import { useSurveyStore } from "../../store/store.tsx";
import cn from "classnames";

export default function EditorMenu({ className }: { className?: string }) {
  const surveyStore = useSurveyStore();
  return (
    <div
      className={cn(
        `bg-white rounded-10 px-13 py-26 flex flex-col gap-y-26 shadow-lg`,
        className,
      )}
    >
      <button onClick={surveyStore.addQuestion}>
        <PlusIcon />
      </button>
      <button onClick={surveyStore.addSection}>
        <SectionPlus />
      </button>
    </div>
  );
}
