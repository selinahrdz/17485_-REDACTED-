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

  function dataToBackend(e) {
    e.preventDefault();

    let form = new FormData();
    form.append("Username", Data.user);
    form.append("Password", Data.pass);
    form.append("UserID", Data.userID);

    e.target.reset();

    fetch("http://localhost:5000/create_account", {
      method: "POST",
      body: form,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data["message"] == "User added.") {
          move("/my_projects");
        } else {
          //Place Holder for Modal
        }
        console.log(Data);
      });
  }

  function handler(e) {
    const newData = { ...Data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  }
  return (
    <div className="register-form">
      <h2 className="register-title">Register</h2>
      <form className="form" onSubmit={(e) => dataToBackend(e)}>
        {/* <div className="form-row align-items-center"> */}
        {/* <div class="form-group col-md-6 mx-sm-3"> */}
        <label for="inputEmail4">User ID</label>
        <input
          type="text"
          className="form-control mx-sm-3"
          id="firstname"
          placeholder="User ID"
          onChange={(e) => handler(e)}
        />
        {/* </div> */}
        {/* <div className="form-group col-md-6 mx-sm-3"> */}{" "}
        <label>Username</label>
        <input
          id="user"
          onChange={(e) => handler(e)}
          type="text"
          className="form-control mx-sm-3"
          placeholder="username"
        />
        {/* </div> */}
        {/* <div className="form-group col-md-6 mx-sm-3"> */}{" "}
        <label>Password</label>
        <input
          id="pass"
          onChange={(e) => handler(e)}
          type="password"
          className="form-control mx-sm-3"
          placeholder="password"
        />
        {/* </div> */}
        <button className="signup-btn" type="submit">
          Sign Up
        </button>
        {/* </div> */}
      </form>
      {""}
      <button className="back-btn" onClick={() => move("/login")}>
        Already have an account? Login Here
      </button>
    </div>
  );
}

export default Register;
