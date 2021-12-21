import React, {useState} from "react";

import * as ApiClient from "../../../../ApiClient";

import "../new.css";

const ToDo = ({todo}) => {

  const [isOpen, setIsOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const openOrClose = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  }

  const deleteTask = () => {
    ApiClient.deleteTask(todo.id);
    setIsDeleted(true);
  }
  
  return (
    <div>
      {isDeleted ? 
        <div></div>
        :
          isOpen ? 
          <div className="Open-Card"> 
            <input type="text" id="updateTask"></input>
            <button className="Delete-Task" onClick={deleteTask}>Delete</button>
            {console.log(todo.id)}
          </div>
          :
          <button className={`${todo.task == null ? "Empty-Card" :"Closed-Card"}`} onClick={openOrClose}> 
            {isOpen ? 'true' : 'false'} 
            {todo.task == null ? 'Untitled' : todo.task}    
          </button>    
      }
      
    </div>
   
  );
};
/** 
*/
export default ToDo;