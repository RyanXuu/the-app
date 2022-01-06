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
            default: 
              console.log("rip");
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
      default: 
        console.log("rip");
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
        listId: listId,
        isOpen: true
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
        default: 
          console.log("rip");
          break;
      }
    }).catch(err => console.log(err));
    
  };  

  const handleUpdate = (id, task, listId) => {
    const newArray = getList(listId);
    const index = newArray.findIndex(todo => todo.id === id)
    newArray[index].task = task;
    setList(listId, newArray);
  }

  const handleDelete = (id, index, listId) => {
    console.log("id: " + id + " index: " + index + " listId: " + listId)
    ApiClient.deleteTask(id, index, listId);

    let newArray = [];
    switch(listId) {
      case 1:
        newArray = [...toCompleteList];
        break;
      case 2:
        newArray = [...todaysList];
        break;
      case 3:
        newArray = [...completedList];
        break;
      default: 
        console.log("rip");
        break;
    }

    newArray = [...newArray.filter(todo => todo.id !== id)];
    console.log(newArray[0]);
    for (let i = 0; i < newArray.length; i++) {
      if (newArray[i].indexCol > index) {
        newArray[i].indexCol--;
      }
    }
    setList(listId, newArray);
  }
  
  const handleShift = (id, direction, listId) => {

    let newArray = [];
    console.log(listId);
    switch(listId) {
      case 1:
        newArray = [...toCompleteList];
        break;
      case 2:
        newArray = [...todaysList];
        break;
      case 3:
        newArray = [...completedList];
        break;
      default: 
        console.log("rip");
        break;
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
        newArray[current - 1].indexCol++;
        newArray[current].isOpen = false;
        newArray[current - 1].isOpen = false;
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
        newArray[current].indexCol++;
        newArray[current + 1].indexCol--;
        console.log(newArray);
        for (let i = 0; i < newArray.length; i++) {
          newArray[i].isOpen = false;
        }
        console.log(newArray);
      }
    }

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
      default: 
        console.log("rip");
        break;
    }
  }

  const handleSideShift = (id, direction, listId) => {

    let doShift = true;
    let list = [];

    switch(listId) {
      case 1:
        if (direction === "moveLeft") {
          console.log("no such thing as list 0!");
          doShift = false;
          break;
        }
        list = [...toCompleteList];
        break;

      case 2:
        list = [...todaysList];
        break;

      case 3:
        if (direction === "moveRight") {
          console.log("no such thing as list 4!");
          doShift = false;
          break;
        }
        list = [...completedList];
        break;

      default: 
        console.log("rip");
        break;
    }

    if (doShift) {
      let otherListId = listId;
 
      direction === "moveLeft" ? otherListId-- : otherListId++;

      const index = list.findIndex(todo => todo.id === id);
      const todo = list[index];
      list.splice(index, 1);
      for (let i = index; i < list.length; i++) { 
        list[i].indexCol--;
      }


      const otherList = getList(otherListId);
      todo.listId = otherListId;
      
      ApiClient.updateListId(id, index, listId, otherListId, otherList.length)

      if (index > otherList.length - 1) {
        todo.indexCol = otherList.length;
        otherList.push(todo);
      }
      else {
        for (let i = index; i < otherList.length; i++) {
          otherList[i].indexCol++;
        }
        otherList.splice(index, 0, todo);
      }
      
      for (let i = 0; i < list.length; i++) {
        list[i].isOpen = false;
      }
      for (let i = 0; i < otherList.length; i++) {
        otherList[i].isOpen = false;
      }
      

      setList(listId, list);
      setList(otherListId, otherList);
    }
  }

  const updateSwitch = (action, id, task, listId) => {
    console.log(action, id, task, listId)
    switch(action) {
      
      case "add":
        createNewTask(listId);
        break;

      case "update":
        handleUpdate(id, task, listId);
        break;

      case "delete":
        handleDelete(id, task, listId);
        break;

      case "moveUp":
        handleShift(id, "moveUp", listId);
        break;

      case "moveDown":
        handleShift(id, "moveDown", listId);
        break;
      
      case "moveLeft":
        handleSideShift(id, "moveLeft", listId);
        break;

      case "moveRight":
        handleSideShift(id, "moveRight", listId);
        break;

      default: 
        console.log("rip");
        break;
    }
  }

  const getList = (listId) => {
    let list = []
    switch(listId) {
      case 1:
        list = [...toCompleteList];
        break;
      case 2:
        list = [...todaysList];
        break;
      case 3:
        list = [...completedList];
        break;
      default: 
        console.log("rip");
        break;
    }

    return list;
  }

  const setList = (listId, newArray) => {
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
      default: 
        console.log("rip");
        break;
    }
  }
 

  return (
    <div>
      <HomeButton />
      <div className="Header">
        <h1 className="Title" style={{padding: 0}}>the To-Do List</h1>
      </div>

      <button onClick={(e) => console.log(toCompleteList)}>1</button>
      <button onClick={(e) => console.log(todaysList)}>2</button>
      <button onClick={(e) => console.log(completedList)}>3</button>

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