import React from "react";

import "../ToDoList.css";

const ToDo = ({todo}) => {
  return (
    <div className="ToDo">
      {todo.task}
    </div>
   
  );
};

export default ToDo;