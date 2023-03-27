import React, { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateProject from "./pages/CreateProject";
import JoiningProjectByID from "./pages/JoiningProjectByID";
import WelcomePage from "./pages/WelcomePage";
import UserProjects from "./pages/UserProjects";

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
        <Route exact path="/my_projects" element={<UserProjects />} />
        <Route path="/join_project" element={<JoiningProjectByID />} />
        <Route path="/create_project" element={<CreateProject />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
