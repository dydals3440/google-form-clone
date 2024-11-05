import { ButtonHTMLAttributes } from 'react';
import cn from 'classnames';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
}

function Button({ variant = 'primary', className, ...props }: Props) {
  return (
    <button
      className={cn(
        'py-14 px-28 text-16 font-medium rounded-10 border',
        classes[variant],
        className
      )}
      {...props}
    ></button>
  );
}

export default Button;

// 키값이, props -> variant 값 value값은 string
// variant -> undefined Symbole 타입이 될 수 없어서 에러뜸, null이 될 수 없다는 union 타입을 할당 하자
const classes: Record<NonNullable<Props['variant']>, string> = {
  primary: 'bg-main border-main text-white',
  secondary: 'border-main text-main',
  tertiary: 'border-transparent bg-transparent text-gray700',
};
