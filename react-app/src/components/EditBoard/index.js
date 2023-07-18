import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { update_board } from "../../store/board";
import {useModal} from "../../context/Modal"

export default function EditBoard({id}) {
    const board = useSelector(state => state.boards.singleBoard)
    const dispatch = useDispatch()
    const {closeModal} = useModal()


    const [name, setName] = useState(board.name)
    const [description, setDescription] = useState(board.description)
    const [hasSubmitted, setSubmitted] = useState(false)
    const [validationErrors, setErrors] = useState([])


    const submitHandler = async (e) => {
        e.preventDefault()


        setSubmitted(true)
        if(validationErrors.length) return "Your post has errors"

        const data = await dispatch(update_board({name, description}, id))
        if(data) {
            setErrors(data)
        } else {

            setName("")
            setDescription("")
            setErrors([])
            setSubmitted(false)
            closeModal()
        }
    }

    useEffect(() => {
        const errors = []
        if (!name.length) errors.push('Please enter a name for this Board')
        if(!description.length) errors.push('Please enter a description')
        setErrors(errors)
    }, [name, description])


    return board.id &&(
        <div className="form-container">
            <div className="form-content">
            <h1>Edit Board</h1>
                {hasSubmitted && validationErrors.length > 0 && (
                    <div className='errors-info'>
                        <ul>
                            {validationErrors.map(error => (
                            <li key={error}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input style={{padding: '10px 0px', border: 'solid 1px gray'}} id='name' type='text' value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='description'>Description</label>
                    <textarea style={{padding: '0px', border: 'solid 1px gray'}} id='description' name='description' value={description} onChange={e => setDescription(e.target.value)} />
                </div>
                <button style={{borderRadius: '10px', width: '100%', border: 'solid 1px gray'}} className='create-board-button' disabled={name.length > 30 || description.length > 250 || description.length < 1 } type="submit">Update Board</button>
            </form>
            </div>
        </div>
    )
}
