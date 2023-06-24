import PropTypes from 'prop-types'
import { useContext, useState } from 'react'
import { FaPlus, FaMinus, FaCheck, FaTrash } from 'react-icons/fa'
import TasksContext from '../context/Tasks/TasksContext'

const TaskItem = ({task}) => {
    const [toggle, setToggle] = useState(false)

    const {posted, title, description, complete, finishBy, id} = task

    const {editTask, deleteTask} = useContext(TasksContext)

    const onClick = async () => {
        await setToggle(!toggle)
    }

    const setComplete = async (e) => {
        editTask({
            ...task,
            complete: true
        })
    }

    const deleted = async (e) => {
        deleteTask(task)
        console.log(task)
    }
    


    return (
        <>
            <div className={`card ${complete && 'completed'}`}>
                <h1>
                    <FaCheck className='completeIcon' onClick={setComplete} />
                    <FaTrash className='deleteIcon' onClick={deleted} />
                    {title}
                    {toggle ? 
                    <FaMinus className='openMenuIcon' onClick={onClick} /> : 
                    <FaPlus className='openMenuIcon' onClick={onClick} />}
                </h1>
            </div>
            <div className="underCard" style={{display : toggle ? 'block' : 'none'}}>
                <div className="underFlex" >
                    <p><strong>{`posted on: ${posted}`}</strong></p>
                    <p><strong>{`complete by: ${finishBy}`}</strong></p>
                </div>
                <p className='itemDescription'>{description}</p>
            </div>
        </>
    )
    }

export default TaskItem