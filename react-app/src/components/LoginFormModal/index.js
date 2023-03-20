
import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import logo from "../../images/logo.png";
import "./LoginForm.css";
import { get_all_boards } from "../../store/board";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const demoUser = async (e) => {
    e.preventDefault();
    const password = "password";
    const credential = "demo@aa.io";
    const response = await dispatch(login(credential, password));
    dispatch(get_all_boards())
    closeModal()
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      dispatch(get_all_boards());
      closeModal();
    }
  };

  return (
    <div className="login-modal-wrapper">
      <img id="navlogo" src={logo}></img>
      <div className='login-title'>
        <h1>Welcome to Pinsta</h1>
      </div>
      <div className="login-form-container">
        <form className='login-form' onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <label>
            Email
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          <label>
            Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          <button type="submit">Log In</button>
        </form>
      </div>
      <div>
        <div>Or</div>
        <button onClick={demoUser}>Demo User</button>
      </div>
    </div>
  );
}

export default LoginFormModal;
