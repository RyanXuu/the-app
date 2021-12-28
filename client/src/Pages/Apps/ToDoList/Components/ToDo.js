import React, { useState } from "react";

import * as ApiClient from "../../../../ApiClient";

import "../new.css";

const ToDo = ({todo, updateState}) => {

  
  const [isOpen, setIsOpen] = useState(false);
  const [updateBar, setUpdateBar] = useState("");

  const openOrClose = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  const updateTask = (updatedTask) => {
    ApiClient.updateTask(todo.id, updatedTask);
    updateState("update", todo.id, updatedTask);
    setUpdateBar("");
    setIsOpen(false);
  };

  const handleDelete = () => {
    updateState("delete", todo.id, null);
    setIsOpen(false);
    setUpdateBar("");
  };
  
  return (
    <div>
      {isOpen ? 
          <div className="Open-Card"> 
            <input 
              type="text" 
              className="Update-Task"
              id={todo.id} 
              onChange={(e) => {setUpdateBar(e.target.value)}}
              onKeyUp={(e) => {if (e.key === "Enter") { updateTask(updateBar) }}}
              onClick={(e) => {setUpdateBar(todo.task)}}
              defaultValue={todo.task}>
            </input>
            <button className="Delete-Task" onClick={handleDelete}>Delete</button>
          </div>
          :
          <button className={`${todo.task == null ? "Empty-Card" : "Closed-Card"}`} onClick={openOrClose}> 
            {todo.task == null ? 'Untitled' : todo.task}    
          </button>    
      }
    </div>
   
  );
};
/** 
*/
export default ToDo;