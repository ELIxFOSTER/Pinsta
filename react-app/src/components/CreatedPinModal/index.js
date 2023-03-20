import React, { useState } from "react";
// import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
// import { get_all_boards } from "../../store/board";
import { deletePinThunk } from "../../store/pins";
// import { getCurrentUserPins } from "../../store/pins";
// import { NavLink } from "react-router-dom";

import './CreatedPinModal.css'
import { editPinThunk } from "../../store/pins";

function CreatedPinModal({ pin }) {
  const dispatch = useDispatch();


  const [title, setTitle] = useState(pin.title);
  const [description, setDescription] = useState(pin.description)
  const [hasSubmitted, setSubmitted] = useState(false)
  const [validationErrors, setErrors] = useState([])

  const imageUrl = pin.imageUrl


  const { closeModal } = useModal();


  const editSubmit = async (e) => {
    e.preventDefault()

    const editedData = {
      title,
      description,
      imageUrl
    }



    const response =  await dispatch(editPinThunk(editedData, pin.id));
    if(response && response.errors) {
      setErrors(response.errors)
      // closeModal()
  } else {
      setTitle("")
      setDescription("")
      setErrors([])
      setSubmitted(false)
      closeModal()
  }

  }

  const handleClick = async (e) => {
      e.preventDefault();
      await dispatch(deletePinThunk(pin.id));
      closeModal()
    };



  return (
    pin && (
      <div className="form-containers">
        <div className="form-contents">
        <h2>Edit This Pin</h2>
        {validationErrors.length > 0 && (
              <div className="errors-info">
                <ul>
                  {validationErrors.map((error) => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
          <img src={pin.imageUrl}></img>
          <form onSubmit={editSubmit}>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="title"
              required
            />
            <textarea
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="description"
              required
            />
            <button>Submit</button>
          </form>


        <div  className="pin-button-container">
          <div className="pin-delete-button" onClick={handleClick}>
            Delete
          </div>
          <div className="pin-cancel-button" onClick={(e) => closeModal(e)}>
            Cancel
          </div>
        </div>
        </div>
      </div>
    )
  );
}

export default CreatedPinModal;
