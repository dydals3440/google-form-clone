import { QuestionType } from "../../types/app.ts";
import Dropdown from "../common/Dropdown.tsx";
import { observer } from "mobx-react-lite";

interface Props {
  type: QuestionType;
  onChange: (type: QuestionType) => void;
}

const QuestionTypeEditor = observer(function QuestionTypeEditor({
  type,
  onChange,
}: Props) {
  return (
    <Dropdown<QuestionType>
      defaultValue={type}
      onChange={(value) => onChange(value)}
      options={[
        {
          label: (
            <div>
              <span>단답형</span>
            </div>
          ),
          value: "shortText",
        },
        {
          label: (
            <div>
              <span>장문형</span>
            </div>
          ),
          value: "longText",
        },
        {
          label: (
            <div>
              <span>객관식</span>
            </div>
          ),
          value: "multipleChoice",
        },
        {
          label: (
            <div>
              <span>체크박스</span>
            </div>
          ),
          value: "checkbox",
        },
        {
          label: (
            <div>
              <span>드롭다운</span>
            </div>
          ),
          value: "dropdown",
        },
        {
          label: (
            <div>
              <span>날짜</span>
            </div>
          ),
          value: "date",
        },
        {
          label: (
            <div>
              <span>시간</span>
            </div>
          ),
          value: "time",
        },
      ]}
    />
  );
});

export default QuestionTypeEditor;
