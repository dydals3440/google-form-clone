import "./App.css";
import MainLayout from "./components/common/MainLayout.tsx";

import { SurveyStoreProvider } from "./store/store.tsx";
import SectionEditorList from "./components/edit/SectionEditorList.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPage from "./pages/AdminPage.tsx";
import CreatePage from "./pages/CreatePage.tsx";
import EditPage from "./pages/EditPage.tsx";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <SurveyStoreProvider>
          <Routes>
            <Route path="/surveys/new" element={<CreatePage />} />
            <Route path="/surveys/:surveyId" element={<AdminPage />}>
              <Route path="edit" element={<EditPage />} />
              <Route path="responses" element={<div>응답</div>} />
            </Route>
          </Routes>
        </SurveyStoreProvider>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
