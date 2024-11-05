import { useParams } from 'react-router-dom';
import { useSurveyStore } from '../store/store';
import { useEffect } from 'react';
import SectionListView from '../components/form/SectionListView';

export default function FormPage() {
  const surveyStore = useSurveyStore();
  const { surveyId = '' } = useParams<{ surveyId: string }>();

  useEffect(() => {
    const id = parseInt(surveyId, 10);
    if (id) {
      surveyStore.fetchSurvey(id);
    }
  }, [surveyId, surveyStore]);

  return <SectionListView />;
}
