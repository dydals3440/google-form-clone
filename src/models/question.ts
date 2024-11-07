import { QuestionData, QuestionType } from '../types/app.ts';
import { makeAutoObservable } from 'mobx';

export default class Question implements QuestionData {
  id: number;
  title: string;
  type: QuestionType;
  required: boolean;
  options?: string[];

  constructor(
    data: QuestionData = {
      id: Date.now(),
      title: '',
      type: 'shortText',
      required: false,
    }
  ) {
    // Observable 하게 mobx가 관찰.
    // QuestionTypeEdtior에서 드롭다운에, 밸류값을 설정하도록 함, 자바스크립트 같은 경우에서, This의 값이
    // Execution Context에 따라 변경됨, 현재 이벤트 객체에서 실행되고 있어, 모델의 클래스에서 this를 잃어버림.
    makeAutoObservable(this, {}, { autoBind: true });
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
      type === 'multipleChoice' ||
      type === 'dropdown' ||
      type === 'checkbox'
    ) {
      this.options = this.options ?? [''];
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
  setOption(index: number, option: string) {
    if (!this.options) {
      return;
    }

    this.options[index] = option;
  }
}
