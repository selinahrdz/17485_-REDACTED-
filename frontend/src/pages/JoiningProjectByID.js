import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/navBar.js";

function JoiningProjectByID() {
  const move = useNavigate();
  const [Data, setData] = useState({
    projectId: "",
  });

  function DataToBackend(e) {
    e.preventDefault();
    //console.log(username);

    let form = new FormData();
    form.append("Project_Id", Data.projectId);
    e.target.reset();

    fetch("/join-project", { method: "POST", body: form })
      .then((response) => response.json())
      .then((data) => {
        if (data["message"] == "Project joined.") {
          move("/my_projects");
        } else {
          //Place Holder for Modal
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
      <h1 className="ml-2">Join Project</h1>
      <div className=" text-center">
        <form className="form-inline" onSubmit={DataToBackend}>
          <div className="form-group col-7 ">
            <label className="inputPassword6 ">Project ID</label>
            <input
              id="Project_ID"
              onChange={(e) => handler(e)}
              type="username"
              placeholder="Project ID"
              className="form-control mx-sm-3"
              required
            />
            <button className="login-btn btn btn-primary mt-25" type="submit">
              Join
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default JoiningProjectByID;
