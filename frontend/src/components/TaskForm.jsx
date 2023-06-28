import React from 'react'
import {useState, useEffect} from 'react'
import { useContext } from 'react'
import TasksContext from '../context/Tasks/TasksContext'
import UserContext from '../context/Users/UserContext'

const TaskForm = () => {
    const[task, setTask] = useState({
        posted : '',
        title: '',
        description: '',
        complete: false,
        finishBy: '',
    })
    const[toggle, setToggle] = useState(false)

    const{addTask} = useContext(TasksContext)
    const{user} = useContext(UserContext)

    const onChange = (e) => {
        setTask({
            ...task,
            [e.target.id]: e.target.value,
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        var now = (new Date()).toISOString().split('T')[0]
  
        const postedTask = {
            ...task,
            posted: now,
            user: user.username
        }
        addTask(postedTask)
    }

    const toggleForm = () => {
        setToggle(!toggle)
    }

    return (
        <>
            <button className="btn" onClick={toggleForm}>{toggle ? "Close" : "Start a New Task"}</button>
            <div className='formControl' style={{display: toggle ? "block" : "none"}}>
                <h1>Start a New Task</h1>
                <form className="taskForm">
                    <input type="text" className='taskInput' onChange={onChange} id='title' placeholder='Task Name' value={task.title}/>
                    <textarea className='taskInput description' onChange={onChange} id='description' placeholder='Task Description' value={task.description}/>
                    <input type="date" className='taskInput' onChange={onChange} id='finishBy' placeholder='Task Description' value={task.finishBy}/>
                    <button className="btn btn-3" onClick={onSubmit}>Set Task</button>
                </form>
            </div>
        </>
    )
}

export default TaskForm