import QuestionEditor from "./QuestionEditor.tsx";
import { observer } from "mobx-react-lite";
import Section from "../../models/section.ts";
import SectionTitleEditor from "./SectionTitleEditor.tsx";

interface Props {
  section: Section;
  capTitle: string;
  onChangeFocus: (id: number) => void;
}

// 컴포넌트가 상태를 관찰하고 있다가, 렌더링 하게 함.
// mobx react-light가 해당 과정을 해줌.
const SectionEditor = observer(function SectionEditor({
  section,
  onChangeFocus,
  capTitle,
}: Props) {
  const handleClickContainer = () => {
    onChangeFocus(section.id);
  };

  return (
    //  내 하위에있는 모든 자식들한테 마진 부여
    // tailwind pseudo -> variant
    // &>* 현재 컴포넌트 기준으로, 바로 아래 자식들 이라는 뜻
    <div className="[&>*]:mb-24" onClick={handleClickContainer}>
      <SectionTitleEditor section={section} capTitle={capTitle} />
      {section.questions.map((question) => (
        <QuestionEditor
          key={question.id}
          question={question}
          onCopy={section.copyQuestion}
          onDelete={section.removeQuestion}
        />
      ))}
    </div>
  );
});

export default SectionEditor;
