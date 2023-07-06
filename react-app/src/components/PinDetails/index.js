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
  const [trashIcon, setTrashIcon] = useState(false)
  const [pinDown, setPin] = useState(false);
  const closeMenu = () => setShowMenu(false);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    const dotHandler = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      setPin(!pinDown);
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
        <div style={{width: '40%'}}>
          <img id="pin-details-img" src={pin.imageUrl}></img>
        </div>
        <div className="pin-info-container">
          <div style={{display: 'flex', justifyContent: 'flex-end', height: '40px'}}>
            <div className='three-dots'><i className="fa-solid fa-ellipsis"></i></div>
          </div>

          <div className='comments-wrapper'>
            <div className='comments-title'>
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
                  <div style={{marginBottom: '10px'}}>Comments</div>
                  <div style={{fontSize: '18px', color: 'gray'}}>No Comments yet! Add one to start the conversation</div>
                </div>
              )}
            </div>
            {comm ? (
              comm.map((ele) => (
                <div>
                  <div className="pin-details-comments" key={ele.id}>
                    {/* {ele.user.username}: {ele.comment} */}
                    <div className='comment-format-container' onMouseEnter={() => setTrashIcon(true)} onMouseLeave={() => setTrashIcon(false)}>
                    <button className="profile-button-comments">
                {ele.user.username.slice(0, 1)}
              </button>
              <div className='comment-username'>
                {ele.user.username}
              </div>
              <div className='comment-text'>{ele.comment}</div>
                    {currentUser && ele.user.id === currentUser.id ? (
                      <>
                      {trashIcon && (
                        <i id='trash-can-icon' className="fas fa-trash-alt" onClick={() => handleDeleteComment(ele.id)}></i>
                      )}
                     </>
                    ) : null}
                    </div>
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
                <h2>What do you think?</h2>
                <div style={{display: 'flex'}}>
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
                    <ul style={{listStyle: 'none'}}>
                      {errors.map((error, idx) => (
                        <li style={{color: 'red'}} key={idx}>Comment is required</li>
                      ))}
                    </ul>
                  )}
                </form>
                </div>
              </div>
            ) : (
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <h2>What do you think?</h2>
                <div>Login to add comments!</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

  );
  }
