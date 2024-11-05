import {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useContext,
  RefObject,
} from 'react';

import ArrowIcon from '../../assets/arrow.svg?react';
import useOutsideClick from '../../hooks/common/useOutsideClick.ts';

interface DropdownProps<T> {
  defaultValue?: T;
  placeholder?: string;
  options: DropdownOption<T>[];
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: T) => void;
}

// State 관리
// 1. 메뉴 오픈 상태
// 2. 선택된 정보
export default function Dropdown<T>({
  defaultValue,
  placeholder,
  options,
  onChange,
}: DropdownProps<T>) {
  const [opened, setOpened] = useState<boolean>(false);
  // -1 not selected
  const [selected, setSelected] = useState<number>(
    defaultValue !== undefined
      ? options.findIndex((option) => option.value === defaultValue)
      : -1
  );

  // open과 close는 한번생성되면 절 대 변경되지 않는 것.
  const open = useCallback(() => setOpened(true), []);
  const close = useCallback(() => setOpened(false), []);

  // 반복적으로 실행되면, 매번 인스턴스가 생성됨.
  const handleChange = useCallback(
    (index: number) => {
      setSelected(index);
      // undefined인지 확인하고, 아닌경우 실행
      onChange?.(options[index].value);
      close();
    },
    [close, onChange, options]
  );

  return (
    <DropdownContext.Provider
      value={{
        opened,
        open,
        close,
        options,
        selected,
        onChange: handleChange,
      }}
    >
      <div className='inline-block relative'>
        <DropdownButton placeholder={placeholder} />
        <DropdownMenu />
      </div>
    </DropdownContext.Provider>
  );
}

type DropdownOption<T> = {
  label: ReactNode;
  value: T;
};

interface DropdownContextType<T = unknown> {
  opened: boolean;
  open: () => void;
  close: () => void;
  options: DropdownOption<T>[];
  selected: number;
  // eslint-disable-next-line no-unused-vars
  onChange: (index: number) => void;
}

const DropdownContext = createContext<DropdownContextType | null>(null);

export function DropdownButton({
  placeholder = 'select',
}: {
  placeholder?: string;
}) {
  // !를 통해 null이 아니게
  const { open, options, selected } = useContext(DropdownContext)!;

  return (
    <button
      className='border border-gray300 rounded-10 min-w-197 p-14 pr-36 relative text-left'
      onClick={open}
    >
      {selected >= 0 ? options[selected].label : placeholder ?? ''}
      <span className='absolute right-12 top-1/2 transform -translate-y-1/2'>
        <ArrowIcon />
      </span>
    </button>
  );
}

function DropdownMenu() {
  // 무조건 Dropdown Container와 함꼐 사용하기 떄문에 !를 통해, null이 아님을 명시
  const { close, opened, options, onChange } = useContext(DropdownContext)!;
  const containerRef = useOutsideClick(close);

  return opened ? (
    <div
      ref={containerRef as RefObject<HTMLDivElement>}
      className='absolute left-0 top-62 border border-gray300 rounded-10 flex flex-col min-w-197 bg-white z-10'
    >
      {options.map((option, index) => (
        <DropdownMenuItem
          key={`${option.value}`}
          label={option.label}
          onSelect={() => onChange(index)}
        />
      ))}
    </div>
  ) : null;
}

function DropdownMenuItem({
  label,
  onSelect,
}: {
  label: ReactNode;
  onSelect: () => void;
}) {
  return (
    <button
      // variant -> last:border-none
      className='text-left p-14 border-b-1 border-gray-300 last:border-none'
      onClick={onSelect}
    >
      {label}
    </button>
  );
}
