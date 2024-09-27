import React, { useState, useEffect } from 'react';

const TaskForm = ({ addTask, updateTask, currentTask, onClose }) => {
    const [formData, setFormData] = useState({
        assignedTo: '',
        status: '',
        dueDate: '',
        priority: '',
        comments: ''
    });

    useEffect(() => {
        if (currentTask) {
            setFormData({
                assignedTo: currentTask.assignedTo,
                status: currentTask.status,
                dueDate: currentTask.dueDate,
                priority: currentTask.priority,
                comments: currentTask.comments
            });
        }
    }, [currentTask]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentTask) {
            updateTask({ ...currentTask, ...formData });
        } else {
            addTask(formData);
        }
        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-4">{currentTask ? 'Edit Task' : 'New Task'}</h2>
            {['assignedTo', 'status', 'dueDate', 'priority', 'comments'].map((field, index) => (
                <div className="mb-4" key={index}>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field}>
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                        type={field === 'dueDate' ? 'date' : 'text'}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
            ))}
            <div className="flex items-center justify-between">
                <button 
                    type="submit" 
                    className="bg-[#ad193a] hover:bg-[#b65c70] text-white font-bold py-2 px-4  focus:outline-none focus:shadow-outline"
                >
                    Save Task
                </button>
                <button 
                    type="button" 
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4  focus:outline-none focus:shadow-outline"
                    onClick={onClose}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default TaskForm;