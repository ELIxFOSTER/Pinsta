import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPinDetails, resetPinDetails } from "../../store/pins";
import { useParams } from "react-router-dom";
import PinDetailsCard from "../PinDetailsCard";
import "./PinDetails.css";
import {
  getPinComments,
  createNewComment,
  deleteComment,
} from "../../store/comment";

export default function PinDetails() {
  const pinId = useParams();
  const ulRef = useRef();
  const [showMenu, setShowMenu] = useState(false);
  const [typing, setTyping] = useState(false);

  const dispatch = useDispatch();
  const pin = useSelector((state) => state.pinsReducer.PinDetails);
  const currentUser = useSelector((state) => state.session.user);
  const commentsData = useSelector((state) => state.commentReducer);
  const sessionUser = useSelector((state) => state.session.user);

  const comm = Object.values(commentsData.pinComments);

  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState([]);
  const closeMenu = () => setShowMenu(false);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(
      createNewComment({ comment, pin_id: pin.id })
    );
    if (response && response.errors) {
      setErrors(response.errors);
    }
    setComment("");
  };


  const handleDeleteComment = async (commentId) => {
    await dispatch(deleteComment(commentId));
  };

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const ulClassName = "comment-dropdown" + (showMenu ? "" : " hidden");

  useEffect(() => {
    dispatch(getPinDetails(pinId.pinId));
    dispatch(getPinComments(pinId.pinId));
    return () => {
      dispatch(resetPinDetails());
    };
  }, [dispatch, pinId.pinId]);

  return (
    <div className="pin-details-wrapper">
      <div className="pin-card-container">
        <div>
          <img id="pin-details-img" src={pin.imageUrl}></img>
        </div>
        <div className="pin-info-container">
          <div className='pin-title-section-container'>
            <div className="pin-details-title">{pin.title}</div>
            <div className="pin-details-description">{pin.description}</div>
          </div>
          <div>
            <div>
              {comm.length === 1 ? (
                <div>
                  {comm.length} comment
                </div>
              ) : comm.length > 1 ? (
                <div>
                  {comm.length} comments
                </div>
              ) : (
                <div>
                  <div>Comments</div>
                  <div>No Comments yet! Add one to start the conversation</div>
                </div>
              )}
            </div>
            {comm ? (
              comm.map((ele) => (
                <div>
                  <div className="pin-details-comments" key={ele.id}>
                    {ele.user.username}: {ele.comment}
                    {currentUser && ele.user.id === currentUser.id ? (
                      <i id='trash-can-icon' className="fas fa-trash-alt" onClick={() => handleDeleteComment(ele.id)}></i>
                    ) : null}
                  </div>
                  <div className={ulClassName} ref={ulRef}>
                    {currentUser && ele.user.id === currentUser.id ? (
                      <button onClick={() => handleDeleteComment(ele.id)}>
                        Delete
                      </button>
                    ) : null}
                  </div>
                </div>
              ))
            ) : (
              <div className="pin-details-comments">No Comments</div>
            )}
          </div>
          <div className="comment-bar-section">
            {currentUser ? (
              <div className="profile-pin">
                <h2
                  style={{
                    width: "20px",
                    fontSize: "20px",
                    textAlign: "center",
                    borderRadius: "100px",
                    padding: "10px 15px",
                    margin: "0",
                    backgroundColor: "lightgray",
                    marginRight: "10px",
                  }}
                >
                  {currentUser.username[0].toUpperCase()}
                </h2>
                <form onSubmit={handleCommentSubmit} encType='multipart/form-data'>
                  <div className="comment-input-container">
                    <input
                      type="text"
                      placeholder="Add a comment"
                      value={comment}
                      onChange={(e) => {
                        setComment(e.target.value);
                        setTyping(true);
                      }}
                      className="comment-input-field"
                      onBlur={() => setTyping(false)}
                    />
                    {/* {typing && comment && (
                    )} */}
              <button type="Submit" className="comment-send-btn" name='Submit'>
              <i className="fas fa-paper-plane"></i>
            </button>
                  </div>
                  {errors.length > 0 && (
                    <ul>
                      {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                      ))}
                    </ul>
                  )}
                </form>
              </div>
            ) : (
              <div>Login to add comments!</div>
            )}
          </div>
        </div>
      </div>
    </div>

  );
  }
