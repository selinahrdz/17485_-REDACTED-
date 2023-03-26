import React, { useState } from "react";

export const Project = (props) => {
  const [name, setname] = useState("");
  const [description, setdescription] = useState(""); //updates email
  const [projectid, setID] = useState("");
  const [projectid2, setID2] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name);
  };
  return (
    <div className="project-container">
      <h2>Create New Project</h2>
      <form className="project-form" onSubmit={handleSubmit}>
        <label htmlfor="name">Name</label>
        <input
          value={name}
          onChange={(e) => setname(e.target.value)}
          type="name"
          placeholder="projectname"
        />
        <label htmlfor="description">Description</label>
        <input
          value={description}
          onChange={(e) => setdescription(e.target.value)}
          type="description"
          placeholder="yourdescription"
        />
        <label htmlfor="ProjectID">ProjectID</label>
        <input
          value={projectid}
          onChange={(e) => setID(e.target.value)}
          type="ProjectID"
          placeholder="ProjectID"
        />
        <button className="link" type="submit">
          Create
        </button>
        <h2>Existing Project</h2>
        <label htmlfor="ProjectID2">ProjectID</label>
        <input
          value={projectid2}
          onChange={(e) => setID2(e.target.value)}
          type="ProjectID2"
          placeholder="ProjectID"
        />
        <button className="link" type="submit">
          Enter
        </button>
      </form>
      {/* <button
                className="link-button"
                onClick={() => props.onFormSwitch("register")}
            >
                {" "}
                New User? Register Here
            </button> */}
    </div>
  );
};
