import React, {useState} from "react";

import ToDo from "./ToDo";


const ToDoList = ({data}) => {

  const [ toDoList , setToDoList ] = useState(data);

  return (
    <div>
      {toDoList.map(todo => {
        return (
          <ToDo todo={todo}/>
        )
      })}
    </div>
  );
}

export default ToDoList;