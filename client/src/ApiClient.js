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
  Axios.put('http://localhost:3001/api/update', {
    id: id,
    task: task
  });
};