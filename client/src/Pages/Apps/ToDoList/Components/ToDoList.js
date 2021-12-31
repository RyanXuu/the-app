import React from "react";

import ToDo from "./ToDo";


const ToDoList = ({data, updateState}) => {

  const handleUpdate = (action, id, task) => {
    updateState(action, id, task);
  };


  return (
    <div>
      {data.map((todo, index) => 
        <ToDo todo={todo} updateState={handleUpdate} index={index}/>   
      )}
    </div>
  );
}

export default ToDoList;