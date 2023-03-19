import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { get_all_boards } from "../../store/board";
import { deletePinThunk } from "../../store/pins";
import { getCurrentUserPins } from "../../store/pins";
import { NavLink } from "react-router-dom";
import './CreatedPinModal.css'

function CreatedPinModal({ pin }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();




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
    <div className='pin-modal-wrapper'>
      <div>Edit This Pin</div>
      <div>
        <img src={pin.imageUrl}></img>
      </div>
      <div className='pin-button-container'>
        <div className='pin-delete-button'onClick={handleClick}>Delete</div>
        <div className='pin-cancel-button' onClick={(e) => closeModal(e)}>Cancel</div>
        <NavLink to={`/edit-pin/${pin.id}`}>
        <div className='pin-edit-button' onClick={(e) => closeModal(e)}>Edit</div>
        </NavLink>
      </div>
    </div>
  );
}

export default CreatedPinModal;
