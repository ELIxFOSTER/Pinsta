import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { get_all_boards } from "../../store/board";
import { deletePinThunk } from "../../store/pins";
import { getCurrentUserPins } from "../../store/pins";
import { NavLink } from "react-router-dom";

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

    console.log('editedData', editedData)

    const response =  await dispatch(editPinThunk(editedData, pin.id));
    if(response && response.errors) {
      setErrors(response.errors)
      console.log('edit pin errors', response.errors)
      // closeModal()
  } else {
      setTitle("")
      setDescription("")
      setErrors([])
      setSubmitted(false)
      closeModal()
  }

    // closeModal()
  }

  const handleClick = async (e) => {
      e.preventDefault();
      await dispatch(deletePinThunk(pin.id));
      closeModal()
      // await refresh();
    };

    // const refresh = async () => {
    //   await dispatch(getCurrentUserPins());
    // };



  return (
    pin && (
      <div className="pin-modal-wrapper">
        <div>Edit This Pin</div>
        <div>
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
            {validationErrors.length > 0 && (
              <div className="errors-info">
                <h2>The following errors were found</h2>
                <ul>
                  {validationErrors.map((error) => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
          </form>
        </div>
        <div className="pin-button-container">
          <div className="pin-delete-button" onClick={handleClick}>
            Delete
          </div>
          <div className="pin-cancel-button" onClick={(e) => closeModal(e)}>
            Cancel
          </div>
        </div>
      </div>
    )
  );
}

export default CreatedPinModal;
