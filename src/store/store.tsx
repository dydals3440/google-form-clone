import { makeAutoObservable } from 'mobx';
import { createContext, PropsWithChildren, useContext } from 'react';
import Section from '../models/section.ts';
import callApi from '../utils/api.ts';
import { SectionData } from '../types/app.ts';

class SurveyStore {
  // 이메일 수집 여부 데이터 (설문에 저장됨.)
  emailCollected: boolean;
  sections: Section[] = [];
  // 포커스된, 아이디의 질문을 추가하고 싶음.
  focusedSectionId: number | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.sections = [new Section()];
    this.focusedSectionId = this.sections[0].id;
    this.emailCollected = false;
  }

  setFocusedSectionId(id: number) {
    this.focusedSectionId = id;
  }

  addSection() {
    console.log(this.sections);
    const section = new Section();
    this.sections.push(section);
    this.focusedSectionId = section.id;
  }

  addQuestion() {
    const section = this.sections.find(
      (section) => section.id === this.focusedSectionId
    );

    if (section) {
      section.addQuestion();
    }
  }

  fetchSurvey(id: number) {
    callApi<{ sections: SectionData[]; emailCollected: boolean }>(
      `/surveys/${id}`
    ).then(({ sections, emailCollected }) => {
      this.sections = sections.map((section) => new Section(section));
      this.emailCollected = emailCollected;
    });
  }
}

// Store 인스턴스 생성.
const surveyStore = new SurveyStore();

const SurveyStoreContext = createContext(surveyStore);
// eslint-disable-next-line react-refresh/only-export-components
export const useSurveyStore = () => useContext(SurveyStoreContext);
export const SurveyStoreProvider = ({ children }: PropsWithChildren) => (
  <SurveyStoreContext.Provider value={surveyStore}>
    {children}
  </SurveyStoreContext.Provider>
);
