import React, { useEffect, useState } from "react";

import * as ApiClient from "../../../ApiClient";
import HomeButton from "../../../Components/HomeButton";
import ListContainer from "./Components/ListContainer";

import "./ToDoList.css";

const TheToDoList = () => {

  const [toCompleteList, setToCompleteList] = useState([]);
  const [todaysList, setTodaysList] = useState([]);
  const [completedList, setCompletedList] = useState([]);

  useEffect(() => {
    ApiClient.getTasks().then((response) => {
      console.log(response);

      const data = response.data;
      const unsortedToCompleteList = []
      const unsortedTodaysList = []
      const unsortedCompletedList = []

      for (let i = 0; i < data.length; i++) {
          switch (data[i].listId) {
            case 1:
              unsortedToCompleteList.push(data[i]);
              break;
            case 2:
              unsortedTodaysList.push(data[i]);
              break;
            case 3: 
              unsortedCompletedList.push(data[i]);
              break;
          }
      }

      setToCompleteList(sortArray(unsortedToCompleteList));
      setTodaysList(sortArray(unsortedTodaysList));
      setCompletedList(sortArray(unsortedCompletedList));
    }).catch(err => console.log(err));
  }, []);

  const sortArray = (data) => {
      const sortedList = data.sort((a, b) => a.indexCol - b.indexCol);
      return sortedList;
  }

  const createNewTask = (listId) => { 
   
    
    let indexCol = 0;
    let existingTasks = []

    switch(listId) {
      case 1:
        indexCol = toCompleteList.length;
        existingTasks = [...toCompleteList];
        break;
      case 2:
        indexCol = todaysList.length;
        existingTasks = [...todaysList];
        break;
      case 3:
        indexCol = completedList.length;
        existingTasks = [...completedList];
        break;
    };
    console.log("index: " + indexCol + " list: " + listId);
    ApiClient.createNewTask(indexCol, listId).then(
      (response) => {

      console.log(response);  
      const newArray = [...existingTasks, {
        id: response,
        task: null, 
        description: null, 
        indexCol: indexCol,
        listId: listId
      }];
      
      switch(listId) {
        case 1:
          setToCompleteList(newArray);
          break;
        case 2:
          setTodaysList(newArray);
          break;
        case 3:
          setCompletedList(newArray);
          break;
      }
    }).catch(err => console.log(err));
    
  };  

  const handleUpdate = (id, task) => {
    console.log("id: " + id + " task: " + task)
    const index = toCompleteList.findIndex(todo => todo.id === id)

    const newArray = [...toCompleteList];
    newArray[index].task = task;

    setToCompleteList(newArray);
  }

  const handleDelete = (id, index, listId) => {
    console.log("id: " + id + " index: " + index + " listId: " + listId)
    ApiClient.deleteTask(id, index, listId);

    const newArray = [];
    switch(id) {
      case 1:
        newArray = [...toCompleteList];
      case 2:
        newArray = [...todaysList];
      case 3:
        newArray = [...completedList];
    }

    const newArray = [...newArray.filter(todo => todo.id !== id)];
    console.log(newArray[0]);
    for (let i = 0; i < newArray.length; i++) {
      if (newArray[i].indexCol > index) {
        newArray[i].indexCol--;
      }
    }
    setToCompleteList(newArray);
  }
  
  const handleShift = (id, direction) => {

    const newArray = [];
    switch(id) {
      case 1:
        newArray = [...toCompleteList];
      case 2:
        newArray = [...todaysList];
      case 3:
        newArray = [...completedList];
    }

    var current = -1;
    for (let i = 0; i < newArray.length; i++) {
      if (newArray[i].id === id) {
        current = i;
      }
    }

    
    const temp = newArray[current];
    
    if (direction === "moveUp") {
      if (current === 0) {
        console.log("first element!")
      }
      else {
        console.log(newArray)
        ApiClient.swapTaskIndex(newArray[current].id, newArray[current - 1].id, current, current - 1);
        newArray[current] = newArray[current - 1];
        newArray[current - 1] = temp;
        newArray[current].indexCol--;
        newArray[current -1].indexCol++;
      }   
    }

    else {
      if (current === newArray.length - 1) {
        console.log("last element!")
      }
      else {
        ApiClient.swapTaskIndex(newArray[current].id, newArray[current + 1].id, current, current + 1);
        newArray[current] = newArray[current + 1];
        newArray[current + 1] = temp;
        newArray[current].isOpen = 0;
        newArray[current + 1].isOpen = 1;
        newArray[current].indexCol++;
        newArray[current + 1].indexCol--;
      }
    }

    switch(id) {
      case 1:
        setToCompleteList(newArray);
      case 2:
        setTodaysList(newArray);
      case 3:
        setCompletedList(newArray);
    }
  }
  
  const updateSwitch = (action, id, task, listId) => {
    console.log(action, id, task, listId)
    switch(action) {
      
      case "add":
        createNewTask(listId);
        break;

      case "update":
        handleUpdate(id, task);
        break;

      case "delete":
        handleDelete(id, task, listId);
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
            listId={1}
            listName={"TO COMPLETE"}
            data={toCompleteList}
            updateState={updateSwitch}
          />
        </div>
        <div>
        <ListContainer 
            listId={2}
            listName={"FOR TODAY"}
            data={todaysList}
            updateState={updateSwitch}
          />
        </div>
        <div>
        <ListContainer 
            listId={3}
            listName={"COMPLETED"}
            data={completedList}
            updateState={updateSwitch}
          />
        </div>
      </div>
    </div>
  );
}

export default TheToDoList;