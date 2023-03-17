import React, { useState, useEffect } from "react";
import { createNewComment } from "../../store/comment";
import { useDispatch, useSelector } from "react-redux";
import { get_all_comments } from "../../store/comment";
import "./PinDetailsCard.css";

export default function PinDetailsCard() {
  const dispatch = useDispatch();
  const pin = useSelector(state => state.pinsReducer.PinDetails)
  const currentUser = useSelector(state => state.session.user)
  const commentsData = useSelector(state => state.commentReducer)

  const comm = Object.values(commentsData.pinComments)

  const [comment, setComment] = useState("");
  const [hasSubmitted, setSubmit] = useState(false)
  const [validationErrors, setErrors] = useState([]);


  const handleCommentSubmit = async (e) => {
    e.preventDefault()


    dispatch(createNewComment({comment, pin_id:pin.id}))

    setComment('')
    setErrors([])
  }


  useEffect(() => {
    const errors = []

    if(!comment.length) errors.push('Enter a comment')

    setErrors(errors)
  }, [comment])


  return pin && (
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
  );
}
