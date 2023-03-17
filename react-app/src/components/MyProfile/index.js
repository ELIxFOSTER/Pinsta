import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { get_all_boards } from '../../store/board'
import { NavLink } from 'react-router-dom'
import OpenModalButton from '../OpenModalButton'
import './myprofile.css'
import BoardForm from '../BoardForm'



const MyProfile = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const boardsData = useSelector(state => state.boards)

    const boards = Object.values(boardsData.userBoards)

    const dotHandler = (e) => {
        e.stopPropagation();
        e.preventDefault();

        alert('Feature coming soon!')
    }

    useEffect(() => {
        dispatch(get_all_boards())

    }, [dispatch])

    return boards.length ? (
        <div className="profile-container">
            <div className='profile'>
                <h2 style={{width:'50px',fontSize: '50px', textAlign: 'center', borderRadius: '100px', padding: '25px 30px', margin: '0', backgroundColor: 'lightgray'}}>{user.username[0].toUpperCase()}</h2>
                <span style={{marginTop: '20px'}}>following feature coming soon...</span>
            </div>

            <div className='pboard-container'>
                <div className='pboard'>
                {boards.map(board => (
                    <div className='single-pboard'key={board.id}>
                        <NavLink to={`/boards/${board.id}`}>
                            {board.pins.length ? (
                                <div className='single-pboard'>
                                    <div className="scontent"><i onClick={dotHandler} className="fa-solid fa-ellipsis"></i></div>
                                    <img src={board.pins[0].imageUrl} alt='preview image'/>

                                </div>
                            ):
                            <>
                                <div className='empty'></div>
                            </>}
                            <p style={{bottom: '0'}}>{board.name} <span style={{display:'flex'}}>{board.pins?.length} pins</span></p>
                        </NavLink>
                    </div>
                ))}
                </div>

            </div>
            <OpenModalButton modalComponent={<BoardForm />} styleOption='addIcon' buttonText={<i style={{fontSize: '20px'}} className="fa-solid fa-plus"></i>}  />
            {/* <MyPins /> */}
            <NavLink style={{marginTop: '40px'}} to='/created-pins' >
                    <div>Created</div>
                </NavLink>
        </div>
    ):
    <div className="profile-container">
            <div className='profile'>
                <h2 style={{width:'50px',fontSize: '50px', textAlign: 'center', borderRadius: '100px', padding: '25px 30px', margin: '0', backgroundColor: 'lightgray'}}>{user.username[0].toUpperCase()}</h2>
                <span style={{marginTop: '20px'}}>following feature coming soon...</span>
            </div>

            <div className='pboard-container'>
                <div className='pboard'>
                    <h2>This board has no Pins!</h2>
                </div>

            </div>
            <OpenModalButton modalComponent={<BoardForm />} styleOption='addIcon' buttonText={<i style={{fontSize: '20px'}} className="fa-solid fa-plus"></i>}  />
            {/* <MyPins /> */}
            <NavLink style={{marginTop: '40px'}}to='/created-pins' >
                    <div>Created</div>
                </NavLink>
        </div>
}

export default MyProfile
