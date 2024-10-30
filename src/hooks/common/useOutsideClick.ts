import { useEffect, useRef } from "react";

function useOutsideClick(callback: () => void) {
  // 기준이 되는 돔 엘리먼트를 받음.
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    // PC -> MouseEvent, APP -> TouchEvent
    const handleClick = (e: MouseEvent | TouchEvent) => {
      // ref의 돔 엘리먼트가 있다면, 현재 클릭된 영역 외의 부분이 클릭되었을 떄 (현재 클릭영역을 포함하면 안됨)
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };
    // 생성된 핸들러를 도큐먼트에 추가.
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);

    // cleanup func
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [callback]);

  return ref;
}

export default useOutsideClick;
