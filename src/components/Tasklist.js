import React, { useState, useEffect } from 'react'; 
import TaskForm from './Taskform';
import { FaRectangleList } from "react-icons/fa6";
import { IoCaretDownOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa"; // Import search icon

const TaskList = ({ tasks, editTask, deleteTask, addTask, currentTask, updateTask }) => {
    const [showModal, setShowModal] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [searchQuery, setSearchQuery] = useState(""); // State for search query

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 5; // Adjust as needed

    useEffect(() => {
        if (currentTask) {
            setShowModal(true);
        } else {
            setShowModal(false);
        }
    }, [currentTask]);

    const handleAddTask = () => {
        setShowModal(true);
    };

    const handleDeleteTask = (task) => {
        setTaskToDelete(task);
        setShowConfirmDelete(true);
    };

    const confirmDelete = () => {
        deleteTask(taskToDelete.id);
        setShowConfirmDelete(false);
        setTaskToDelete(null);
    };

    const cancelDelete = () => {
        setShowConfirmDelete(false);
        setTaskToDelete(null);
    };

    const toggleDropdown = (taskId) => {
        setDropdownOpen(dropdownOpen === taskId ? null : taskId);
    };

    // Filter tasks based on search query
    const filteredTasks = tasks.filter(task => 
        task.assignedTo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.comments.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
    const startIndex = (currentPage - 1) * tasksPerPage;
    const currentTasks = filteredTasks.slice(startIndex, startIndex + tasksPerPage);

    // Pagination control functions
    const handleFirstPage = () => setCurrentPage(1);
    const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const handleLastPage = () => setCurrentPage(totalPages);

    return (
        <div className="bg-gray-100 container mx-auto p-4">
            <div className='flex justify-between'>
                <div className='flex flex-row'>
                    <FaRectangleList className='text-[#ad193a]' size={50}/> 
                    <div className='flex-row gap-0'>
                        <h5 className='ms-2 text-gray-500 font-medium'>Tasks</h5>
                        <p className='ms-2 text-gray-500'>All Tasks</p>
                    </div> 
                </div>

                <div className="flex justify-end mb-4">
                    <button
                        className={`bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4`}
                        type="button"
                        onClick={handleAddTask}
                    >
                        New Task
                    </button>
                    <button
                        className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4"
                        type="button"
                        onClick={() => window.location.reload()}
                    >
                        Refresh
                    </button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="flex justify-end ">
    <div className='relative bg-white  rounded-l border'> 
        <input
            type="text"
            placeholder="Search ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-2 pl-10 hover:border-none focus:border-none border-none" 
        />
        <span className="absolute end-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <FaSearch />
        </span>
    </div>
</div>


            <div className="w-full h-full mt-4">
                <table className="min-w-full max-w-full h-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th></th>
                            <th className="py-3 px-6 text-left">Assigned To</th>
                            <th className="py-3 px-6 text-left">Status</th>
                            <th className="py-3 px-6 text-left">Due Date</th>
                            <th className="py-3 px-6 text-left">Priority</th>
                            <th className="py-3 px-6 text-left">Comments</th>
                            <th className="py-3 px-6 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {currentTasks.map(task => (
                            <tr key={task.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <input className=" m-3 mt-4" type="checkbox" id="myCheckbox" name="myCheckbox" />
                                <td className="py-3 px-6 text-left">{task.assignedTo}</td>
                                <td className="py-3 px-6 text-left">{task.status}</td>
                                <td className="py-3 px-6 text-left">{task.dueDate}</td>
                                <td className="py-3 px-6 text-left">{task.priority}</td>
                                <td className="py-3 px-6 text-left">{task.comments}</td>
                                <td className="py-3 px-6 text-left relative">
                                    <button
                                        onClick={() => toggleDropdown(task.id)} 
                                        className="text-gray-500 hover:text-gray-600 font-bold py-1 px-3 rounded"
                                    >
                                        <IoCaretDownOutline size={15}/>
                                    </button>
                                    {dropdownOpen === task.id && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 shadow-lg z-10">
                                            <button
                                                onClick={() => editTask(task)} 
                                                className="block w-full text-left text-gray-600 hover:bg-gray-300 font-medium py-2 px-4"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteTask(task)} 
                                                className="block w-full text-left text-gray-600 hover:bg-gray-300 font-medium py-2 px-4"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-end mt-6 pt-6">
                <button 
                    onClick={handleFirstPage} 
                    className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 mx-1 rounded"
                    disabled={currentPage === 1}
                >
                    First
                </button>
                <button 
                    onClick={handlePrevPage} 
                    className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 mx-1 rounded"
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                <span className="flex items-center mx-1">
                    {currentPage} of {totalPages}
                </span>
                <button 
                    onClick={handleNextPage} 
                    className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 mx-1 rounded"
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
                <button 
                    onClick={handleLastPage} 
                    className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 mx-1 rounded"
                    disabled={currentPage === totalPages}
                >
                    Last
                </button>
            </div>

            {/* Confirmation Modal */}
            {showConfirmDelete && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white shadow-lg w-1/3">
                      
                        <h2 className="text-xl bg-red-500 text-center text-white py-2 font-semibold mb-4">Delete</h2>
                        <div className='p-4'>
                        <p>Are you sure you want to delete this task?</p>
                        <div className="flex justify-end mt-4">
                            <button 
                                onClick={confirmDelete} 
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4  mr-2"
                            >
                                Yes
                            </button>
                            <button 
                                onClick={cancelDelete} 
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 "
                            >
                                No
                            </button>
                        </div>
                        </div> 
                    </div>
                </div>
            )}

            {/* Task Form Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <TaskForm
                            addTask={addTask} 
                            updateTask={updateTask} 
                            currentTask={currentTask} 
                            onClose={() => {
                                setShowModal(false); 
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskList;