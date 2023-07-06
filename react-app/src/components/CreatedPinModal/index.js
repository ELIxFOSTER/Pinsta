import React, { useState } from "react";
// import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
// import { get_all_boards } from "../../store/board";
import { deletePinThunk } from "../../store/pins";
// import { getCurrentUserPins } from "../../store/pins";
// import { NavLink } from "react-router-dom";

import "./CreatedPinModal.css";
import { editPinThunk } from "../../store/pins";

function CreatedPinModal({ pin }) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState(pin.title);
  const [description, setDescription] = useState(pin.description);
  const [hasSubmitted, setSubmitted] = useState(false);
  const [validationErrors, setErrors] = useState([]);

  const imageUrl = pin.imageUrl;

  const { closeModal } = useModal();

  const editSubmit = async (e) => {
    e.preventDefault();

    const editedData = {
      title,
      description,
      imageUrl,
    };

    const response = await dispatch(editPinThunk(editedData, pin.id));
    if (response && response.errors) {
      setErrors(response.errors);
      // closeModal()
    } else {
      setTitle("");
      setDescription("");
      setErrors([]);
      setSubmitted(false);
      closeModal();
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    await dispatch(deletePinThunk(pin.id));
    closeModal();
  };

  // return (
  //   pin && (
  //     <div className="form-containers">
  //       <div className="form-contents">
  //       <div>Edit This Pin</div>
        // {validationErrors.length > 0 && (
        //       <div className="errors-info">
        //         <div>
        //           {validationErrors.map((error) => (
        //             <div key={error}>{error}</div>
        //           ))}
        //         </div>
        //       </div>
        //     )}
          // <img src={pin.imageUrl}></img>
  // <form onSubmit={editSubmit}>
  //   <input
  //     type="text"
  //     name="title"
  //     value={title}
  //     onChange={(e) => setTitle(e.target.value)}
  //     placeholder="title"
  //     required
  //   />
  //   <textarea
  //     type="text"
  //     name="description"
  //     value={description}
  //     onChange={(e) => setDescription(e.target.value)}
  //     placeholder="description"
  //     required
  //   />
  //   <button>Submit</button>
  // </form>

  //       <div  className="pin-button-container">
  // <div className="pin-delete-button" onClick={handleClick}>
  //   Delete
  // </div>
  // <div className="pin-cancel-button" onClick={(e) => closeModal(e)}>
  //   Cancel
  // </div>;
  //       </div>
  //       </div>
  //     </div>
  //   )
  // );

  return (
    pin && (
      <div className="mypin-edit-modal-wrapper">
        <div className='edit-this-pin-text'>Edit This Pin</div>
        {validationErrors.length > 0 && (
              <div className="errors-info">
                <div>
                  {validationErrors.map((error) => (
                    <div key={error}>{error}</div>
                  ))}
                </div>
              </div>
            )}
        <div className='mypin-edit-modal-form-container'>
          <form onSubmit={editSubmit}>
            <div className='myedit-input-box-1'>
            <label id='label-one'>Title</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title here"
              required
              />
            </div>
            <div className='myedit-input-box-2'>
            <label id='label-two'>Description</label>
            <textarea
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Pin description"
              required
              />
            </div>
          </form>
          <img src={pin.imageUrl}></img>
        </div>
        <div className="mypin-edit-buttons-container">
          <div className="pin-delete-button" onClick={handleClick}>
            Delete
          </div>
          <div className='mypin-edit-button-right-section-container'>
          <div className="pin-cancel-button" onClick={(e) => closeModal(e)}>
            Cancel
          </div>
            <button type='submit' className='pin-save-button' onClick={editSubmit}>Save</button>
          </div>
        </div>
      </div>
    )
  );
}

export default CreatedPinModal;
