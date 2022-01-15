import React, { useEffect, useState } from "react";

import * as ApiClient from "../../../../ApiClient";

import garbage from "../Images/garbage.png";
import arrow from "../Images/arrow.png";
import "../ToDoList.css";

const ToDo = ({todo, updateState}) => {

  
  const [isOpen, setIsOpen] = useState(todo.isOpen);
  const [updateBar, setUpdateBar] = useState("");

  useEffect(() => {
    setIsOpen(todo.isOpen);
  }, [todo]);

  const updateTask = (updatedTask) => {
    ApiClient.updateTask(todo.id, updatedTask);
    updateState("update", todo.id, updatedTask, todo.listId);
    setUpdateBar("");
    setIsOpen(false);
  };

  const handleDelete = () => {
    updateState("delete", todo.id, todo.indexCol, todo.listId);
    setIsOpen(false);
    setUpdateBar("");
  };

  const handleRearrange = (direction) => {
    switch(direction) {
      case "Up":
        updateState("moveUp", todo.id, null, todo.listId);
        break;
      case "Down":
        updateState("moveDown", todo.id, null, todo.listId);
        break;
      case "Left":
        updateState("moveLeft", todo.id, null, todo.listId);
        break;
      case "Right":
        updateState("moveRight", todo.id, null, todo.listId);
        break;
      default:
        console.log("rip");
    }
    setIsOpen(false);
  }
  

  return (
    <div className="Todo">
        {isOpen ? 
          <div className="Open-Card"> 
            <div style={{display: "flex"}}>
              <div className= {"Arrows"}>
                <button className={"Move-Up"} onClick={(e) => handleRearrange("Up")}><img className={"Up-Arrow"} src={arrow} alt="move up"/></button>
                <button className={"Move-Down"} onClick={(e) => handleRearrange("Down")}><img className={"Arrow"} src={arrow} alt="move down"/></button>
                
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
            <div>
              <button className="Move-Left" onClick={(e) => handleRearrange("Left")}>
                <img className="Left-Arrow" src={arrow} alt="move left" height={35}/>
              </button>
              <button className="Move-Right" onClick={(e) => handleRearrange("Right")}>
                <img className="Right-Arrow" src={arrow} alt="move right" height={35}/>
              </button>
              <button className="Delete-Task" onClick={handleDelete}>
                <img src={garbage} alt="delete" height={30}/>
              </button>
            </div>
            
          </div>  
          :
          <div>
            <button className={`${todo.task == null ? "Empty-Card" : "Closed-Card"}`} onClick={(e) => setIsOpen(true)}> 
              {todo.task == null ? 'Untitled' : todo.task}    
            </button>    
          </div>
        }
    </div>
   
  );
};

export default ToDo;