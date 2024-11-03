import Panel, {
  PanelBody,
  PanelFooter,
  PanelHeader,
} from "../common/Panel.tsx";
import Input from "../common/Input.tsx";

import QuestionBodyEditor from "./QuestionBodyEditor.tsx";
import Question from "../../models/question.ts";
import { observer } from "mobx-react-lite";
import QuestionTypeEditor from "./QuestionTypeEditor.tsx";

import CopyIcon from "../../assets/copy.svg?react";
import DeleteIcon from "../../assets/trash.svg?react";
import Divider from "../common/Divider.tsx";
import Switch from "../common/Switch.tsx";

interface Props {
  question: Question;
  onCopy: (id: number) => void;
  onDelete: (id: number) => void;
}

const QuestionEditor = observer(function QuestionEditor({
  question,
  onCopy,
  onDelete,
}: Props) {
  return (
    <Panel className="border-l-10 border-l-transparent  focus-within:border-l-main">
      <PanelHeader className="flex mb-25">
        <Input
          className="flex-1 mr-30"
          value={question.title}
          onChange={(e) => question.setTitle(e.currentTarget.value)}
        />
        <QuestionTypeEditor type={question.type} onChange={question.setType} />
      </PanelHeader>
      <PanelBody>
        <QuestionBodyEditor type={question.type} />
      </PanelBody>
      <PanelFooter className="flex justify-end gap-x-24 h-24">
        <button onClick={() => onCopy(question.id)}>
          <CopyIcon />
        </button>
        <button onClick={() => onDelete(question.id)}>
          <DeleteIcon />
        </button>
        <Divider direction="vertical" />
        <div className="flex items-center">
          <span className="mr-13">필수</span>
          <Switch
            id={`${question.id}_switch`}
            checked={question.required}
            onChange={question.setRequired}
          />
        </div>
      </PanelFooter>
    </Panel>
  );
});

export default QuestionEditor;
