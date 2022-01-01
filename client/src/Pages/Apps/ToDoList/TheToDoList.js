import React, { useEffect, useState } from "react";

import * as ApiClient from "../../../ApiClient";
import HomeButton from "../../../Components/HomeButton";
import ListContainer from "./Components/ListContainer";
import data from "./data.json";

import "./ToDoList.css";

const TheToDoList = () => {

  const [toCompleteList, setToCompleteList] = useState([]);

  useEffect(() => {
    ApiClient.getTasks().then((response) => {
      console.log(response);
      const sortedList = response.data.sort((a, b) => a.indexCol - b.indexCol);
      console.log(sortedList);
      setToCompleteList(sortedList);
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
  
  const handleShift = (id, direction) => {

    var current = -1;
    for (let i = 0; i < toCompleteList.length; i++) {
      if (toCompleteList[i].id === id) {
        current = i;
      }
    }

    const newArray = [...toCompleteList];
    const temp = newArray[current];
    
    if (direction === "moveUp") {
      if (current === 0) {
        console.log("first element!")
      }
      else {
        ApiClient.swapTaskIndex(newArray[current].id, newArray[current - 1].id, current, current - 1);
        newArray[current] = newArray[current - 1];
        newArray[current - 1] = temp;
        newArray[current].isOpen = 0;
        newArray[current - 1].isOpen = 1;
      }   
    }

    else {
      if (current === toCompleteList.length - 1) {
        console.log("last element!")
      }
      else {
        ApiClient.swapTaskIndex(newArray[current].id, newArray[current + 1].id, current, current + 1);
        newArray[current] = newArray[current + 1];
        newArray[current + 1] = temp;
        newArray[current].isOpen = 0;
        newArray[current + 1].isOpen = 1;
      }
    }

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

      case "moveUp":
        handleShift(id, "moveUp");
        break;

      case "moveDown":
        handleShift(id, "moveDown");
        break;
    }
  }
 

  return (
    <div>
      <HomeButton />
      <div className="Header">
        <h1 className="Title" style={{padding: 0}}>the To-Do List</h1>
      </div>

      <button onClick={(e) => console.log(toCompleteList)}>a</button>

      <div className="To-Do-Lists">
        <div>
          <ListContainer 
            listName={"TO COMPLETE"}
            data={toCompleteList}
            updateState={updateSwitch}
          />
        </div>
        <div>
        <ListContainer 
            listName={"FOR TODAY"}
            data={data}
            updateState={updateSwitch}
          />
        </div>
        <div>
        <ListContainer 
            listName={"COMPLETED"}
            data={data}
            updateState={updateSwitch}
          />
        </div>
      </div>
    </div>
  );
}

export default TheToDoList;