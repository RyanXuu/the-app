import { React, useNavigate } from "./index.js";
import "./Pages.css";
import { Stack } from "@mui/material";

function MainMenu() {
  let navigate = useNavigate();

  return (
    <div className="App">
      <div>
        <h1 className="Home-title">theAPP</h1>
      </div>

      <div className="Home-menu">
        <Stack className="App-header" spacing={2}>
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
        </Stack>
      </div>
    </div>
  );
}

export default MainMenu;
