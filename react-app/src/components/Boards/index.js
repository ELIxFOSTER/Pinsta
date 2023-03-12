import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { get_all_boards } from '../../store/board'



const Boards = () => {
    const dispatch = useDispatch()
    const boards = useSelector(state => state.boards)

    console.log(boards)

    useEffect(() => {
        dispatch(get_all_boards())
    }, [dispatch])

    return boards && (
        <div>Hello</div>
    )
}

export default Boards
