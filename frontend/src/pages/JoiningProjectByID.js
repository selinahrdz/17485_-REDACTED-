import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/navBar.jsx";
import NotiModal from "../components/notiModal.js";

function JoiningProjectByID() {
  const move = useNavigate();
  const [Data, setData] = useState({
    projectId: "",
  });

  //For Modal Notification
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState("");

  function DataToBackend(e) {
    e.preventDefault();
    //console.log(username);

    let form = new FormData();
    //alert(Data.projectId);
    form.append("Project_ID", Data.projectId);
    e.target.reset();

    //alert(form.get('Project_ID'));

    fetch("http://localhost:5000/join_project", { method: "POST", body: form })
      .then((response) => response.json())
      .then((data) => {
        if (data["message"] == "Project joined.") {
          move("/my_projects");
        } else {
          alert(data["message"]);
          //Place Holder for Modal
        }
        console.log(Data);
      })
      .catch((err) => console.log(err));
  }
  function handler(e) {
    // alert(e.target.value);
    const newData = { ...Data };
    // alert(e.target.id);
    newData[e.target.id] = e.target.value;
    setData(newData);
    // alert(Data.projectId);
  }

  function showNotificationModal() {
    setShowNotification(!showNotification);
  }
  return (
    <>
      <NavigationBar />

      <NotiModal
        show={showNotification}
        type="Server Message"
        noti={notification}
        handleClose={showNotificationModal}
      />

      <div className="container mt-5">
        <div className="row d-flex justify-content-center">
          <h1 className="text-center">Join Project</h1>
          <div className="col-md-6">
            <div className="card px-5 py-5">
              <form className="form-inline" onSubmit={DataToBackend}>
                <div className="forms-inputs mb-4">
                  <label className="inputPassword6 ">Project ID</label>
                  <input
                    id="projectId"
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
                    Join
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

export default JoiningProjectByID;
