import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { get_single_board } from '../../store/board'
import { NavLink, useParams } from 'react-router-dom'
import './boards.css'



const Boards = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const singleBoard = useSelector(state => state.boards.singleBoard)

    useEffect(() => {
        dispatch(get_single_board(id))
    }, [dispatch, id])


    return singleBoard ? (
        <div className='board-container'>
            <h1 style={{fontSize: '36px'}}>{singleBoard.name}</h1>
            <p style={{fontSize: '18px'}}>{singleBoard.description}</p>

            <div className='board-pin-container' style={{display: 'flex'}}>
                {singleBoard.pins?.map(pin => (
                    <NavLink to={`/pins/${pin.id}`}>
                        <div>
                            <span>{pin.title}</span>
                            <p>{pin.description}</p>
                            <p>{pin.userId}</p>
                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
    ): <div>Loading...</div>
}

export default Boards
