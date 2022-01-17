import React from "react";
import "./Pages.css";

import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";

function MainMenu() {
  let navigate = useNavigate();

  return (
    <div className="App">
      <div>
        <h1 className="Home-title">theAPP</h1>
      </div>

      <Stack className="Home-menu">
        <header className="App-header">
          <button
            className="Menu-button"
            onClick={() => {
              navigate("/Calendar");
            }}
          >
            Calendar
          </button>
          <button
            className="Menu-button"
            onClick={() => {
              navigate("/ToDoList");
            }}
          >
            To-Do List
          </button>
          <br></br>
          <br></br>
          {/* <button className="Menu-button">Daily Schedule Tracker</button> */}
        </header>
      </Stack>
    </div>
  );
}

export default MainMenu;
