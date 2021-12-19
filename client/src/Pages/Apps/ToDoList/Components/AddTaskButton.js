import React from 'react';
import Axios from 'axios';

import "../ToDoList.css";

const AddTaskButton = () => {

  const createNewTask = () => {
    Axios.post('http://localhost:3001/api/insert').then(() => {
      alert("successful insert");
    });
  }
  return(
    <div>
      <button className="Add-Task" onClick={createNewTask}>+</button>
    </div>
  )
  
}

export default AddTaskButton;