import React, { useState, useEffect } from 'react';

const PopupForm = ({ currentTask, onSubmit, onClose }) => {
    const [taskText, setTaskText] = useState('');

    useEffect(() => {
        if (currentTask) {
            setTaskText(currentTask.title);
        }
    }, [currentTask]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskText.trim() === '') return;
        onSubmit(taskText);
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>{currentTask ? 'Update Task' : 'New Task'}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={taskText}
                        onChange={(e) => setTaskText(e.target.value)}
                        placeholder="Enter task title"
                        required
                    />
                    <div className="form-buttons">
                        <button type="submit">{currentTask ? 'Update Task' : 'Save Task'}</button>
                        <button type="button" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PopupForm;