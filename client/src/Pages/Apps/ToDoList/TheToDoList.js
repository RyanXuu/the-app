import React, { useEffect, useState } from "react";
import { DragDropContext } from 'react-beautiful-dnd';

import * as ApiClient from "../../../ApiClient";
import HomeButton from "../../../Components/HomeButton";
import ListContainer from "./Components/ListContainer";
import data from "./data.json";

import "./ToDoList.css";

const TheToDoList = () => {

  const [toCompleteList, setToCompleteList] = useState([]);

  useEffect(() => {
    ApiClient.getTasks().then((response) => {
      setToCompleteList(response.data);;
    });
  }, []);

  const createNewTask = async () => { 
    const id = await ApiClient.createNewTask();
    const newArray = [...toCompleteList, {id: id, task: null, description: null}];
    setToCompleteList(newArray);
  };  

  const handleUpdate = (id, task) => {
    const index = toCompleteList.findIndex(todo => todo.id === id)

    const newArray = toCompleteList;
    newArray[index].task = task;

    setToCompleteList(newArray);
  }

  const handleDelete = (id) => {
    ApiClient.deleteTask(id);
    const newArray = toCompleteList.filter(todo => todo.id !== id);
    setToCompleteList(newArray);
  }

  const updateSwitch = (action, id, task) => {
    console.log(action, id, task)
    switch(action) {
      
      case "add":
        createNewTask();
        break;

      case "update":
        handleUpdate(id, task);
        break;

      case "delete":
        handleDelete(id);
        break;
    }
  }
  const onDragEnd = () => {}
 

  return (
    <div>
      <HomeButton />
      <div className="Header">
        <h1 className="Title" style={{padding: 0}}>the To-Do List</h1>
      </div>

      <div>
        
      </div> 
      <div className="To-Do-Lists">
        <DragDropContext onDragEnd={onDragEnd}>
          <div>
            <ListContainer 
              listId={1}
              data={toCompleteList}
              updateState={updateSwitch}
            />
          </div>
          <div>
          <ListContainer 
              listId={2}
              data={data}
              updateState={updateSwitch}
            />
          </div>
          <div>
          <ListContainer 
              listId={3}
              data={data}
              updateState={updateSwitch}
            />
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}

export default TheToDoList;