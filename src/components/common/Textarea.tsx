import cn from 'classnames';
import { forwardRef, HTMLAttributes, TextareaHTMLAttributes } from 'react';
import { useWatch } from 'react-hook-form';

const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(
        'border-b-1 border-b-gray-200 pb-16 outline-none',
        'focus:border-b-gray600 focus:bg-bg2 focus:rounded-t-6',
        className
      )}
      {...props}
    />
  );
});

export default Textarea;

/**
 * docs: https://stackoverflow.com/questions/17731083/how-to-autogrow-a-textarea-with-css
 */
// div ele에 대한 속성 전부 상속받음
export function AutoGrow({
  className,
  value,
  forTextarea = '',
  ...props
}: HTMLAttributes<HTMLDivElement> & { value?: string; forTextarea?: string }) {
  const valueFromWatch = useWatch({ name: forTextarea });

  // grid 밑에 가상 돔 추가 (after 활용)
  // 외부에서 전달되는 값 value 활용. react-hook-form을 활용해서 작성된, 데이터를 받게함.
  // react-hook-form의 데이터를 상단에서 작성할 경우, 하위 컴포넌트가 전체 렌더링되서, 그 렌더링 범위를 줄이기위해서, 컴포넌트에서 작성되면 좋을 것 같아. prop으로 name을 받도록 추가. (forTextArea)
  return (
    <div
      className={cn(
        'grid',
        'after:content-[attr(data-replicated-value)] after:whitespace-pre-wrap after:invisible after:pb-16 after:auto-grow',
        '[&>textarea]:auto-grow',
        className
      )}
      {...props}
      data-replicated-value={value ?? valueFromWatch}
    ></div>
  );
}
