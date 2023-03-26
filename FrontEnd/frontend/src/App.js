import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Login } from "./Components/Login";
import { Register } from "./Components/Register";
import { Project } from "./Components/Project";

function App() {
  const [currentForm, setCurrentForm] = useState("login");
  const toggleForm = (forName) => {
    setCurrentForm(forName);
  };
  return (
    <div className="App">
      {/* <Project /> */}

      {currentForm == "login" ? (
        <Login onFormSwitch={toggleForm} />
      ) : (
        <Register onFormSwitch={toggleForm} />
      )}
    </div>
  );
}

export default App;
