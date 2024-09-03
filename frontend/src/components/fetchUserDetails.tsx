import axios from 'axios'
import React, { useEffect, useState } from 'react'

function FetchUserData() {
    const [tasks, setTasks] = useState<any[]>([])
    const[error, setError]= useState<string |null>(null)

    useEffect(() => {
        const fetchTask = async () => {
            try{
                const response = await axios.get('http://localhost:3000/api/tasks')
                setTasks(response.data)
            }catch(err: any){
                setError('failed to fetch data')
                console.error('fetch error', err)
            }
        };
        fetchTask();
    }, []);

    const handleDelete = async (id: string) => {
        console.log(`Attempting to delete task with ID: ${id}`);
        try {
            const response = await axios.delete(`http://localhost:3000/api/tasks/${id}`);
            console.log('Delete response:', response.data);
            setTasks(tasks.filter(task => task._id !== id));
        } catch (err: any) {
            console.error('Failed to delete task:', err);
            setError('Failed to delete task.');
        }
    };

    const handleUpdate = async (id: string) => {
        const updatedTask = prompt('Enter new title and description (comma-separated):');
        if (!updatedTask) return;

        const [title, description] = updatedTask.split(',');

        try {
            await axios.put(`http://localhost:3000/api/tasks/${id}`, { title, description });
            setTasks(tasks.map(task => task._id === id ? { ...task, title, description } : task));
        } catch (err: any) {
            console.error('Failed to update task:', err);
        }
    };


    return (
        <div>
            <h1>List of tasks</h1>
            {error && <p>{error}</p>}
            <ul className="list-group">
                {tasks.map(task => (
                    <li key={task._id} className="list-group-item">
                        <h5>{task.title}</h5>
                        <p>{task.description}</p>
                        <p>Status: {task.status}</p>
                        <button onClick={() => handleDelete(task._id)}>Delete</button>
                        <button  onClick={() => handleUpdate(task._id)}>Update</button>

                    </li>
                ))}
            </ul>

        </div>
        );
}

export default FetchUserData;