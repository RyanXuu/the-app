import React, { useState } from "react";

import * as ApiClient from "../../../../ApiClient";

import "../new.css";

const ToDo = ({todo}) => {

  const [isOpen, setIsOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [updateBar, setUpdateBar] = useState("");
  const [task, setTask] = useState(todo.task);

  const openOrClose = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  const updateTask = (updatedTask) => {
    ApiClient.updateTask(todo.id, updatedTask);
    setTask(updatedTask)
    setUpdateBar("");
    setIsOpen(false);
  };

  const deleteTask = () => {
    ApiClient.deleteTask(todo.id);
    setIsDeleted(true);
  };
  
  return (
    <div>
      {isDeleted ? 
        <div></div>
        :
          isOpen ? 
          <div className="Open-Card"> 
            <input 
              type="text" 
              className="Update-Task"
              id={todo.id} 
              onChange={(e) => {setUpdateBar(e.target.value)}}
              onKeyUp={(e) => {if (e.key === "Enter") { updateTask(updateBar) }}}
              defaultValue={todo.task}>
            </input>
            <button className="Delete-Task" onClick={deleteTask}>Delete</button>
          </div>
          :
          <button className={`${task == null ? "Empty-Card" : "Closed-Card"}`} onClick={openOrClose}> 
            {task == null ? 'Untitled' : task}    
          </button>    
      }
      
    </div>
   
  );
};
/** 
*/
export default ToDo;