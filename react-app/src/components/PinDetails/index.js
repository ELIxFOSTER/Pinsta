// import React, { useEffect, useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { getPinDetails, resetPinDetails } from '../../store/pins'
// import { useParams } from 'react-router-dom'
// import PinDetailsCard from '../PinDetailsCard'
// import './PinDetails.css'
// import { getPinComments, createNewComment } from '../../store/comment'

// export default function PinDetails() {
//     const pinId = useParams()
//     console.log('pinId', pinId.pinId)

//     const dispatch = useDispatch();
//     const pin = useSelector(state => state.pinsReducer.PinDetails)
//     const currentUser = useSelector(state => state.session.user)
//     const commentsData = useSelector(state => state.commentReducer)
//     const sessionUser = useSelector((state) => state.session.user)

//     const comm = Object.values(commentsData.pinComments)

//     const [comment, setComment] = useState("");
//     const [validationErrors, setErrors] = useState([]);

//     const handleCommentSubmit = async (e) => {
//     e.preventDefault()

//     await dispatch(createNewComment({comment, pin_id:pin.id}))

//     setComment('')
//     setErrors([])
//   }

//     useEffect(() => {
//         dispatch(getPinDetails(pinId.pinId))
//         dispatch(getPinComments(pinId.pinId))

//         return () => {
//             dispatch(resetPinDetails())
//         }
//     }, [dispatch, pinId.pinId])

//     return (
//         <div className='pin-details-wrapper'>
//             <div className="pin-card-container">
//       <div>
//         <img id="pin-details-img" src={pin.imageUrl}></img>
//       </div>
//       <div className="pin-info-container">
//         <div>
//           <div className="pin-details-title">{pin.title}</div>
//           <div className="pin-details-description">{pin.description}</div>
//         </div>
//         <div>
//           {comm ? (
//             comm.map((ele) => (
//               <div className="pin-details-comments" key={ele.id}>
//                 {ele.user.username}:  {ele.comment}
//               </div>
//             ))
//           ) : (
//             <div className="pin-details-comments">No Comments</div>
//           )}
//         </div>
//         <div className="comment-bar-section">
//           {currentUser ? (
//             <>
//               <div>
//                 <div className='profile-pin'>
//                   <h2 style={{width:'20px',fontSize: '20px', textAlign: 'center', borderRadius: '100px', padding: '10px 15px', margin: '0', backgroundColor: 'lightgray', marginRight: '10px'}}>{currentUser.username[0].toUpperCase()}</h2>
//                   <form onSubmit={handleCommentSubmit}>
//                 <input
//                   type="text"
//                   placeholder="Comment"
//                   value={comment}
//                   onChange={e => setComment(e.target.value)}
//                 />
//               </form>
//                 </div>
//               </div>

//             </>
//           ) : (
//             <div>Login to add comments!</div>
//           )}
//         </div>
//       </div>
//     </div>
//         </div>
//     )
// }

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
  console.log("pinId", pinId.pinId);

  const dispatch = useDispatch();
  const pin = useSelector((state) => state.pinsReducer.PinDetails);
  const currentUser = useSelector((state) => state.session.user);
  const commentsData = useSelector((state) => state.commentReducer);
  const sessionUser = useSelector((state) => state.session.user);

  const comm = Object.values(commentsData.pinComments);
  
  const [comment, setComment] = useState("");
  const [validationErrors, setErrors] = useState([]);
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
    await dispatch(createNewComment({ comment, pin_id: pin.id }));
    setComment("");
    setErrors([]);
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
          <div>
            <div className="pin-details-title">{pin.title}</div>
            <div className="pin-details-description">{pin.description}</div>
          </div>
          <div>
            {comm ? (
              comm.map((ele) => (
                <div className="pin-details-comments" key={ele.id}>
                  {ele.user.username}: {ele.comment}
                  {currentUser && ele.user.id === currentUser.id ? (
                    <div>
                      <button onClick={openMenu}>...</button>
                      <div className={ulClassName} ref={ulRef}>
                        {currentUser && ele.user.id === currentUser.id ? (
                          <button onClick={() => handleDeleteComment(ele.id)}>
                            Delete
                          </button>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                </div>
              ))
            ) : (
              <div className="pin-details-comments">No Comments</div>
            )}
          </div>
          <div className="comment-bar-section">
            {currentUser ? (
              <>
                <div>
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
                    <form onSubmit={handleCommentSubmit}>
                      <input
                        type="text"
                        placeholder="Comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </form>
                  </div>
                </div>
              </>
            ) : (
              <div>Login to add comments!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
