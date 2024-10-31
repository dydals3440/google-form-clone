import { QuestionType } from "../types/app.ts";
import { makeAutoObservable } from "mobx";

type QuestionData = {
  id: number;
  title: string;
  type: QuestionType;
  required: boolean;
  // 객관식 or 드롭다운, 질문에는 옵션이 있음.
  options?: string[];
};

export default class Question implements QuestionData {
  id: number;
  title: string;
  type: QuestionType;
  required: boolean;
  options?: string[];

  constructor(
    data: QuestionData = {
      id: Date.now(),
      title: "",
      type: "shortText",
      required: false,
    },
  ) {
    // Observable 하게 mobx가 관찰.
    makeAutoObservable(this);
    // 정의된 파라미터와 클래스의 필드를 연결.
    this.id = data.id;
    this.title = data.title;
    this.type = data.type;
    this.required = data.required;
    this.options = data.options;
  }
  // 상태 변경 메소드 정의
  setTitle(title: string) {
    this.title = title;
  }

  setType(type: QuestionType) {
    this.type = type;

    if (
      type === "multipleChoice" ||
      type === "dropdown" ||
      type === "checkbox"
    ) {
      this.options = this.options ?? [""];
    } else {
      // 이 외에는 옵션즈가 있으면 안됨.
      this.options = undefined;
    }
  }

  setRequired = (required: boolean) => {
    this.required = required;
  };

  setOptions = (options: string[]) => {
    this.options = options;
  };

  // TODO: 하나의 옵션을 변경할 수 있도록 하는 메서드를 추가합니다.
}
