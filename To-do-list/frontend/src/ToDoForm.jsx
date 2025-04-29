import React, { useState } from 'react';
import API from './utils/api';

function ToDoForm({onTaskAdded}) {

    const [form, setForm] = useState({
        title :"",
        description :"",
        deadLine :""
    })

    const handleChange = (e) => setForm({...form, [e.target.name] : e.target.value});

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const response = await API.post("/tasks/new",form);
            onTaskAdded(response.data);
            setForm({
                title :"",
                description :"",
                deadline :""
            });
            console.log(response.data)
        } catch (error) {
            console.error("Error submitiing form: ",error);
        }
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" value={form.title} onChange={handleChange} placeholder='Enter Title' required/>
            <br />
            <input type="text" name="description" value={form.description} onChange={handleChange} placeholder='Enter Description'/>
            <br/>
            <input type="text" name="deadline" value={form.deadline} onChange={handleChange} placeholder='Enter Deadline'/>
            <br />
            <button type="submit">Add Task</button>
        </form>
    </div>
  )
}

export default ToDoForm