import NotiModal from "./notiModal";
import React, { useState, useRef } from "react";

function HwSets(props) {
  //Keeping Track of The Current Count
  const [HWSet1Data, setHWSet1Data] = useState(0);
  const [HWSet2Data, setHWSet2Data] = useState(0);

  //For Modal Notification
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState("");

  const hw1Input = useRef();
  const hw2Input = useRef();

  function checkInHW1(e) {
    const input = hw1Input.current.value;
    console.log(input);

    const formData = new FormData();
    formData.append("Set_name", "set1");
    formData.append("qty", input);

    fetch("http://localhost:5000/check_in_Hw", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
      alert(data["message"]);
        console.log(data);
        setShowNotification(true);
        setNotification(data["message"]);
        setHWSet1Data(Number(data["Availability"]));
      })
      .catch((error) => console.log(error));

    hw1Input.current.value = null;
  }

  function checkInHW2(e) {
    const input = hw2Input.current.value;
    console.log(input);

    const formData = new FormData();
    formData.append("Set_Name", "set2");
    formData.append("qty", input);

    fetch("http://localhost:5000/check_in_Hw", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setShowNotification(true);
        setNotification(data["message"]);
        if(data["message"] == ("success")){
        setHWSet2Data(Number(data["Availability"]));

      })
      .catch((error) => console.log(error));
    hw2Input.current.value = null;
  }

  function checkOutHW1(e) {
    const input = hw1Input.current.value;
    console.log(input);

    const formData = new FormData();
    formData.append("Set_Name", "set1");
    formData.append("qty", input);

    fetch("http://localhost:5000/check_out_Hw", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
      alert(data["message"]);
        console.log(data);
        setShowNotification(true);
        setNotification(data["message"]);
        setHWSet1Data(Number(data["Availability"]));
      })
      .catch((error) => console.log(error));


    hw1Input.current.value = null;
  }

  function checkOutHW2(e) {
    const input = hw2Input.current.value;
    console.log(input);

    const formData = new FormData();
    formData.append("Set_Name", "set2");
    formData.append("qty", input);

    fetch("http://localhost:5000/check_out_Hw", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setShowNotification(true);
        setNotification(data["message"]);
        setHWSet2Data(Number(data["Availability"]));
      })
      .catch((error) => console.log(error));

    hw2Input.current.value = null;
  }
  function showNotificationModal() {
    setShowNotification(!showNotification);
  }

  return (
    <>
      <NotiModal
        show={showNotification}
        type="Message"
        noti={notification}
        handleClose={showNotificationModal}
      />
      <form className="container m-5">
        <div className="form-row align-items-center">
          <div className="col d-flex justify-content-center col-auto m-2">
            <h5>Hardware Set 1: {HWSet1Data}/100</h5>
            <input
              type="number"
              className="form-control mb-2 "
              placeholder="HW1 QTY"
              required
              ref={hw1Input}
            />
            <button
              className="btn btn-primary m-2"
              onClick={checkInHW1}
              type="button"
            >
              Check In
            </button>
            <button
              className="btn btn-primary m-2"
              onClick={checkOutHW1}
              type="button"
            >
              Check Out
            </button>
          </div>
          <div className="col d-flex justify-content-center m-2">
            <h5>Hardware Set 2: {HWSet2Data}/100</h5>
            <input
              type="number"
              className="form-control mb-2"
              placeholder="HW2 QTY"
              required
              ref={hw2Input}
            />
            <button
              className="btn btn-primary m-2"
              onClick={checkInHW2}
              type="button"
            >
              Check In
            </button>
            <button
              className="btn btn-primary m-2"
              onClick={checkOutHW2}
              type="button"
            >
              Check Out
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default HwSets;
