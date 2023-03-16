import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { get_all_boards, get_single_board, update_board } from "../../store/board";
import {useModal} from "../../context/Modal"
import { useHistory } from "react-router-dom";

export default function EditBoard({id}) {
    const board = useSelector(state => state.boards.singleBoard)
    const dispatch = useDispatch()
    const {closeModal} = useModal()
    const history = useHistory()


    const [name, setName] = useState(board.name)
    const [description, setDescription] = useState(board.description)


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(update_board({name, description}, id)).then(closeModal())
        history.push('/myprofile')
    }

    useEffect(() =>{
        dispatch(get_single_board())

        return dispatch(get_all_boards())
    }, [dispatch])

    return board.id &&(
        <>
            <h1>Edit Board</h1>

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
