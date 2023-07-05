import PropTypes from 'prop-types'
import { useContext, useEffect, useState } from 'react'
import { FaPlus, FaMinus, FaCheck, FaTrash, FaTimes, FaEdit } from 'react-icons/fa'
import TasksContext from '../context/Tasks/TasksContext'
import TaskForm from './TaskForm'

const TaskItem = ({task}) => {
    const [underToggle, setunderToggle] = useState(false)
    const [editToggle, setEditToggle] = useState(false)

    const {posted, title, description, complete, finishBy, createdAt} = task

    const {editTask, deleteTask, fetchTasks, tasks} = useContext(TasksContext)


    const onClick = async () => {
        await setunderToggle(!underToggle)
    }

    const editClick = async () => {
        await setEditToggle(!editToggle)
    }

    const setComplete = async (e) => {
        editTask({
            ...task,
            complete: !complete
        })
    }

    const deleted = async (e) => {
        deleteTask(task)
    }

    const currentDate = new Date()
    const timePosted = new Date(createdAt)
    const finish = new Date(finishBy)

    const timeLeft = finish - currentDate
    const daysLeft = (timeLeft / 86400000).toFixed(1)

    return (
        <>
            <div className={`card ${complete && 'completed'}`}>
                <h1> 
                    {!complete ?
                    <FaCheck className='completeIcon' onClick={setComplete} /> :
                    <FaTimes className='uncompleteIcon' onClick={setComplete}/>
                    }
                    
                    <FaTrash className='deleteIcon' onClick={deleted} />
                    {title}
                    {/* <FaEdit className='editIcon' onClick={editClick}/> */}
                    {underToggle ? 
                    <FaMinus className='openMenuIcon' onClick={onClick} /> : 
                    <FaPlus className='openMenuIcon' onClick={onClick} />}
                </h1>
            </div>
            <div className="underCard" style={{display : underToggle ? 'block' : 'none'}}>
                <div className="underFlex" >
                    <p><strong>{`posted on: ${timePosted.toISOString().split('T')[0]}`}</strong></p>
                    <p><strong>{`complete by: ${finish.toISOString().split('T')[0]}`}</strong></p>
                </div>
                <p className='itemDescription'>{description}</p>
                <p className='timeLeft'>{`${daysLeft} ${(daysLeft >= 2) ? 'Days' : 'Day'} Left to Complete!`}</p>
            </div>  
            {/* TO DO - EDIT FORM */}
{/*          <div className="editFormDiv" style={{display : editToggle ? 'block' : 'none'}}>
                <TaskForm edit={true}/>
            </div> */}
            
        </>
    )
    }

export default TaskItem