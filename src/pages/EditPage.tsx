import SectionEditorList from "../components/edit/SectionEditorList.tsx";
import { useSurveyStore } from "../store/store.tsx";
import callApi from "../utils/api.ts";
import { toJS } from "mobx";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function EditPage() {
  const surveyStore = useSurveyStore();

  const { surveyId } = useParams<{ surveyId: string }>();

  useEffect(() => {
    const id = parseInt(surveyId ?? "", 10);
    if (id) {
      surveyStore.fetchSurvey(id);
    }
  }, [surveyId, surveyStore]);

  const handleSubmit = () => {
    callApi(`/surveys/${surveyId}`, {
      method: "PUT",
      // mobx -> survey에서 데이터를 그대로 꺼내요면, 프록시 객체형태로옴.
      // toJS라는 Json Object로 변경해주는 Util을 활용해서 해결
      body: toJS({ sections: surveyStore.sections }),
    });
  };

  return (
    <>
      <div>
        <button onClick={handleSubmit}>수정하기</button>
      </div>
      <SectionEditorList />
    </>
  );
}

export default EditPage;
