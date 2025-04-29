import React, { useEffect, useState } from 'react'
import API from './utils/api';
import ToDoForm from './ToDoForm';
import TodoItem from './TodoItem';

function ToDoKist() {
    const [tasks, setTasks] = useState([]);

    useEffect(()=>{
        const fetchTasks = async()=>{
            try {
                const response = await API.get("/");
                setTasks(response.data);
            } catch (error) {
                console.error("Error fetching Tasks",error)
            }
        }
        fetchTasks();
    })

    const handleTasks = (task) =>{
        setTasks([...tasks, task])
    }
  return (
    <div>
        <ToDoForm onTaskAdded={handleTasks}/>
        <br />
        {tasks.map((task)=>(
            <TodoItem key={task._id} task={task}/>
        ))}
    </div>
  )
} 

export default ToDoKist;