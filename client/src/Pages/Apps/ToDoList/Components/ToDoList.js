import React from "react";

import ToDo from "./ToDo";


const ToDoList = ({data, updateState}) => {

  const handleUpdate = (action, id, task, listId) => {
    updateState(action, id, task, listId);
  };

  return (
    <div>
      {data.map((todo) => 
        <ToDo todo={todo} updateState={handleUpdate} />   
      )}
    </div>
  );
}

export default ToDoList;