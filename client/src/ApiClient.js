import Axios from 'axios';

export const createNewTask = async () => {
  const response = await Axios.post('http://localhost:3001/api/insert');
  return response.data.insertId;
};

export const getTasks = () => {
  return(Axios.get('http://localhost:3001/api/get/all'));
};

export const deleteTask = (id) => {
  Axios.delete(`http://localhost:3001/api/delete/${id}`);
};

export const updateTask = (id, task) => {
  Axios.put('http://localhost:3001/api/update/task', {
    id: id,
    task: task
  });
};

export const swapTaskIndex = (id1, id2, index1, index2) => {
  Axios.put('http://localhost:3001/api/update/swapTaskIndex', {
    id1: id1,
    index1: index1,
    id2: id2,
    index2: index2
  })
}