import { useRef, useState } from 'react';
import { useSurveyStore } from '../../store/store';
import SectionView from './SectionView';
import { observer } from 'mobx-react-lite';

// mobx 데이터가 바뀌었을 떄 리렌더링 필요 -> observer 필요

const SectionListView = observer(function SectionListView() {
  const surveyStore = useSurveyStore();
  const [currentSection, setCurrentSection] = useState(0);
  const data = useRef<object[]>([]);
  const last = currentSection === surveyStore.sections.length - 1;

  const handleNext = () => {
    if (last) {
      // submit
      console.log(data.current);
      return;
    }
    setCurrentSection(currentSection + 1);
  };

  const saveData = (sectionData: object) => {
    data.current[currentSection] = sectionData;
  };

  return (
    <SectionView
      section={surveyStore.sections[currentSection]}
      last={last}
      onSave={saveData}
      onNext={handleNext}
    />
  );
});

export default SectionListView;
