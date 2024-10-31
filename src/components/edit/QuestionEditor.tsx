import Panel, { PanelBody, PanelHeader } from "../common/Panel.tsx";
import Input from "../common/Input.tsx";
import Dropdown from "../common/Dropdown.tsx";
import { QuestionType } from "../../types/app.ts";
import QuestionBodyEditor from "./QuestionBodyEditor.tsx";
import Question from "../../models/question.ts";
import { observer } from "mobx-react-lite";

interface Props {
  question: Question;
}

const QuestionEditor = observer(function QuestionEditor({ question }: Props) {
  return (
    <Panel>
      <PanelHeader className="flex mb-25">
        <Input className="flex-1 mr-30" />
        <Dropdown<QuestionType>
          defaultValue={question.type}
          onChange={(value) => question.setType(value)}
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
      </PanelHeader>
      <PanelBody>
        <QuestionBodyEditor type={question.type} />
      </PanelBody>
    </Panel>
  );
});

export default QuestionEditor;
