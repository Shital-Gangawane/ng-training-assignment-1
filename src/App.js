import React, { useState, useEffect } from 'react';
import TaskList from './components/Tasklist';
import axios from 'axios';
import './App.css'; // Styling
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuidv4 } from 'uuid'; // Import uuid

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:8000/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            setError('Unable to load tasks. Try again later.');
        }
    };

    const addTask = async (newTask) => {
        const taskWithId = { id: uuidv4(), ...newTask }; // Ensure unique ID
        try {
            const response = await axios.post('http://localhost:8000/tasks', taskWithId);
            console.log('Task added:', response.data);
            setTasks([...tasks, response.data]);
        } catch (error) {
            console.error('Error adding task:', error);
            setError('Unable to add task. Try again.');
        }
    };

    const updateTask = async (updatedTask) => {
        try {
            const response = await axios.put(`http://localhost:8000/tasks/${updatedTask.id}`, updatedTask);
            console.log('Task updated:', response.data);
            setTasks(tasks.map(t => (t.id === updatedTask.id ? response.data : t)));
            setCurrentTask(null);
        } catch (error) {
            console.error('Error updating task:', error);
            setError('Unable to update task. Try again.');
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/tasks/${id}`);
            console.log('Task deleted:', id);
            setTasks(tasks.filter(task => task.id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
            setError('Unable to delete task. Try again.');
        }
    };

    const editTask = (task) => {
        setCurrentTask(task);
    };

    return (
        <div className="container pb-16">
            <h1 className='text-[#ad193a] font-bold py-4 text-center'>To-Do List Application</h1>
            {error && <div className="error">{error}</div>}
            <TaskList 
                tasks={tasks} 
                editTask={editTask} 
                deleteTask={deleteTask} 
                addTask={addTask} 
                currentTask={currentTask} 
                updateTask={updateTask} 
            />
        </div>
    );
};

export default App;