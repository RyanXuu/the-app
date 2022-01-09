import Axios from 'axios';

export const createNewTask = async (indexCol, listId) => {
  const response = await Axios.post('https://r-productivity-app.herokuapp.com//api/insert', {
    indexCol: indexCol,
    listId: listId
  });
  return response.data.insertId;
};

export const getTasks = () => {
  return(Axios.get('https://r-productivity-app.herokuapp.com//api/get/all'));
};

export const deleteTask = async (id, index, listId) => {
  await Axios.delete(`https://r-productivity-app.herokuapp.com//api/delete/${id}`);
  await Axios.put('https://r-productivity-app.herokuapp.com//api/update/decrementIndexes', {
    index: index,
    listId: listId
  });
};

export const updateTask = async (id, task) => {
  const res = await Axios.put('https://r-productivity-app.herokuapp.com//api/update/task', {
    id: id,
    task: task
  })
}

export const swapTaskIndex = (id1, id2, index1, index2) => {
  Axios.put('https://r-productivity-app.herokuapp.com//api/update/swapTaskIndex', {
    id1: id1,
    index1: index1,
    id2: id2,
    index2: index2
  })
}

export const updateListId = (id, index, listId, newListId, newListLength) => {
  console.log("bruh");
  Axios.put('https://r-productivity-app.herokuapp.com//api/update/listId', {
    id: id,
    index: index,
    listId: listId,
    newListId: newListId,
    newListLength: newListLength
  })
}