import React, { useState } from "react";

import HomeButton from "../../../Components/HomeButton";
import "./ToDoList.css";
import ToDoList from "./Components/ToDoList";
import data from "./data.json";

const TheToDoList = () => {

  return (
    <div>
      <HomeButton />
      <div className="Header">
        <h1 className="Title" style={{padding: 0}}>the To-Do List</h1>
      </div>

      <div>
        
      </div> 
      <div className="To-Do-Lists">
        <div>
          <h2 className = "Subtitle">TO COMPLETE</h2>
          <ToDoList data={data} />
        </div>
        <div>
          <h2 className = "Subtitle">FOR TODAY</h2>
          <ToDoList data={data} />
        </div>
        <div>
          <h2 className = "Subtitle">COMPLETED</h2>
          <ToDoList data={data} />
        </div>
      </div>
    </div>
  );
}

export default TheToDoList;