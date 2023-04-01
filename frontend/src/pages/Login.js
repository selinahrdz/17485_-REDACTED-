import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const move = useNavigate();
  const [username, setuserName] = useState("");
  const [userid, setid] = useState(""); //updates email
  const [password, SetPass] = useState("");
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
        alert(data["message"]);
        if (data["message"] == "Authorized") {
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
    <>
      <div className="login-form">
        <h2 className="login-title">Login</h2>
        <form className="form" onSubmit={DataToBackend}>
          {/* <div className="form-group col-7 "> */}{" "}
          <label className="username-login">Username</label>
          <input
            id="user"
            onChange={(e) => handler(e)}
            type="username"
            placeholder="Username"
            className="form-control mx-sm-3"
            required
          />
          {/* </div> */}
          {/* <div className="form-group col-7"> */}{" "}
          <label className="username-password">Password</label>
          <input
            onChange={(e) => handler(e)}
            type="password"
            placeholder="Password"
            className="form-control mx-sm-3"
            id="pass"
            required
          />
          {/* </div> */}
          <button className="login-btn" type="submit">
            Log In
          </button>
        </form>
        <button
          className="register-btn"
          onClick={() => move("/create_account")}
        >
          {" "}
          New User? Register Here
        </button>
      </div>
    </>
  );
}

export default Login;
