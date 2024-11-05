import React, { forwardRef, InputHTMLAttributes } from 'react';
import UnCheckedIcon from '../../assets/checkbox.svg?react';
import CheckIcon from '../../assets/checked.svg?react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Radio = forwardRef<HTMLInputElement, Props>(function Radio(
  { label, ...props },
  ref
) {
  return (
    <label className='relative h-26 flex items-center'>
      <input
        className='peer opacity-0 w-26 h-26'
        ref={ref}
        type='radio'
        {...props}
      />
      <CheckIcon className='absolute top-0 left-0 opacity-0 peer-checked:opacity-100 transition-opacity' />
      <UnCheckedIcon className='absolute top-0 left-0 opacity-100 peer-checked:opacity-0 transition-opacity' />
      <span className='pl-14'>{label}</span>
    </label>
  );
});

export default Radio;
