import React, { useEffect, useState } from "react";

import ToDo from "./ToDo";

import * as ApiClient from "../../../../ApiClient"; 


const ToDoList = ({data, updateList, deleteTask}) => {

  const handleUpdate = (id, task) => {
    updateList(id, task);
  };

  const handleDelete = (id) => {
    ApiClient.deleteTask(id);
    deleteTask(id);
  };


  return (
    <div>
      {data.map(todo => {
        return (
          <ToDo todo={todo} updateList={handleUpdate} deleteTask={handleDelete}/>
          
        )
      })}
    </div>
  );
}

export default ToDoList;