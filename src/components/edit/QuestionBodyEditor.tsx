import { QuestionType } from "../../types/app.ts";
import OptionEditor from "./OptionEditor.tsx";
import Input from "../common/Input.tsx";

interface QuestionBodyEditorProps {
  type: QuestionType;
}

function QuestionBodyEditor({ type }: QuestionBodyEditorProps) {
  switch (type) {
    case "shortText":
    case "longText":
    case "date":
    case "time":
      return <Input disabled />;
    case "multipleChoice":
    case "checkbox":
    case "dropdown":
      return <OptionEditor type={"dropdown"} />;
    default:
      return null;
  }
}

export default QuestionBodyEditor;
