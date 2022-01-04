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
  console.log(id, index, listId)
 
  const res = await Axios.delete(`http://localhost:3001/api/delete/${id}`);
  console.log("test " + res)
  const res2 = await Axios.put('http://localhost:3001/api/update/decrementIndexes', {
    index: index,
    listId: listId
  });
  console.log("test 2 " + res2);
};

export const updateTask = async (id, task) => {
  const res = await Axios.put('http://localhost:3001/api/update/task', {
    id: id,
    task: task
  });
  console.log("test " + res)
};

export const swapTaskIndex = (id1, id2, index1, index2) => {
  Axios.put('http://localhost:3001/api/update/swapTaskIndex', {
    id1: id1,
    index1: index1,
    id2: id2,
    index2: index2
  })
}