import Axios from 'axios';

export const createNewTask = () => {
  Axios.post('http://localhost:3001/api/insert')
};

export const deleteTask = (id) => {
  Axios.delete(`http://localhost:3001/api/delete/${id}`);
}

export const getTasks = () => {
  return(Axios.get('http://localhost:3001/api/get'));
};

export const updateTask = () => {
  Axios.put('http://localhost:3001/api/update');
}