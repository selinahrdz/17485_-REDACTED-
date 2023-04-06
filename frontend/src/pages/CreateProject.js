import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/navBar.jsx";
import NotiModal from "../components/notiModal.js";

function CreateProject() {
  const move = useNavigate();
  const [Data, setData] = useState({
    ProjectName: "",
    ProjectDescription: "",
  });

  //For Modal Notification
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState("");

  function DataToBackend(e) {
    e.preventDefault();
    //console.log(username);

    let form = new FormData();
    form.append("Project_Name", Data.ProjectName);
    form.append("Project_Description", Data.ProjectDescription);
    e.target.reset();

    fetch("http://localhost:5000/create_project", {
      method: "POST",
      body: form,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data["Message"] == "Project created.") {
          move("/my_projects");
        } else {
          setNotification(data["Message"]);
          setShowNotification(true);
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

  function showNotificationModal() {
    setShowNotification(!showNotification);
  }
  return (
    <>
      <NotiModal
        show={showNotification}
        type="Server Message"
        noti={notification}
        handleClose={showNotificationModal}
      />
      <NavigationBar />
      <h1 className="ml-2 text-center mt-5">Create Project</h1>
      <div className="container mt-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-6">
            <div className="card px-5 py-5">
              <form className="" onSubmit={DataToBackend}>
                <div className="forms-inputs mb-4">
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
                <div className="forms-inputs mb-4">
                  <label className="inputPassword6 ml-2 ">
                    Project Description
                  </label>
                  <input
                    id="ProjectDescription"
                    onChange={(e) => handler(e)}
                    type="username"
                    placeholder="Project ID"
                    className="form-control mx-sm-3"
                    required
                  />
                </div>
                <div className="text-center">
                  <button
                    className="login-btn btn btn-primary mt-25"
                    type="submit"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateProject;
