
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { create_board } from '../../store/board'
import './createBoard.css'


const CreateBoard = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')



    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(create_board({name, description}))
    }

    return (
        <>
            <h1>Create Board</h1>

            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input id='name' type='text' value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='description'>Description</label>
                    <textarea id='description' name='description' value={description} onChange={e => setDescription(e.target.value)} />
                </div>
                <button type="submit">Create Board</button>
            </form>
        </>
    )
}

export default CreateBoard
