import React, { useEffect, useState } from "react";

import ToDo from "./ToDo";

import * as ApiClient from "../../../../ApiClient"; 



const ToDoList = ({data, updateState}) => {

  const handleUpdate = (action, id, task) => {
    updateState(action, id, task);
  };


  return (
    <div>
      {data.map(todo => {
        return (
          <ToDo todo={todo} updateState={handleUpdate}/> 
        )
      })}
      
    </div>
  );
}

export default ToDoList;