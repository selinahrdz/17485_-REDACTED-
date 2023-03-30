import React, { useState, useEffect } from "react";
import Project from "../components/Project.js";
import NavBar from "../components/navBar.js";

function UserProjects() {
  const [loaded, setLoaded] = useState(false);
  const [userProjectArray, setUserProjectArray] = useState([]);

  useEffect(() => {
    fetch("my_projects")
      .then((rep) => rep.json())
      .then((data) => {
        console.log(data);
        setLoaded(true);
        setUserProjectArray(data);
      })
      .catch((err) => console.log(err));
  }, []);

  if (loaded) {
    if (userProjectArray.length > 0) {
      return (
        <>
          <NavBar />
          <div>
            {userProjectArray &&
              userProjectArray.map((project) => {
                return 1; //Placeholder for Projects Component
              })}
          </div>
        </>
      );
    } else {
      //NEED A PLACEHOLDER FOR WHEN THE LIST IS EMPTY
      return (
        <>
          <NavBar />
          <div className="text-center">
            NO PROJECTS AVAILABLE. CREATE OR JOIN A PROJECT TO GET STARTED
          </div>
        </>
      );
    }
  } else {
    //NEED A PLACEHOLDER FOR WHEN THE LIST IS EMPTY
    return (
      <>
        <NavBar />
        <div className="text-center">
          NO PROJECTS AVAILABLE. CREATE OR JOIN A PROJECT TO GET STARTED
        </div>
      </>
    );
  }
}

export default UserProjects;
