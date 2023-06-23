import React from 'react'
import {useState, useEffect} from 'react'
import { useContext } from 'react'
import TasksContext from './context/context/TasksContext'

const TaskForm = () => {
    const[task, setTask] = useState({
        posted : '',
        title: '',
        description: '',
        complete: false,
        finishBy: '',
    })

    const{addTask} = useContext(TasksContext)

    const onChange = (e) => {
        setTask({
            ...task,
            [e.target.id]: e.target.value
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        await setTask({
            ...task,
            posted: new Date()
        })
        addTask(task)
    }


    return (
        <div className='formControl'>
            <h1>Start a New Task</h1>
            <form className="taskForm">
                <input type="text" className='taskInput' onChange={onChange} id='title' placeholder='Task Name' value={task.title}/>
                <textarea className='taskInput description' onChange={onChange} id='description' placeholder='Task Description' value={task.description}/>
                <input type="date" className='taskInput' onChange={onChange} id='finishBy' placeholder='Task Description' value={task.finishBy}/>
                <button className="btn btn-3" onClick={onSubmit}>Set Task</button>
            </form>
        </div>
    )
}

export default TaskForm