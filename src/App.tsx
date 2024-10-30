import "./App.css";
import MainLayout from "./components/common/MainLayout.tsx";
import Tabs, {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
} from "./components/common/Tabs.tsx";
import Panel, {
  PanelBody,
  PanelCap,
  PanelFooter,
  PanelHeader,
} from "./components/common/Panel.tsx";

function App() {
  return (
    <>
      <MainLayout>
        <Tabs>
          <TabList>
            <Tab index={0}>tab1</Tab>
            <Tab index={1}>tab2</Tab>
          </TabList>
          <TabPanels>
            <TabPanel index={0}>
              <PanelCap>Cap</PanelCap>
              <Panel>
                <PanelHeader>header</PanelHeader>
                <PanelBody>Body</PanelBody>
                <PanelFooter>footer</PanelFooter>
              </Panel>
            </TabPanel>
            <TabPanel index={1}>panel2</TabPanel>
          </TabPanels>
        </Tabs>
      </MainLayout>
    </>
  );
}

export default App;
