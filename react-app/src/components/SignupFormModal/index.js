
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import { useEffect } from "react";
import LoginFormModal from "../LoginFormModal";
import logo from "../../images/logo.png";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      } else {
        closeModal();
      }
    } else {
      setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
    }
  };

  useEffect(() => {
    const errors = [];
    if (username.length < 6)
      errors.push("Username must be atleast 6 characters");
      if (username.length > 60) errors.push('Username is too long')
    if (!email.includes("@")) errors.push("Must be a valid email");
    if (password.length > 100) errors.push('password is too long')
    if (password.length < 6)
      errors.push("Password must atleast be 6 characters");
    setErrors(errors);
  }, [username, email, password]);

  return (
    <div className='signup-modal-wrapper'>
      <img id="navlogo-signup" src={logo}></img>
      <div className='titles-container'>
        <h1 className='signup-title'>Welcome to Pinsta</h1>
      <div>Find new ideas to try</div>
      </div>
      <div className='signup-form-container'>
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
            placeholder='Email'
            required
          />
        <label>
          Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Username'
            required
          />
        <label>
          Password
          </label>
          <input
            type="password"
            value={password}
            placeholder='Create a password'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        <label>
          Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirm password'
            required
          />
        <button
          disabled={
            username.length > 40 ||
            username.length < 6 ||
            password.length > 40 ||
            password.length < 6 ||
            email.length > 255 ||
            !email.includes("@")
          }
          type="submit"
          className='continue-button'
        >
          Continue
        </button>
      </form>
      </div>
    </div>
  );
}

export default SignupFormModal;
