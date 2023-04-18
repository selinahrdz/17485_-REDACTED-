import React, { useState, useEffect } from "react";
import NavBar from "../components/navBar.jsx";
import ProjectBox from "../components/ProjectBox.js";

function UserProjects() {
  const [loaded, setLoaded] = useState(false);
  const [userProjectArray, setUserProjectArray] = useState([]);

  useEffect(() => {
    // alert("userprojects_test");
    fetch("/my_projects")
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
      //alert("user has " + userProjectArray.length + " projects");
      return (
        <>
          <NavBar />
          <div>
            <div>
              {userProjectArray.map((proj) => (
                <ProjectBox projName={proj.Name} id={proj._id} />
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
      return (
        <>
          <NavBar />
          <div className="text-center">
            FAILED TO LOAD PROJECTS. EITHER YOU HAVE NO PROJECTS, OR THE SYSTEM
            IS DOWN
          </div>
        </>
      );
    }
  } else {
    return (
      <>
        <NavBar />
        <div className="text-center">
          FAILED TO LOAD PROJECTS. EITHER YOU HAVE NO PROJECTS, OR THE SYSTEM IS
          DOWN
        </div>
      </>
    );
  }
}

export default UserProjects;
