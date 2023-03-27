import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Register() {
  const move = useNavigate();
  const [username, setuserName] = useState("");
  const [userid, setid] = useState(""); //updates email
  const [password, SetPass] = useState("");
  const [Data, setData] = useState({
    firstName: "",
    lastName: "",
    user: "",
    pass: "",
  });

  function dataToBackend(e) {
    e.preventDefault();

    let form = new FormData();
    form.append("Username", Data.user);
    form.append("Password", Data.pass);
    form.append("Last_name", Data.lastName);
    form.append("First_name", Data.firstName);

    e.target.reset();

    fetch("/create_account", { method: "POST", body: form })
      .then((response) => response.json())
      .then((data) => {
        if (data["message"] == "User added.") {
          move("/my-projects");
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
    <div className="text-center">
      <h2 className="text-center">Register</h2>
      <form onSubmit={(e) => dataToBackend(e)}>
        <div className="form-row">
          <div class="form-group col-md-6 mx-sm-3">
            <label for="inputEmail4">First Name</label>
            <input
              type="text"
              className="form-control mx-sm-3"
              id="firstname"
              placeholder="First Name"
              onChange={(e) => handler(e)}
            />
          </div>
          <div className="form-group col-md-6 mx-sm-3">
            <label for="inputEmail4">Last Name</label>
            <input
              type="text"
              class="form-control"
              id="lastname"
              className="form-control mx-sm-3"
              placeholder="Last Name"
              onChange={(e) => handler(e)}
            />
          </div>
          <div className="form-group col-md-6 mx-sm-3">
            {" "}
            <label>Username</label>
            <input
              id="user"
              onChange={(e) => handler(e)}
              type="text"
              className="form-control mx-sm-3"
              placeholder="username"
            />
          </div>
          <div className="form-group col-md-6 mx-sm-3">
            {" "}
            <label>Password</label>
            <input
              id="pass"
              onChange={(e) => handler(e)}
              type="password"
              className="form-control mx-sm-3"
              placeholder="password"
            />
          </div>
          <button className="btn btn-primary mt-2 " type="submit">
            Sign Up
          </button>
        </div>
      </form>
      {""}
      <button className=" btn btn-primary mt-2" onClick={() => move("/login")}>
        Already have an account? Login Here
      </button>
    </div>
  );
}

export default Register;
