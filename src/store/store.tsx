import Question from "../models/question.ts";
import { makeAutoObservable } from "mobx";
import { createContext, PropsWithChildren, useContext } from "react";

class SurveyStore {
  questions: Question[] = [];

  constructor() {
    makeAutoObservable(this);
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

// Store 인스턴스 생성.
const surveyStore = new SurveyStore();

// eslint-disable-next-line react-refresh/only-export-components
const SurveyStoreContext = createContext(surveyStore);
export const useSurveyStore = () => useContext(SurveyStoreContext);
export const SurveyStoreProvider = ({ children }: PropsWithChildren) => (
  <SurveyStoreContext.Provider value={surveyStore}>
    {children}
  </SurveyStoreContext.Provider>
);
