import express from 'express';
import JsonStorage from '../../utils/jsonStorage.ts';
import path from 'path';
import { SectionData } from '../../models/section.ts';

const router = express.Router();
const storage = new JsonStorage<{
  sections: SectionData[];
  emailCollected: boolean;
}>(path.join(__dirname, '../data/surveys.json'));
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

export default router;
