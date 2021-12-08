import React from "react";

import "../ToDoList.css";

const ToDo = ({todo}) => {
  return (
    <div className="Card">
      {todo.task}
    </div>
   
  );
};

export default ToDo;