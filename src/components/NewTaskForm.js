import React, { useState, useEffect } from 'react';

const PopupForm = ({ currentTask, onSubmit, onClose }) => {
    const [taskText, setTaskText] = useState('');

    useEffect(() => {
        if (currentTask) {
            setTaskText(currentTask.title); // Pre-fill form if updating a task
        } else {
            setTaskText(''); // Clear form when creating a new task
        }
    }, [currentTask]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskText.trim() === '') return; // Prevent submission of empty task

        onSubmit(taskText); // Call the function to add/update task
        setTaskText('');
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-xl font-bold mb-4">
                    {currentTask ? 'Update Task' : 'New Task'}
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={taskText}
                            onChange={(e) => setTaskText(e.target.value)}
                            placeholder="Enter task"
                            required
                            className="w-full border border-gray-300 rounded-md py-2 px-3"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                        >
                            {currentTask ? 'Update Task' : 'Save Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PopupForm;