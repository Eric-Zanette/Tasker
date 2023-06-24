import PropTypes from 'prop-types'
import { useState } from 'react'
import { FaPlus, FaMinus } from 'react-icons/fa'

const TaskItem = ({task}) => {
    const [toggle, setToggle] = useState(false)

    const {posted, title, description, complete, finishBy, id} = task

    const onClick = async () => {
        await setToggle(!toggle)
        console.log(toggle)
    }


    return (
        <>
            <div className='card'>
                <h1>
                    {title}
                    {toggle ? 
                    <FaMinus className='openMenu' onClick={onClick} /> : 
                    <FaPlus className='openMenu' onClick={onClick} />}
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