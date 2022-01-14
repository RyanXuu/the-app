import Axios from 'axios';

export const createNewTask = async (indexCol, listId) => {
  const response = await Axios.post('http://localhost:3001/api/insert', {
    indexCol: indexCol,
    listId: listId
  });
  return response.data.insertId;
};

export const getTasks = () => {
  return(Axios.get('http://localhost:3001/api/get/all'));
};

export const deleteTask = async (id, index, listId) => {
  await Axios.delete(`http://localhost:3001/api/delete/${id}`);
  await Axios.put('http://localhost:3001/api/update/decrementIndexes', {
    index: index,
    listId: listId
  });
};

export const updateTask = async (id, task) => {
  const res = await Axios.put('http://localhost:3001/api/update/task', {
    id: id,
    task: task
  })
}

export const swapTaskIndex = (id1, id2, index1, index2) => {
  Axios.put('http://localhost:3001/api/update/swapTaskIndex', {
    id1: id1,
    index1: index1,
    id2: id2,
    index2: index2
  })
}

export const updateListId = (id, index, listId, newListId, newListLength) => {
  console.log("bruh");
  Axios.put('http://localhost:3001/api/update/listId', {
    id: id,
    index: index,
    listId: listId,
    newListId: newListId,
    newListLength: newListLength
  })
}