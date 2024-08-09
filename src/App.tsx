import "./index.scss";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./Pages/MainPage.tsx";
import NotFound from "./Pages/NotFoundPage.tsx";
import AuthPage from "./Pages/AuthPage.tsx";
import ProjectPage from "./Pages/ProjectPage.tsx";
import Tracker from "./Components/Tracker/Tracker.tsx";
import CompleteTasksPage from "./Pages/CompleteTasksPage.tsx";
import InProgressPage from "./Pages/InProgressPage.tsx";

function App() {
  return (
    <React.StrictMode>
      <Tracker />
      <BrowserRouter>
        <Routes>
          <Route path="" element={<AuthPage />}></Route>
          <Route path="/main/" element={<MainPage />}></Route>
          <Route path="*" element={<NotFound />}></Route>
          <Route path="/main/project/:id" element={<ProjectPage />} />
          <Route path="/main/complete" element={<CompleteTasksPage />} />
          <Route path="/main/progress" element={<InProgressPage />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
