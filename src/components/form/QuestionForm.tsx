import { Controller, useFormContext } from 'react-hook-form';
import Question from '../../models/question';
import Input from '../common/Input';
import Dropdown from '../common/Dropdown';
import Textarea, { AutoGrow } from '../common/Textarea';
import Radio from '../common/Radio';

interface Props {
  question: Question;
}

export default function QuestionForm({ question }: Props) {
  const { register, control } = useFormContext();

  switch (question.type) {
    case 'shortText':
      return (
        <Input
          className='pb-16 pt-0 border-b-2 focus:border-b-main focus:bg-transparent w-full'
          {...register(`${question.id}`)}
        />
      );
    case 'longText':
      return (
        <AutoGrow className='w-full' forTextarea={`${question.id}`}>
          <Textarea
            rows={1}
            className='w-full focus:bg-transparent resize-none focus:border-b-main'
            {...register(`${question.id}`)}
          />
        </AutoGrow>
      );
    case 'checkbox':
      return null;
    case 'date':
      return <Input type='date' {...register(`${question.id}`)} />;
    case 'dropdown':
      return (
        // Input이나 Select와 같은 Element를 사용하지 않았을 때 컨트롤러를 제공해서, 리액트 훅 폼과, 커스텀 컴포넌트를 연결할 수 있도록 지원함.
        // name 값 전달. useFormContext -> register대신 context 연결.
        // 마지막으로 render 함수, 전달. 첫번째 자식으로 Field 전달.
        <Controller
          name={`${question.id}`}
          control={control}
          render={({ field }) => (
            <Dropdown
              // options -> optional일수도 있으니, 빈 배열이라도 있어서 느낌표라는, 시그니처를 추가해서, 무조건 있도록 변경하게함.
              options={question.options!.map((option) => ({
                label: <span>{option}</span>,
                value: option,
              }))}
              onChange={field.onChange}
            />
          )}
        />
      );
    case 'multipleChoice':
      return (
        <div className='flex gap-y-20 flex-col'>
          {question.options?.map((option) => (
            <Radio
              key={option}
              label={option}
              value={option}
              {...register(`${question.id}`)}
            />
          ))}
        </div>
      );
    case 'time':
      return <Input type='time' {...register(`${question.id}`)} />;
    default:
      return null;
  }
}
