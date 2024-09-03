import React from 'react'
import { useState } from 'react';
import axios from 'axios';

function AddUserDetails() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('to do')
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post("http://localhost:3000/api/addUser", { title, description, status })
            console.log("user Creted", response.data)
            alert(" data inserted successfully")
            setTitle('')
            setDescription('')
            setStatus('to do')
        }
        catch (err: any) {
            setError('failed to add user');
            console.error(err)
        }

    }
    return (
        <div>
            <h1>Add user</h1>
            <div id='formElement'>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='title'>Title</label>
                    <input id='title' placeholder='Enter title' value={title} onChange={(e) => setTitle(e.target.value)} required/>
                    <br></br><br></br>
                    <label htmlFor="description">Description</label>
                    <textarea id='description' placeholder='Enter your text here' value={description} onChange={(e) => setDescription(e.target.value)} />
                    <br></br><br></br>
                    <label htmlFor="status"></label>
                    <select id='status'  value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option label='to do'>to do</option>
                        <option label='pending'>Pending</option>
                        <option label='completed'>completed</option>

                    </select>
                    <br></br><br></br>
                    <button>Add Task</button>
                    {error && <p className="text-danger mt-3">{error}</p>}

                </form>
            </div>
        </div>
    );
}

export default AddUserDetails;