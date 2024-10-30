// 제네릭 전달 안되도록, NonNullable 설정
type Cn<T = NonNullable<unknown>> = T & {
  className?: string;
};
