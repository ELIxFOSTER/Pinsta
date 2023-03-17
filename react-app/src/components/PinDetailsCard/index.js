import React, { useState, useEffect } from "react";
import { createNewComment } from "../../store/comment";
import { useDispatch } from "react-redux";
import { get_all_comments } from "../../store/comment";
import "./PinDetailsCard.css";

export default function PinDetailsCard({ pin, sessionUser }) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  // const refresh = async () => {
  //   await dispatch(get_all_comments)
  // }

  useEffect(() => {
    setComments(pin.comments || []);
  }, [pin.comments]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const commentData = {
      comment,
      pin_id: pin.id,
    };

    let newComment = await dispatch(createNewComment(commentData))
    if (newComment) setComments([...comments, newComment])

  };

  useEffect(() => {
    async function fetchComments() {
      let response = await fetch(`/api/comments/pin/${pin.id}`);
      if (response.ok) {
        let commentsData = await response.json();
        setComments(commentsData);
      }
    }
    fetchComments();
  }, [pin.id]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommentSubmit(e);
    }
  };

  return (
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
          {comments.length ? (
            comments.map((ele) => (
              <div className="pin-details-comments" key={ele.id}>
                {ele.user.username}: {ele.comment}
              </div>
            ))
          ) : (
            <div className="pin-details-comments">No Comments</div>
          )}
        </div>
        <div className="comment-bar-section">
          {sessionUser ? (
            <>
              <div>Profile Pic Here: {sessionUser.username}</div>
              <form onSubmit={handleCommentSubmit}>
                <input
                  type="text"
                  placeholder="Comment"
                  value={comment}
                  onChange={handleCommentChange}
                  onKeyDown={handleKeyDown}
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
