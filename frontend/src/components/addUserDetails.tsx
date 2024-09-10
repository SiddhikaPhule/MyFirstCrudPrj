// AddUserDetails.tsx
import React, { useState } from 'react';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

function AddUserDetails() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('to do');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        try {
            // Retrieve the token from localStorage
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No token found');
            }

            // Send the request with the token in headers
            const response = await axios.post(
                `${BASE_URL}/addUser`,
                { title, description, status },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            console.log('User Created:', response.data);
            alert('Data inserted successfully');
            setTitle('');
            setDescription('');
            setStatus('to do');
        } catch (err: any) {
            setError('Failed to add user');
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Add User</h1>
            <div id='formElement'>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='title'>Title</label>
                    <input
                        id='title'
                        placeholder='Enter title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <br /><br />
                    <label htmlFor='description'>Description</label>
                    <textarea
                        id='description'
                        placeholder='Enter your text here'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <br /><br />
                    <label htmlFor='status'>Status</label>
                    <select
                        id='status'
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value='to do'>To Do</option>
                        <option value='pending'>Pending</option>
                        <option value='completed'>Completed</option>
                    </select>
                    <br /><br />
                    <button type='submit'>Add Task</button>
                    {error && <p className="text-danger mt-3">{error}</p>}
                </form>
            </div>
        </div>
    );
}

export default AddUserDetails;
