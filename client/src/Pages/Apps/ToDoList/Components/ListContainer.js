import React from "react";

import ToDoList from "./ToDoList";
import "../ToDoList.css";

const ListContainer = ( {listId, listName, data, updateState} ) => {

  const addTask = () => {
    updateState("add", null, null, listId);
  }

  const handleUpdate = (action, id, task, listId) =>  {
    updateState(action, id, task, listId);
  }

  return(
    <div>
      <h2 className = "text-center">{listName}</h2>
      <ToDoList data={data} updateState={handleUpdate} />
      <button className="Add-Task" onClick={addTask}>+</button>
    </div>
  )
}

export default ListContainer;