import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NavBar(props) {
  const [projectIDInput, setProjectIDInput] = useState("");
  const projectInput = useRef();
  const move = useNavigate();

  function inputReset() {
    projectInput.current.value = null;
  }

  return (
    <>
      {" "}
      <nav className="navbar navbar-dark bg-dark">
        <div className=" m-1">
          <a className="navbar-brand m-2" href="/my_projects">
            Home{" "}
          </a>
          <button
            className="btn btn-primary btn-sm m-2"
            onClick={() => move("/create_project")}
          >
            Create Project
          </button>

          {/* <label htmlFor="">Project ID</label>
          <input
            type="text"
            placeholder="Project ID to Join"
            ref={projectInput}
          /> */}
          <button
            className="btn btn-primary btn-sm m-2"
            type="button"
            onClick={() => {
              // console.log(projectInput.current.value);
              // alert(projectInput.current.value);
              move("/join_project");

              // props.joinHandler(projectInput.current.value);
              // inputReset();
            }}
          >
            Join Project
          </button>
        </div>
        <div>
          <button
            className="btn btn-secondary btn-sm m-2 float-right mr-5 "
            onClick={() => {
              // console.log(projectInput.current.value);
              // alert(projectInput.current.value);
              move("/login");

              // props.joinHandler(projectInput.current.value);
              // inputReset();
            }}
          >
            Sign Out
          </button>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
