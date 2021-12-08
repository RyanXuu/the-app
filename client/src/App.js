
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainMenu from "./Pages/MainMenu";
import ToDoList from "./Pages/Apps/ToDoList/TheToDoList";
import ErrorPage from "./Pages/ErrorPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/toDoList" element={<ToDoList />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
