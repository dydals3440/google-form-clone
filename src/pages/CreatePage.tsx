import SectionEditorList from "../components/edit/SectionEditorList.tsx";
import { useSurveyStore } from "../store/store.tsx";
import callApi from "../utils/api.ts";
import { toJS } from "mobx";

function CreatePage() {
  const surveyStore = useSurveyStore();
  const handleSubmit = () => {
    callApi("/surveys", {
      method: "POST",
      // mobx -> survey에서 데이터를 그대로 꺼내요면, 프록시 객체형태로옴.
      // toJS라는 Json Object로 변경해주는 Util을 활용해서 해결
      body: toJS({ sections: surveyStore.sections }),
    });
  };

  return (
    <>
      <div>
        <button onClick={handleSubmit}>생성하기</button>
      </div>
      <SectionEditorList />
    </>
  );
}

export default CreatePage;
