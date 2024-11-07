import Question from '../models/question';

export type QuestionType =
  | 'shortText'
  | 'longText'
  | 'multipleChoice'
  | 'checkbox'
  | 'dropdown'
  | 'date'
  | 'time';

export type QuestionData = {
  id: number;
  title: string;
  type: QuestionType;
  required: boolean;
  // 객관식 or 드롭다운, 질문에는 옵션이 있음.
  options?: string[];
};

export type SectionData = {
  id: number;
  title: string;
  description: string;
  questions: Question[];
};
