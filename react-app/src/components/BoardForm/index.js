
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { create_board } from '../../store/board'
import {useModal} from '../../context/Modal'
import './createBoard.css'


const BoardForm = () => {

    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [hasSubmitted, setSubmitted] = useState(false)
    const [validationErrors, setErrors] = useState([])


    const {closeModal} = useModal()



    const submitHandler = async (e) => {
        e.preventDefault()

        setSubmitted(true)
        if(validationErrors.length) return "Your post has errors"


        const data = await dispatch(create_board({name, description}))
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

    return (
        <div className="form-container">
            <div className="form-content">
            <h1>Create Board</h1>
                {hasSubmitted && validationErrors.length > 0 && (
                    <div className='errors-info'>
                        <ul>
                            {validationErrors.map(error => (
                            <li key={error}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}
            <form style={{width: '100%'}} onSubmit={submitHandler}>
                <div style={{maxWidth: '100%'}}>
                    <label htmlFor='name'>Name</label>
                    <input style={{padding: '10px 0px', border: 'solid 1px gray'}} id='name' type='text' value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='description'>Description</label>
                    <textarea style={{padding: '0px', border: 'solid 1px gray'}} id='description' name='description' value={description} onChange={e => setDescription(e.target.value)} />
                </div>
                <button className='create-board-button' style={{borderRadius: '10px', width: '100%', border: 'solid 1px gray'}} type="submit">Create Board</button>
            </form>
            </div>
        </div>
    )
}

export default BoardForm
