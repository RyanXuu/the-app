import React, { useState } from "react";

import * as ApiClient from "../../../../ApiClient";

import garbage from "../Images/garbage.png";
import arrow from "../Images/arrow.png";
import "../new.css";

const ToDo = ({todo, updateState, index}) => {

  
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
    <div className={"Todo"}>
      <div className= {"Arrows"}>
        <img className={"Up-Arrow"} src={arrow} />
        <img className={"Arrow"} src={arrow} />
      </div>
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
            <button className="Delete-Task" onClick={handleDelete}>
              <img src={garbage} 
                height={30}/>
            </button>
            
          </div>  
          :
          <div>
            <button className={`${todo.task == null ? "Empty-Card" : "Closed-Card"}`} onClick={openOrClose}> 
              {todo.task == null ? 'Untitled' : todo.task}    
            </button>    
          </div>
        }
      </div>
    </div>
   
  );
};

export default ToDo;