import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NotiModal from "../components/notiModal";

function Login() {
  const move = useNavigate();
  const [username, setuserName] = useState("");
  const [userid, setid] = useState(""); //updates email
  const [password, SetPass] = useState("");

  //For Modal Notification
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState("");

  const [Data, setData] = useState({
    user: "",
    pass: "",
  });

  function DataToBackend(e) {
    e.preventDefault();
    console.log(username);

    let form = new FormData();
    form.append("Username", Data.user);
    form.append("Password", Data.pass);

    fetch("http://localhost:5000/login", { method: "POST", body: form })
      .then((response) => response.json())
      .then((data) => {
        if (data["message"] == "Authorized") {
          move("/my_projects");
        } else {
          //alert(data["message"]);
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
              <h2 className="Auth-form-title text-center">Login</h2>
              <form className="" onSubmit={DataToBackend}>
                <div className="forms-inputs mb-4">
                  <label className="inputPassword6  ">Username</label>
                  <input
                    id="user"
                    onChange={(e) => handler(e)}
                    type="username"
                    placeholder="Username"
                    className="form-control mx-sm-3"
                    required
                  />
                </div>
                <div className="forms-inputs mb-4">
                  {" "}
                  <label className="inputPassword6">Password</label>
                  <input
                    onChange={(e) => handler(e)}
                    type="password"
                    placeholder="Password"
                    className="form-control mx-sm-3"
                    id="pass"
                    required
                  />
                </div>
                <div className="text-center">
                  {" "}
                  <button
                    className=" login-btn btn btn-primary mt-25 "
                    type="submit"
                  >
                    Log In
                  </button>
                </div>
              </form>
              <button
                className="link-button btn btn-primary mt-25"
                onClick={() => move("/create_account")}
              >
                {" "}
                New User? Register Here
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
