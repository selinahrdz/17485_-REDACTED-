import React, { useState, useRef } from "react";

function NavBar(props) {
  const [projectIDInput, setProjectIDInput] = useState("");
  const projectInput = useRef();

  function inputReset() {
    projectInput.current.value = null;
  }

  return (
    <>
      {" "}
      <nav className="navbar navbar-dark bg-dark">
        <div className=" m-1">
          <a className="navbar-brand m-2" href="#">
            UserName{" "}
          </a>
          <button className="btn btn-primary btn-sm m-2">Create Project</button>

          <label htmlFor="">Project ID</label>
          <input
            type="text"
            placeholder="Project ID to Join"
            ref={projectInput}
          />
          <button
            className="btn btn-primary btn-sm m-2"
            type="button"
            onClick={() => {
              props.joinHandler(projectInput.current.value);
              inputReset();
            }}
          >
            Join Project
          </button>

          <button className="btn btn-secondary btn-sm m-2 justify-content-end">
            Sign Out
          </button>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
