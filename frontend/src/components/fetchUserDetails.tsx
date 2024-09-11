import axios from 'axios';
import React, { useEffect, useState } from 'react';

// Define a type for the task
interface Task {
    _id: string;
    title: string;
    description: string;
    status: string;
}

interface FetchUserDetailsProps {
    shouldFetch: boolean;
}

const BASE_URL = process.env.REACT_APP_BASE_URL;

function FetchUserData({ shouldFetch }: FetchUserDetailsProps) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1); //current page
    const [totalPages, setTotalPages] = useState<number>(1); // total pages
    const limit = 10; // number of tasks per page

    const fetchTasks = async (page: number) => {
        try {
            const tokenResponse = await axios.get(`${BASE_URL}/token`);
            const token = tokenResponse.data.token;

            // Store the token in localStorage
            localStorage.setItem('authToken', token);

            const tasksResponse = await axios.get(`${BASE_URL}/tasks`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    page,
                    limit
                }
            });

            const { data, totalPages } = tasksResponse.data; 
            setTasks(data);
            setTotalPages(totalPages);
        } catch (err: any) {
            setError('Failed to fetch data');
            console.error('Fetch error', err);
        }
    };

    useEffect(() => {
        fetchTasks(currentPage);
    }, [shouldFetch, currentPage]);

    const handleDelete = async (id: string) => {
        try {
            const token = localStorage.getItem('authToken');
            await axios.delete(`${BASE_URL}/tasks/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                } 
            });
             if (tasks.length === 1 && currentPage > 1) {
                setCurrentPage(currentPage - 1);
            } else {
                fetchTasks(currentPage);
            }
            setTasks(tasks.filter(task => task._id !== id));
        } catch (err: any) {
            console.error('Failed to delete task:', err);
            setError('Failed to delete task.');
        }
    };

    const handleUpdate = async (id: string) => {
        const updatedTask = prompt('Enter new title, description and status (comma-separated):');
        if (!updatedTask) return;

        const [title, description, status] = updatedTask.split(',');

        try {
            const token = localStorage.getItem('authToken');
            await axios.put(`${BASE_URL}/tasks/${id}`, { title, description }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setTasks(tasks.map(task => task._id === id ? { ...task, title, description,status } : task));
        } catch (err: any) {
            console.error('Failed to update task:', err);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div>
            <h1>List of Tasks</h1>
            {error && <p>{error}</p>}
            <table border={3}>
                <thead>
                    <tr>
                        <th>Sr No.</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, index) => (
                        <tr key={task._id}>
                            <td>{(currentPage - 1) * limit + index + 1}</td>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>{task.status}</td>
                            <td>
                                <button style={{backgroundColor:"#f44336", color:"white"}} onClick={() => handleDelete(task._id)}>Delete</button>
                                <button style={{backgroundColor:"#04AA6D", color:"black"}} onClick={() => handleUpdate(task._id)}>Update</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <button onClick={handlePreviousPage} disabled={currentPage === 1}> &laquo; Previous</button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next &raquo;</button>
        </div>
    );
}

export default FetchUserData;
