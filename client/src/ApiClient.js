import Axios from 'axios';

export const createNewTask = () => {
  Axios.post('http://localhost:3001/api/insert')
};

export const getTasks = () => {
  return(Axios.get('http://localhost:3001/api/get/all'));
};

export const getLargestId = () => {
  return(Axios.get('http://localhost:3001/api/get/max'));
}

export const deleteTask = (id) => {
  Axios.delete(`http://localhost:3001/api/delete/${id}`);
};

export const updateTask = (id, task) => {
  Axios.put('http://localhost:3001/api/update', {
    id: id,
    task: task
  });
};