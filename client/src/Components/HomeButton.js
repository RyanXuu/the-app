import React from "react";

import { useNavigate } from "react-router-dom";

import "./Components.css";

const HomeButton = () => {

  let navigate = useNavigate();

  return (
    <div style={{padding: "30px"}}>
      <button className="Button" onClick={() => {navigate("/")}}>Home</button>
    </div>
  );
}

export default HomeButton;