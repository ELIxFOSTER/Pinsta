
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { create_board, update_board } from '../../store/board'
import {useModal} from '../../context/Modal'
import './createBoard.css'


const BoardForm = ({formType, board}) => {

    const dispatch = useDispatch()

    const [name, setName] = useState(board.name)
    const [description, setDescription] = useState(board.description)


    const {closeModal} = useModal()



    const submitHandler = (e) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append('name',name)
        formData.append('description', description)

        if(formType === 'create') {
            dispatch(create_board({name, description})).then(closeModal())
        }

        // if(formType === 'edit') {
        //     console.log(board.id)
        //     dispatch(update_board({name, description}, id)).then(closeModal())
        // }
    }

    return (
        <>
            <h1>{formType} Board</h1>

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

export default BoardForm
