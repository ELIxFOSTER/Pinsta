import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setSubmitted] = useState([])


  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitted(true)
    if(errors.length) return "Your sign up has errors"

    if (password === confirmPassword) {
        const data = await dispatch(signUp(username, email, password));
        if (data) {
          setErrors(data)
        }
    } else {
        setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };

  useEffect(() => {
    const errors = []
    if(username.length < 6) errors.push('Username must be atleast 6 characters')
    if(!(email.includes('@'))) errors.push("Must be a valid email")
    if(password.length < 6) errors.push('Password must atleast be 6 characters')
    setErrors(errors)
  }, [username,email, password])

  if (sessionUser) return <Redirect to="/" />;

  return (
    <>
      <h1>Sign Up</h1>
      {/* {
        hasSubmitted && errors.length > 0 && (
          <div className='errors-info'>
              <h2>The following errors were found</h2>
              <ul>
                  {errors.map(error => (
                  <li key={error}>{error}</li>
                  ))}
              </ul>
          </div>
      )
      } */}
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button disabled={username.length > 40 || username.length < 6 || password.length > 40 || password.length < 6 || email.length > 255 || !(email.includes('@'))} type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormPage;
