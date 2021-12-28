import React from "react";
import { Droppable } from "react-beautiful-dnd";

import * as ApiClient from "../../../../ApiClient";
import ToDoList from "./ToDoList";

const ListContainer = ( {listId, data, updateState} ) => {

  const addTask = () => {
    updateState("add", null, null);
  }

  const handleUpdate = (action, id, task) =>  {
    updateState(action, id, task);
  }

  return(
    <div>
      <h2 className = "Subtitle">TO COMPLETE</h2>
            <ToDoList listId ={1} data={data} updateState={handleUpdate}/>
            <button className="Add-Task" onClick={addTask}>+</button>
    </div>
  )
}

export default ListContainer;