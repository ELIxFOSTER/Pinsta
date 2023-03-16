using this component:
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

and this css file for that compenent:

.pin-card-container {
    display: flex;
    border: 2px solid red;
    border-radius: 16px;
    width: 70vw;
}

.pin-info-container {
    display: flex;
    flex-direction: column;
    padding-left: 50px;
    gap: 20px;
    justify-content: center;
    /* border: 2px solid green; */
}

.pin-card-container > div:first-child {
    flex: 1;
    width: 100%;
    display: flex;
    /* justify-content: center; */
  }

.comment-bar-section {
    display: flex;
    gap: 8px
}

#pin-details-img {
    object-fit: cover;
    border-radius: 16px 0px 0px 16px;
    max-width: 100%;
    max-height: 100%;
}

.pin-details-title {
    font-size: 21px;
    font-weight: 600;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.pin-details-description {
    font-size: 36px;
    font-weight: 600;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.pin-details-comments {
    font-size: 20px;
    font-weight: 600;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

can you please make it so that the content is dynamic and adjusts for the screen size
