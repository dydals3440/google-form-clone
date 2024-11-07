import express from 'express';
import JsonStorage from '../../utils/jsonStorage.ts';
import path from 'path';
import { QuestionData, SectionData } from '../../types/app.ts';

const router = express.Router();
const storage = new JsonStorage<{
  sections: SectionData[];
  emailCollected: boolean;
  responses: SurveyResponse[];
}>(path.join(__dirname, '../data/surveys.json'));

type SurveyResponse = Record<
  SectionData['id'],
  Record<QuestionData['id'], string>
>;

//
router.get('/', (req, res) => {
  return res.json(storage.getAll());
});

router.post('/', (req, res) => {
  const id = Date.now();
  storage.set(id, {
    ...req.body,
    emailCollected: false,
  });
  return res.json({ id });
});

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  storage.set(id, req.body);

  return res.json({ id });
});

// 이메일 수집 여부만 수정
router.patch('/:id', (req, res) => {
  const id = Number(req.params.id);
  const data = storage.get(id);
  storage.set(id, {
    ...data,
    ...req.body,
  });

  return res.json({ id });
});

router.get('/:id', (req: express.Request, res: express.Response) => {
  const id = Number(req.params.id);
  const data = storage.get(id);

  if (!data) {
    return res.status(404).json({ message: 'not Found' });
  }

  return res.json(data);
});

router.post('/:id/responses', (req, res) => {
  const id = Number(req.params.id);
  const data = storage.get(id);

  if (!data) {
    return res.status(404).json({ message: 'Not Found' });
  }

  storage.set(id, {
    ...data,
    responses: [
      // 기존 응답들을 그대로 가져오고, 새로운 응답을 추가
      ...(data.responses ?? []),
      req.body,
    ],
  });

  return res.status(201).json({ message: 'Response added' });
});

export default router;
