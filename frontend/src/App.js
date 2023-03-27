import React, { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Project from "./pages/Project";
import CreateProject from "./pages/CreateProject";
import JoinProject from "./pages/JoinProject";
import WelcomePage from "./pages/WelcomePage";

function App() {
  // const [currentForm, setCurrentForm] = useState("login");
  // const toggleForm = (forName) => {
  //   setCurrentForm(forName);
  // };
  // return (
  //   <div className="App">
  //     {/* <Project /> */}
  //     {currentForm == "login" ? (
  //       <Login onFormSwitch={toggleForm} />
  //     ) : (
  //       <Register onFormSwitch={toggleForm} />
  //     )}
  //   </div>
  // );
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<WelcomePage />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="/create_account" element={<Register />} />
        {/* <Route exact path="/my-projects" element={<Project />} />
        <Route path="/join-project" element={<JoinProject />} />
        <Route path="/create-project" element={<CreateProject />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
