import "./App.css";
import MainLayout from "./components/common/MainLayout.tsx";
import Tabs, {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
} from "./components/common/Tabs.tsx";

import QuestionEditor from "./components/edit/QuestionEditor.tsx";
import { SurveyStoreProvider } from "./store/store.tsx";

function App() {
  return (
    <>
      <MainLayout>
        <SurveyStoreProvider>
          <Tabs>
            <TabList>
              <Tab index={0}>tab1</Tab>
              <Tab index={1}>tab2</Tab>
            </TabList>
            <TabPanels>
              <TabPanel index={0}>
                <QuestionEditor />
              </TabPanel>
              <TabPanel index={1}>123</TabPanel>
            </TabPanels>
          </Tabs>
        </SurveyStoreProvider>
      </MainLayout>
    </>
  );
}

export default App;
