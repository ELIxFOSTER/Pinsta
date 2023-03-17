import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPinDetails, resetPinDetails } from '../../store/pins'
import { useParams } from 'react-router-dom'
import PinDetailsCard from '../PinDetailsCard'
import './PinDetails.css'
import { getPinComments, createNewComment } from '../../store/comment'



export default function PinDetails() {
    const pinId = useParams()
    console.log('pinId', pinId.pinId)

    const dispatch = useDispatch();
    const pin = useSelector(state => state.pinsReducer.PinDetails)
    const currentUser = useSelector(state => state.session.user)
    const commentsData = useSelector(state => state.commentReducer)
    const sessionUser = useSelector((state) => state.session.user)

    const comm = Object.values(commentsData.pinComments)

    const [comment, setComment] = useState("");
    const [validationErrors, setErrors] = useState([]);

    const handleCommentSubmit = async (e) => {
    e.preventDefault()


    await dispatch(createNewComment({comment, pin_id:pin.id}))

    setComment('')
    setErrors([])
  }


    useEffect(() => {
        dispatch(getPinDetails(pinId.pinId))
        dispatch(getPinComments(pinId.pinId))

        return () => {
            dispatch(resetPinDetails())
        }
    }, [dispatch, pinId.pinId])


    return (
        <div className='pin-details-wrapper'>
            <div className="pin-card-container">
      <div>
        <img id="pin-details-img" src={pin.imageUrl}></img>
      </div>
      <div className="pin-info-container">
        <div>
          <div className="pin-details-title">{pin.title}</div>
          <div className="pin-details-description">{pin.description}</div>
        </div>
        <div>
          {comm ? (
            comm.map((ele) => (
              <div className="pin-details-comments" key={ele.id}>
                {ele.comment}
              </div>
            ))
          ) : (
            <div className="pin-details-comments">No Comments</div>
          )}
        </div>
        <div className="comment-bar-section">
          {currentUser ? (
            <>
              <div>Profile Pic Here: {currentUser.username}</div>
              <form onSubmit={handleCommentSubmit}>
                <input
                  type="text"
                  placeholder="Comment"
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                />
              </form>
            </>
          ) : (
            <div>Login to add comments!</div>
          )}
        </div>
      </div>
    </div>
        </div>
    )
}
