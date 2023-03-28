import React from "react";
import HwSets from "./hwSets";

function ProjectBox(props) {
  const id_num = props.id;

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
              hw1SetAmount={props.hw1SetAmount}
              hw2SetAmount={props.hw2SetAmount}
              inProject={props.inProject}
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default ProjectBox;
