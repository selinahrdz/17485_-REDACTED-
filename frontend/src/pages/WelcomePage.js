import React from "react";
import { Link, useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const move = useNavigate();
  return (
    <>
      <h1 className=" text-center ">Welcome</h1>
      <div className="text-center">
        <button
          type="button"
          className="btn btn-primary mt-25"
          onClick={() => move("/login")}
        >
          {" "}
          Begin
        </button>
      </div>
    </>
  );
};

export default WelcomePage;
