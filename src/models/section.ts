import Question from "./question.ts";
import { makeAutoObservable } from "mobx";

type SectionData = {
  id: number;
  title: string;
  questions: Question[];
};

export default class Section implements SectionData {
  // 1. 필드 정의
  id: number;
  title: string;
  questions: Question[];

  constructor(
    data: SectionData = {
      id: Date.now(),
      title: "",
      // 무조건 질문 한개는 존재하게 함.
      questions: [new Question()],
    },
  ) {
    makeAutoObservable(this);

    this.id = data.id;
    this.title = data.title;
    this.questions = data.questions;
  }

  addQuestion() {
    this.questions.push(new Question());
  }

  removeQuestion(id: number) {
    this.questions = this.questions.filter((question) => question.id !== id);
  }

  copyQuestion(id: number) {
    const question = this.questions.find((q) => q.id === id);
    if (question) {
      this.questions.push(
        new Question({
          ...question,
          id: Date.now(),
        }),
      );
    }
  }
}
