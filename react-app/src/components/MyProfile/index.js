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

    useEffect(() => {
        dispatch(get_all_boards())

    }, [dispatch])

    return boards.length ? (
        <div className="profile-container">
            <div className='profile'>
                <h2 style={{width:'50px',fontSize: '50px', border: 'solid lightblue 3px', textAlign: 'center', borderRadius: '100px', padding: '25px 30px', margin: '0', backgroundColor: 'lightgray'}}>{user.username[0].toUpperCase()}</h2>
                <span>following feature coming soon...</span>
            </div>

            <div className='pboard-container'>
                <div className='pboard'>
                {boards.map(board => (
                    <div className='single-pboard'key={board.id}>
                        <NavLink to={`/boards/${board.id}`}>
                            {board.pins.length ? (
                                <img src={board.pins[0].imageUrl} alt='preview image'/>
                            ):
                            <>
                                <div className='empty'></div>
                            </>}
                            <p>{board.name}</p>
                            <span>{board.pins?.length} pins</span>
                        </NavLink>
                    </div>
                ))}
                </div>

                {/* <MyPins /> */}
                <NavLink to='/created-pins' >
                    <div>Created</div>
                </NavLink>
            </div>
            <OpenModalButton modalComponent={<BoardForm formType='create' board={{name: '', description: ''}}/>} styleOption='addIcon' buttonText={<i style={{fontSize: '20px'}} className="fa-solid fa-plus"></i>}  />
        </div>
    ):
    <>
        <div className="profile-container">
            <div className='profile'>
                <h2 style={{width:'50px',fontSize: '50px', border: 'solid lightblue 3px', textAlign: 'center', borderRadius: '100px', padding: '25px 30px', margin: '0', backgroundColor: 'lightgray'}}>{user.username[0]}</h2>
                <span>following feature coming soon...</span>
            </div>

            <div className='pboard-container'>
                <OpenModalButton modalComponent={<BoardForm formType='create' board={{name: '', description: ''}}/>} buttonText={'Create Board'}  />
                {/* <MyPins /> */}
                <NavLink to='/created-pins' >
                    <div>Created</div>
                </NavLink>
            </div>
        </div>
    </>
}

export default MyProfile
