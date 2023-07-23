import { Route, Routes, Navigate } from "react-router-dom";
import LogIn from "./pages/LogIn";
import LogoImg from "./Component/UI/Logo/LogoImg";
import CreateTaskForm from "./pages/CreateTask";
import TaskList from "./pages/TaskList";
import ProtectedRoute from "./ProtectedRoute";
import JokesSpot from "./pages/JokesSpot";
import { Fragment } from "react";
import "./app.css"
function App() {
  return (
    <Fragment>
      <LogoImg></LogoImg>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}></Route>
        <Route path="/login" element={<LogIn />}></Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/viewTasks" element={<TaskList />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/jokesSpot" element={<JokesSpot />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/editTask" element={<CreateTaskForm />} />
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;
