import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { delete_board, get_all_boards, get_single_board, removeSingleBoard } from '../../store/board'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import EditBoard from '../EditBoard'
import OpenModalLi from '../OpenFormLi'
import './boards.css'



const Boards = () => {
    const {id} = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const singleBoard = useSelector(state => state.boards.singleBoard)

    const [dropDown, setDropDown] = useState(false)

    const buttonHandler = () => {
        setDropDown(!dropDown)
    }

    const deleteHandler = async () => {
        await dispatch(delete_board(id)).then(() => console.log('Success'))
        history.push('/myprofile')
    }

    const dotHandler = (e) => {
        e.stopPropagation();
        e.preventDefault();

        alert('Feature coming soon!')
    }

    const boardCss = dropDown ? "board-dropdown-menu": 'hidden'

    useEffect(() => {
        dispatch(get_single_board(id))

        return () => {
            dispatch(removeSingleBoard())
            dispatch(get_all_boards())
        }
    }, [dispatch, id])


    return singleBoard ? (
        <div className='board-container'>
                <div className='board-header'>
                    <h1 style={{fontSize: '36px'}}>{singleBoard.name}</h1>

                    <div className='board-dropdown-container'>
                        <button className="clickable" onClick={buttonHandler}><i className="fa-solid fa-bars" style={{fontSize: '20px', padding: '5px'}} ></i></button>
                        <div className={boardCss}>
                            {dropDown && (
                                <ul onClick={() => setDropDown(false)} style={{listStyle: 'none', padding: '1px 10px'}}>
                                    <OpenModalLi modalComponent={<EditBoard id={id}/>} buttonText='Edit'/>
                                    <li onClick={deleteHandler}>Delete</li>
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            <p style={{fontSize: '18px'}}>{singleBoard.description}</p>

            <div className='board-pin-container' style={{display: 'flex'}}>
                {singleBoard.pins?.map(pin => (
                    <div className='pin-pics' style={{display: 'flex', justifyContent: 'space-between'}}>
                        <NavLink to={`/pins/${pin.id}`}>
                            <div className='single-pin'>
                                <div className="content"><i onClick={dotHandler} className="fa-solid fa-ellipsis"></i><p>{pin.title}</p></div>
                                <img src={pin.imageUrl} alt='Image'/>

                            </div>
                        </NavLink>
                    </div>
                ))}
            </div>
        </div>
    ): <div>Loading...</div>
}

export default Boards
