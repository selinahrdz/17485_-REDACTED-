import React from "react";
import HwSets from "./hwSets";

function ProjectBox(props) {
  const id_num = props.id;
  let Availability1 = 0;
  let Availability2 = 0;

  function initializeHWSet1() {
    const formData2 = new FormData();
    formData2.append("Set_Name", "set1");
    formData2.append("qty", 0);
    formData2.append("Access-Control-Allow-Origin", "http://localhost:5000");
    formData2.append("Access-Control-Allow-Credentials", "true");

    fetch("http://localhost:5000/check_out_Hw", {
      method: "POST",
      body: formData2,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        Availability1 = Number(data["Availability"]);
      })
      .catch((error) => console.log(error));

    return Availability1;
  }

  function initializeHWSet2() {
    const formData2 = new FormData();
    formData2.append("Set_Name", "set1");
    formData2.append("qty", 0);
    formData2.append("Access-Control-Allow-Origin", "http://localhost:5000");
    formData2.append("Access-Control-Allow-Credentials", "true");

    fetch("http://localhost:5000/check_out_Hw", {
      method: "POST",
      body: formData2,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        Availability2 = Number(data["Availability"]);
      })
      .catch((error) => console.log(error));

    return Availability2;
  }

  return (
    <>
      <div className="container card mt-2 pt-0 pr-5">
        <div className="row card-body">
          <div className="col-md-auto mt-5">
            <h3 className="">{props.projName}</h3>
            <p className="">Project ID: {props.id}</p>

            <button
              type="button"
              className="btn btn-danger"
              onClick={() => props.leaveHandler(id_num)}
            >
              Leave Project
            </button>
          </div>

          <div className="col-sm">
            <HwSets
              id={props.id}
              type="button"
              projName={props.projName}
              hw1SetAmount={Availability1}
              hw2SetAmount={Availability2}
              inProject={props.inProject}
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default ProjectBox;
