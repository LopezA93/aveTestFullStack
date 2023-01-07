import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login/Login";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { RequireAuth } from "./services/AuthProtected";
import TareasContainer from "./components/Tareas/TareasContainer";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/tareas" element={ <RequireAuth>
          <TareasContainer/></RequireAuth>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
