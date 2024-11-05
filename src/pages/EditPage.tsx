import SectionEditorList from '../components/edit/SectionEditorList.tsx';
import { useSurveyStore } from '../store/store.tsx';
import callApi from '../utils/api.ts';
import { toJS } from 'mobx';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Button from '../components/common/Button.tsx';
import Modal from '../components/common/Modal.tsx';
import SendModalContent from '../components/edit/SendModalContent.tsx';

function EditPage() {
  const surveyStore = useSurveyStore();
  const { hash } = useLocation();

  const [opened, setOpened] = useState(hash === '#send');

  const { surveyId = '' } = useParams<{ surveyId: string }>();

  useEffect(() => {
    const id = parseInt(surveyId, 10);
    if (id) {
      surveyStore.fetchSurvey(id);
    }
  }, [surveyId, surveyStore]);

  const handleSubmit = () => {
    callApi(`/surveys/${surveyId}`, {
      method: 'PUT',
      // mobx -> survey에서 데이터를 그대로 꺼내요면, 프록시 객체형태로옴.
      // toJS라는 Json Object로 변경해주는 Util을 활용해서 해결
      body: toJS({ sections: surveyStore.sections }),
    }).then(() => {
      setOpened(true);
    });
  };

  return (
    <>
      <Button className='absolute top-0 right-0' onClick={handleSubmit}>
        보내기
      </Button>
      <SectionEditorList />

      <Modal opened={opened}>
        <SendModalContent
          emailCollected={surveyStore.emailCollected}
          surveyId={parseInt(surveyId, 10)}
          onClose={() => setOpened(false)}
        />
      </Modal>
    </>
  );
}

export default EditPage;
