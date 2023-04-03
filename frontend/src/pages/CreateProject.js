import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/navBar.js";

function CreateProject() {
  const move = useNavigate();
  const [Data, setData] = useState({
    ProjectName: "",
    ProjectDescription: "",
  });

  function DataToBackend(e) {
    e.preventDefault();
    //console.log(username);

    let form = new FormData();
    form.append("Project_Name", Data.ProjectName);
    form.append("Project_Description", Data.ProjectDescription);
    e.target.reset();

    fetch("http://localhost:5000/create_project", { method: "POST", body: form })
      .then((response) => response.json())
      .then((data) => {
        if (data["Message"] == "Project created.") {
          move("/my_projects");
        } else {
          alert(data["Message"])
        }
        console.log(Data);
      })
      .catch((err) => console.log(err));
  }
  function handler(e) {
    const newData = { ...Data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  }
  return (
    <>
      <NavigationBar />
      <h1 className="ml-2">Create Project</h1>
      <div className=" text-center">
        <form className="form-inline" onSubmit={DataToBackend}>
          <div className="form-group col-7 ">
            <label className="inputPassword6 ">Project Name</label>
            <input
              id="ProjectName"
              onChange={(e) => handler(e)}
              type="username"
              placeholder="Project Name"
              className="form-control mx-sm-3"
              required
            />
          </div>
          <div className="form-group col-7 ">
            <label className="inputPassword6 ml-2 ">Project Description</label>
            <input
              id="ProjectDescription"
              onChange={(e) => handler(e)}
              type="username"
              placeholder="Project ID"
              className="form-control mx-sm-3"
              required
            />
            <button className="login-btn btn btn-primary mt-25" type="submit">
              Create
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateProject;
