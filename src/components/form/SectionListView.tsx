import { useState } from 'react';
import { useSurveyStore } from '../../store/store';
import SectionView from './SectionView';
import { observer } from 'mobx-react-lite';

// mobx 데이터가 바뀌었을 떄 리렌더링 필요 -> observer 필요

const SectionListView = observer(function SectionListView() {
  const surveyStore = useSurveyStore();
  const [currentSection, setCurrentSection] = useState(0);

  return <SectionView section={surveyStore.sections[currentSection]} />;
});

export default SectionListView;
