import React from "react";

import ToDoList from "./ToDoList";

const ListContainer = ( {listName, data, updateState} ) => {

  const addTask = () => {
    updateState("add", null, null);
  }

  const handleUpdate = (action, id, task) =>  {
    updateState(action, id, task);
  }

  return(
    <div>
      <h2 className = "Subtitle">{listName}</h2>
      <ToDoList data={data} updateState={handleUpdate} />
      <button className="Add-Task" onClick={addTask}>+</button>
    </div>
  )
}

export default ListContainer;