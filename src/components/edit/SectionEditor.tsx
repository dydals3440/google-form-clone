import QuestionEditor from "./QuestionEditor.tsx";
import { observer } from "mobx-react-lite";
import Section from "../../models/section.ts";

interface Props {
  section: Section;
}

// 컴포넌트가 상태를 관찰하고 있다가, 렌더링 하게 함.
// mobx react-light가 해당 과정을 해줌.
const SectionEditor = observer(function SectionEditor({ section }: Props) {
  return (
    <div>
      {section.questions.map((question) => (
        <QuestionEditor key={question.id} question={question} />
      ))}
    </div>
  );
});

export default SectionEditor;
