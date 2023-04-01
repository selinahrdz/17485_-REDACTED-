import React, { useState, useEffect } from "react";
import Project from "../components/Project.js";
import NavBar from "../components/navBar.jsx";
import ProjectBox from "../components/ProjectBox.js";

function UserProjects() {
  const [loaded, setLoaded] = useState(false);
  const [userProjectArray, setUserProjectArray] = useState([]);

  useEffect(() => {
    // alert("userprojects_test");
    fetch("http://localhost:5000/my_projects")
      .then((rep) => rep.json())
      .then((data) => {
        console.log(data);
        setLoaded(true);
        setUserProjectArray(data);

      })
      .catch((err) => console.log(err));
  }, []);

  if (loaded) {
   // alert("found projects");
    if (userProjectArray.length > 0) {
      alert("user has "+ userProjectArray.length + " projects");
      return (
        
        <>
          <NavBar />
          <div>
            <div>
            {userProjectArray.map((proj) => (
              <ProjectBox />
            ))}
            </div>
            {/* {userProjectArray &&
              userProjectArray.map((project) => {

                return 1; //Placeholder for Projects Component
              })} */}
          </div>
        </>
      );
    } else {
      //NEED A PLACEHOLDER FOR WHEN THE LIST IS EMPTY
      return (
        <>
          <NavBar />
          <div className="text-center">
            PROJECTS FOUND. WAITING ON PROJECT COMPONENT IMPLEMENTATION
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
          FAILED TO LOAD PROJECTS. EITHER YOU HAVE NO PROJECTS, OR THE SYSTEM IS DOWN
        </div>
      </>
    );
  }
}

export default UserProjects;