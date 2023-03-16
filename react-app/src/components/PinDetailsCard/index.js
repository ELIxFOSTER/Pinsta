import React, { useState } from "react";
import "./PinDetailsCard.css";

export default function PinDetailsCard({ pin, sessionUser }) {
  const [comment, setComment] = useState("");

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    // handle comment submission here
    console.log(comment);
    setComment("");
  };

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
          <div className="pin-details-comments">Comments</div>
        </div>
        <div className='comment-bar-section'>
          <div>Profile Pic Here: {sessionUser.username}</div>
          <form>
            <input
              type="text"
              placeholder="Comment"
              value={comment}
              onChange={handleCommentChange}
              onKeyDown={handleKeyDown}
            />
          </form>
        </div>
      </div>
    </div>
  );
}