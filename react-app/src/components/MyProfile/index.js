import {useDispatch, useSelector} from 'react-redux'



const MyProfile = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    return (
        <div className="profile-container">
            <div>
                <h2>@{user.username}</h2>
            </div>

            <div>

            </div>
        </div>
    )
}

export default MyProfile
