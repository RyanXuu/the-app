import React, { useEffect, useState } from "react";

import * as ApiClient from "../../../../ApiClient";

import garbage from "../Images/garbage.png";
import arrow from "../Images/arrow.png";
import "../new.css";

const ToDo = ({todo, updateState}) => {

  
  const [isOpen, setIsOpen] = useState(todo.isOpen);
  const [updateBar, setUpdateBar] = useState("");

  useEffect(() => {
    setIsOpen(todo.isOpen);
  }, [todo.isOpen])

  const openOrClose = () => {
    setIsOpen(!isOpen);
  };

  const updateTask = (updatedTask) => {
    ApiClient.updateTask(todo.id, updatedTask);
    updateState("update", todo.id, updatedTask, null);
    setUpdateBar("");
    setIsOpen(false);
  };

  const handleDelete = () => {
    updateState("delete", todo.id, todo.indexCol, todo.listId);
    setIsOpen(false);
    setUpdateBar("");
  };

  const handleRearrange = (direction) => {
    if (direction === "Up") {
      updateState("moveUp", todo.id, null, todo.listId);
    }
    else {
      updateState("moveDown", todo.id, null, todo.listId);
    }
  }
  

  return (
    <div className={"Todo"}>
        {isOpen ? 
          <div className="Open-Card"> 
            <div style={{display: "flex"}}>
              <div className= {"Arrows"}>
                <button className={"Move-Up"} onClick={(e) => handleRearrange("Up")}><img className={"Up-Arrow"} src={arrow} /></button>
                <button className={"Move-Down"} onClick={(e) => handleRearrange("Down")}><img className={"Arrow"} src={arrow} /></button>
                
              </div>
              <input 
                type="text" 
                className="Update-Task"
                id={todo.id} 
                onChange={(e) => {setUpdateBar(e.target.value)}}
                onKeyUp={(e) => {if (e.key === "Enter") { updateTask(updateBar) }}}
                onClick={(e) => {setUpdateBar(e.target.value)}}
                defaultValue={todo.task}>
              </input>
            </div>
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
   
  );
};

export default ToDo;