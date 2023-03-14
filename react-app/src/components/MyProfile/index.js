import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { get_all_boards, removeUserBoards } from '../../store/board'
import { NavLink } from 'react-router-dom'
import OpenModalButton from '../OpenModalButton'
import CreateBoard from '../CreateBoard'



const MyProfile = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const boardsData = useSelector(state => state.boards.userBoards)

    const boards = Object.values(boardsData)

    useEffect(() => {
        dispatch(get_all_boards())

    }, [dispatch])

    return boards.length ? (
        <div className="profile-container">
            <div>
                <h2>@{user.username}</h2>
                <span>following feature coming soon...</span>
            </div>

            <div className='pboard-container'>
                {boards.map(board => (
                    <div className="pboard" key={board.id}>
                        <NavLink to={`/boards/${board.id}`}>
                            <p>{board.name}</p>
                            <span>{board.pins?.length} pins</span>
                        </NavLink>
                    </div>
                ))}
                <OpenModalButton modalComponent={<CreateBoard />} buttonText='Create Board'  />
            </div>
        </div>
    ):
    <>
        <h2>You currently have no boards</h2>
        <OpenModalButton modalComponent={<CreateBoard />} buttonText='Create Board' />
    </>
}

export default MyProfile
