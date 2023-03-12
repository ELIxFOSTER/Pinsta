import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { get_all_boards } from '../../store/board'



const Boards = () => {
    const dispatch = useDispatch()
    const boardData = useSelector(state => state.boards.userBoards)
    const user = useSelector(state => state.session)

    const boards = Object.values(boardData)

    console.log(boards)

    useEffect(() => {
        dispatch(get_all_boards())
    }, [dispatch])

    if(!user) {
        <Redirect to='/'/>
    }

    return boards.length ? (
        <div className="boards-container">
            {boards.map(board => (
                <div className="single-board" key={board.id}>
                    <span>{board.name}</span>
                    <span>{board.description}</span>
                </div>
            ))}
        </div>
    ): <div>Loading...</div>
}

export default Boards
