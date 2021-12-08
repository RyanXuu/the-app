import React from "react";
import './Pages.css';

import { useNavigate } from "react-router-dom";

function MainMenu() {

  let navigate = useNavigate();

  return (
    <div className="App">
      <div className="Home-title">
        <h1>theAPP</h1>
      </div>
      <div className="Home-menu">
        <header className="App-header">
          <button className="Menu-button" onClick={() => {navigate("/ToDoList")}}>To-Do List</button>
          <br></br><br></br>
          {/* <button className="Menu-button">Daily Schedule Tracker</button> */}
        </header>
      </div>
    </div>
  );
}

export default MainMenu;