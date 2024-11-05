import { ReactNode } from 'react';
import Input from '../common/Input.tsx';
import { QuestionType } from '../../types/app.ts';
import RadioIcon from '../../assets/radio.svg?react';
import CheckboxIcon from '../../assets/checkbox.svg?react';
import Question from '../../models/question.ts';
import { observer } from 'mobx-react-lite';

interface OptionEditorProps {
  question: Question;
}

const OptionEditor = observer(function OptionEditor({
  question: { options = [], setOption, type, setOptions },
}: OptionEditorProps) {
  return (
    <div>
      {options.map((option, index) => (
        <div key={index} className='flex items-center'>
          {icons[type]}
          <Input
            value={option}
            onChange={(e) => {
              setOption(index, e.currentTarget.value);
            }}
          />
        </div>
      ))}
      <div className='flex items-center mt-28'>
        {icons[type]}
        <button
          className='text-gray500 text-16'
          onClick={() => {
            setOptions([...options, `옵션 ${options.length + 1}`]);
          }}
        >
          옵션 추가
        </button>
      </div>
    </div>
  );
});

// 아이콘 포함 오브젝트
const icons: Partial<Record<QuestionType, ReactNode>> = {
  multipleChoice: <RadioIcon className='mr-14' />,
  checkbox: <CheckboxIcon className='mr-14' />,
  dropdown: <RadioIcon className='mr-14' />,
};

export default OptionEditor;
