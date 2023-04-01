import React, { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateProject from "./pages/CreateProject";
import JoiningProjectByID from "./pages/JoiningProjectByID";
import WelcomePage from "./pages/WelcomePage";
import UserProjects from "./pages/UserProjects";

function App() {
  // const [currentForm, setCurrentForm] = useState("login");
  // const toggleForm = (forName) => {
  //   setCurrentForm(forName);
  // };
  // return (
  //   <div className="App">
  //     {/* <Project /> */}
  //     {currentForm == "login" ? (
  //       <Login onFormSwitch={toggleForm} />
  //     ) : (
  //       <Register onFormSwitch={toggleForm} />
  //     )}
  //   </div>
  // );
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<WelcomePage />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/create_account" element={<Register />} />
          <Route exact path="/my_projects" element={<UserProjects />} />
          <Route path="/join_project" element={<JoiningProjectByID />} />
          <Route path="/create_project" element={<CreateProject />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

// import React, { Component, useState, useEffect } from "react";
// import NavBar from "./components/navBar";
// import ProjectBox from "./components/ProjectBox";
// import NotiModal from "./components/notiModal";
// import "bootstrap/dist/css/bootstrap.min.css";

// function App() {
//   const [inProject1, setInProject1] = useState(false);
//   const [inProject2, setInProject2] = useState(false);
//   const [inProject3, setInProject3] = useState(false);

//   //For Modal Notification
//   const [showNotification, setShowNotification] = useState(false);
//   const [notification, setNotification] = useState("");

//   function leaveHandler(id) {
//     const formData = new FormData();
//     formData.append("Project_Id", id);

//     console.log("Leave Button Event Handler Called");

//     console.log(id);
//     if (id == "1") {
//       console.log("Leaving Project 1");
//       setInProject1(false);
//     } else if (id == "2") {
//       console.log("Leaving Project 2");
//       setInProject2(false);
//     } else if (id == "3") {
//       console.log("Leaving Project 3");
//       setInProject3(false);
//     }
//     fetch("/leave_project", {
//       method: "POST",
//       body: formData,
//     })
//       .then((response) =>
//         response.json().then((data) => {
//           console.log(data);
//           setShowNotification(true);
//           setNotification(data["message"]);
//         })
//       )
//       .catch((error) => console.log(error));
//   }
//   function joinHandler(id) {
//     const formData = new FormData();
//     formData.append("Project_Id", id);

//     console.log("Join Event Handler Called");
//     console.log(id);
//     if (id == "1") {
//       setInProject1(true);
//     } else if (id == "2") {
//       setInProject2(true);
//     } else if (id == "3") {
//       setInProject3(true);
//     }
//     fetch("/join_project", {
//       method: "POST",
//       body: formData,
//     })
//       .then((response) =>
//         response.json().then((data) => {
//           console.log(data);
//           setShowNotification(true);
//           setNotification(data["message"]);
//         })
//       )
//       .catch((error) => console.log(error));
//   }
//   function showNotificationModal() {
//     setShowNotification(!showNotification);
//   }
//   if (!inProject1 && !inProject2 && !inProject3) {
//     return (
//       <>
//         <NotiModal
//           show={showNotification}
//           type="Message"
//           noti={notification}
//           handleClose={showNotificationModal}
//         />
//         <NavBar joinHandler={joinHandler} />
//         <div className="center-container">
//           <div className="center text-center m-5">
//             <h1>You have no projects. Join or Create One</h1>
//           </div>
//         </div>
//       </>
//     );
//   } else {
//     return (
//       <>
//         <NotiModal
//           show={showNotification}
//           type="Message"
//           noti={notification}
//           handleClose={showNotificationModal}
//         />
//         <NavBar joinHandler={joinHandler} />

//         {inProject1 ? (
//           <ProjectBox
//             id="1"
//             projName="Test Project"
//             hw1SetAmount="100"
//             hw2SetAmount="100"
//             leaveHandler={leaveHandler}
//           />
//         ) : null}
//         {inProject2 ? (
//           <ProjectBox
//             id="2"
//             projName="Test Project 2"
//             hw1SetAmount="100"
//             hw2SetAmount="100"
//             leaveHandler={leaveHandler}
//           />
//         ) : null}
//         {inProject3 ? (
//           <ProjectBox
//             id="3"
//             projName="Test Project 3"
//             hw1SetAmount="100"
//             hw2SetAmount="100"
//             leaveHandler={leaveHandler}
//           />
//         ) : null}
//       </>
//     );
//   }
// }
// export default App;
