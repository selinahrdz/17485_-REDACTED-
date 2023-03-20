import logo from "./logo.svg";
import "./App.css";
import { Login } from "./Login";
import { Register } from "./Register";
import Project from "./components/Project";
import { useState } from "react";

function App() {
  return (
    <div className="App">
      <Project />
    </div>
  );
}

export default App;
