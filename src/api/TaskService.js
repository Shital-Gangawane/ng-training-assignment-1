import axios from 'axios';

const API_URL = "http://localhost:8000/tasks"; // Example API

export const getTasks = () => {
    return axios.get(API_URL);
};

export const addTask = (task) => {
    return axios.post(API_URL, task);
};


export const updateTask = (id, task) => {
    return axios.put(`${API_URL}/${id}`, task);
};

export const deleteTask = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};
