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

import { addPinToBoard } from "../../store/board";

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
  const userBoards = useSelector((state) => state.boards)

  const boards = Object.values(userBoards.userBoards)

  const comm = Object.values(commentsData.pinComments);

  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState([]);
  const [trashIcon, setTrashIcon] = useState(false)
  const [pinDown, setPin] = useState(false);

  const menu = useRef(null)

  const closeOpenMenus = (e) => {
    if (menu.current && pinCss && !menu.current.contains(e.target)) {
      setPin(false);
    }
  };

  const pinCss = pinDown ? "details-dropdown" : "hidden"

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

  document.addEventListener("mousedown", closeOpenMenus)

  const dotHandler = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    setPin(!pinDown);
  };

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
      setPin(false)
    };
  }, [dispatch, pinId.pinId]);

  return (
    <div className="pin-details-wrapper">
      <div className="pin-card-container">
        <div style={{width: '40%'}}>
          <img id="pin-details-img" src={pin.imageUrl}></img>
        </div>
        <div className="pin-info-container">

          {sessionUser ? (
            <div style={{display: 'flex', justifyContent: 'flex-end', height: '40px'}}>
              <div onClick={e => dotHandler(e)} className='three-dots'><i className="fa-solid fa-ellipsis"></i></div>
              <div className='dropdown-container'>
                <div className={pinCss} ref={menu}>
                  <ul style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '90%', padding: '0px 10px', margin: '0px', height: '100%'}}>
                    <div style={{marginBottom: '10px', marginTop: '10px'}}>Add to your boards:</div>
                    {boards.map(board => (
                      <li className="details-list"
                      onClick={async (e) => {
                        e.preventDefault();
                        await dispatch(
                          addPinToBoard({ boardId: board.id, pinId: pin.id })
                        );
                        setPin(false);
                      }}
                      key={board.id}
                      >{board.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ):
          <div></div>
          }


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
                  {errors.length > 0 ? (
                    <div className="comment-input-container">
                    <input
                      type="text"
                      placeholder="Comment is required"
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
                  ):
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
                  }

                  {/* {errors.length > 0 && (
                    <ul style={{listStyle: 'none'}}>
                      {errors.map((error, idx) => (
                        <li style={{color: 'red'}} key={idx}>Comment is required</li>
                      ))}
                    </ul>
                  )} */}
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
