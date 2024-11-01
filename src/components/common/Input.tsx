import { forwardRef, InputHTMLAttributes } from "react";
import cn from "classnames";

// forwardRef의 타입
// 1. Ref의 타입을 지정
// 2. Prop의 타입, Input 컴포넌트에 한 Prop의 타입을 두번쨰 제네릭으로 넘김.
// -> 최종적으로 ref를 받음, 이를 연결
const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "border-b-1 border-b-gray200 py-17 pl-9 pr-21 outline-none",
        "focus:border-b-gray600 focus:bg-bg2 focus:rounded-t-6",
        className,
      )}
      {...props}
    />
  );
});
export default Input;
