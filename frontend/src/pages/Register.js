import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NotiModal from "../components/notiModal";
import "bootstrap/dist/css/bootstrap.min.css";

function Register() {
  const move = useNavigate();
  const [username, setuserName] = useState("");
  const [userid, setid] = useState(""); //updates email
  const [password, SetPass] = useState("");
  const [Data, setData] = useState({
    userID: "",
    user: "",
    pass: "",
  });

  //For Modal Notification
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState("");

  function dataToBackend(e) {
    e.preventDefault();

    let form = new FormData();
    form.append("Username", Data.user);
    form.append("Password", Data.pass);
    form.append("UserID", Data.userID);

    e.target.reset();

    fetch("/create_account", {
      method: "POST",
      body: form,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data["message"] == "User added.") {
          move("/my_projects");
        } else {
          setNotification(data["message"]);
          setShowNotification(true);
        }
        console.log(Data);
      });
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

      <div className="container mt-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-6">
            <div className="card px-5 py-5">
              <h2 className="Auth-form-title text-center">Register</h2>
              <form className="" onSubmit={(e) => dataToBackend(e)}>
                <div className="forms-inputs mb-4">
                  <label className="inputPassword6">User ID</label>
                  <input
                    type="text"
                    className="form-control mx-sm-3"
                    id="userID"
                    placeholder="User ID"
                    onChange={(e) => handler(e)}
                    required
                  />
                </div>
                <div className="forms-inputs mb-4">
                  {" "}
                  <label>Username</label>
                  <input
                    id="user"
                    onChange={(e) => handler(e)}
                    type="text"
                    className="form-control mx-sm-3"
                    placeholder="username"
                    required
                  />
                </div>
                <div className="forms-inputs mb-4">
                  {" "}
                  <label>Password</label>
                  <input
                    id="pass"
                    onChange={(e) => handler(e)}
                    type="password"
                    className="form-control mx-sm-3"
                    placeholder="password"
                    required
                  />
                </div>
                <div className="text-center">
                  {" "}
                  <button className="btn btn-primary mt-2 " type="submit">
                    Sign Up
                  </button>
                </div>
              </form>
              <button
                className=" btn btn-primary mt-2"
                onClick={() => move("/login")}
              >
                Already have an account? Login Here
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
