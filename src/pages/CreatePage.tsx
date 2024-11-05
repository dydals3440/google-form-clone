import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button.tsx';
import SectionListEditor from '../components/edit/SectionListEditor.tsx';
import { useSurveyStore } from '../store/store.tsx';
import callApi from '../utils/api.ts';
import { toJS } from 'mobx';

function CreatePage() {
  const surveyStore = useSurveyStore();
  const navigate = useNavigate();

  const handleSubmit = () => {
    callApi<{ id: number }>('/surveys', {
      method: 'POST',
      // mobx -> survey에서 데이터를 그대로 꺼내요면, 프록시 객체형태로옴.
      // toJS라는 Json Object로 변경해주는 Util을 활용해서 해결
      body: toJS({ sections: surveyStore.sections }),
    }).then(({ id }) => {
      navigate(`/surveys/${id}/edit#send`);
    });
  };

  return (
    <>
      <Button className='absolute -top-0 right-0' onClick={handleSubmit}>
        생성하기
      </Button>
      <SectionListEditor />
    </>
  );
}

export default CreatePage;
