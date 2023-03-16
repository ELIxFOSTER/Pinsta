import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { update_board } from "../../store/board";
import {useModal} from "../../context/Modal"
import { useHistory } from "react-router-dom";

export default function EditBoard({id}) {
    const board = useSelector(state => state.boards.singleBoard)
    const dispatch = useDispatch()
    const {closeModal} = useModal()
    const history = useHistory()


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
            setErrors(data.errors)
            closeModal()
        } else {

            setName("")
            setDescription("")
            setErrors([])
            setSubmitted(false)
            closeModal()

            history.push('/myprofile')
        }
    }

    useEffect(() => {
        const errors = []
        if (!name.length) errors.push('Please enter a name for this Board')
        if(!description.length) errors.push('Please enter a description')
        setErrors(errors)
    }, [name, description])


    return board.id &&(
        <>
            <h1>Edit Board</h1>
                {hasSubmitted && validationErrors.length > 0 && (
                    <div className='errors-info'>
                        <h2>The following errors were found</h2>
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
                    <input id='name' type='text' value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='description'>Description</label>
                    <textarea id='description' name='description' value={description} onChange={e => setDescription(e.target.value)} />
                </div>
                <button type="submit">Update Board</button>
            </form>
        </>
    )
}
