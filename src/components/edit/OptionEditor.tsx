import { ReactNode, useState } from "react";
import Input from "../common/Input.tsx";
import { QuestionType } from "../../types/app.ts";
import RadioIcon from "../../assets/radio.svg?react";
import CheckboxIcon from "../../assets/checkbox.svg?react";

interface OptionEditorProps {
  type: "multipleChoice" | "checkbox" | "dropdown";
}

export default function OptionEditor({ type }: OptionEditorProps) {
  const [options, setOptions] = useState<string[]>([""]);
  return (
    <div>
      {options.map((option, index) => (
        <div key={index} className="flex items-center">
          {icons[type]}
          <Input
            value={option}
            onChange={(e) => {
              const newOptions = [...options];
              newOptions[index] = e.target.value;
              setOptions(newOptions);
            }}
          />
        </div>
      ))}
      <div className="flex items-center mt-28">
        {icons[type]}
        <button
          className="text-gray500 text-16"
          onClick={() => {
            setOptions((prev) => [...prev, ""]);
          }}
        >
          옵션 추가
        </button>
      </div>
    </div>
  );
}

// 아이콘 포함 오브젝트
const icons: Partial<Record<QuestionType, ReactNode>> = {
  multipleChoice: <RadioIcon className="mr-14" />,
  checkbox: <CheckboxIcon className="mr-14" />,
  dropdown: <RadioIcon className="mr-14" />,
};
