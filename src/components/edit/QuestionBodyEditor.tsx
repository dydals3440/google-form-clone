import OptionEditor from './OptionEditor.tsx';
import Input from '../common/Input.tsx';
import Question from '../../models/question.ts';

interface QuestionBodyEditorProps {
  question: Question;
}

function QuestionBodyEditor({ question }: QuestionBodyEditorProps) {
  switch (question.type) {
    case 'shortText':
    case 'longText':
    case 'date':
    case 'time':
      return <Input disabled />;
    case 'multipleChoice':
    case 'checkbox':
    case 'dropdown':
      return <OptionEditor question={question} />;
    default:
      return null;
  }
}

export default QuestionBodyEditor;
