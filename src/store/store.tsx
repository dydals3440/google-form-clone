import { makeAutoObservable } from "mobx";
import { createContext, PropsWithChildren, useContext } from "react";
import Section from "../models/section.ts";

class SurveyStore {
  sections: Section[] = [];
  // 포커스된, 아이디의 질문을 추가하고 싶음.
  focusedSectionId: number | null = null;

  constructor() {
    makeAutoObservable(this);
    this.sections = [new Section()];
    this.focusedSectionId = this.sections[0].id;
  }

  addSection() {
    const section = new Section();
    this.sections.push(section);
    this.focusedSectionId = section.id;
  }

  addQuestion() {
    const section = this.sections.find(
      (section) => section.id === this.focusedSectionId,
    );

    if (section) {
      section.addQuestion();
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