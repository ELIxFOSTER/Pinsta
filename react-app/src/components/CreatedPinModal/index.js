import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { get_all_boards } from "../../store/board";

function CreatedPinModal({ pin }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = await dispatch(login(email, password));
//     if (data) {
//       setErrors(data);
//     } else {
//         dispatch(get_all_boards())
//         closeModal()
//     }
//   };

const handleClick = async(e) => {
    e.preventDefault()

}

  return (
    <div>
        <div>Edit This Pin</div>
        <div>
            <img src={pin.imageUrl}></img>
        </div>
        <div>
            <div>Delete</div>
            <div>Cancel</div>
            <div>Edit</div>
        </div>
    </div>
  );
}

export default CreatedPinModal;
