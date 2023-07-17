import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { NavLink, Redirect } from "react-router-dom";
import { removeUserBoards } from "../../store/board";
import { useHistory } from "react-router-dom";

export default function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();

  const toggleMenu = () => setShowMenu(!showMenu);

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

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(removeUserBoards());
    dispatch(logout());
    history.push("/");
  };

  const onClickHandler = (e) => {
    e.preventDefault()
    history.push('/myprofile')
    setShowMenu(false)
  }

  const onClickHandlerPins = (e) => {
    e.preventDefault()
    history.push('/created-pins')
    setShowMenu(false)
  }

  const ulClassName = "profile-arrow-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <div ref={ulRef}>
        {user ? (
          <>
          <div className="nav-profile-section-container">
            <div>
              <NavLink to='/myprofile' style={{ textDecoration: "none", color: "inherit" }}>
              <button className="profile-button">
                {user.username.slice(0, 1)}
              </button>
              </NavLink>
            </div>
            <div className="profile-dropdown-container">
              <i className="fa-solid fa-angle-down" onClick={toggleMenu}></i>
            </div>
          </div>
          <div className={ulClassName}>
              {/* <div>{user.username}</div>
              <div>{user.email}</div>
              <div>
                <button onClick={handleLogout}>Log Out</button>
              </div> */}
              <div className='currently-in'>Currently in</div>
              <div className='nav-profile-arrow-dropdown-container'>
              <button className="dropdown-profile-button">
                {user.username.slice(0, 1)}
              </button>
              <div>
                <div className='dropdown-username'>{user.username}</div>
                <div className='dropdown-profile-type'>Personal</div>
                <div className='dropdown-email'>{user.email}</div>
              </div>
              <i className="fa-solid fa-check"></i>
              </div>
              <div className='logout-dropdown-button' onClick={onClickHandler}>My boards</div>
              <div className='logout-dropdown-button' onClick={onClickHandlerPins}>My Pins</div>
              <div onClick={handleLogout} className='logout-dropdown-button'>Log out</div>
            </div>
          </>
        ) : (
          <div className="signup-login-button-container">
            <div>
              <OpenModalButton
                buttonText="Log In"
                onItemClick={toggleMenu}
                modalComponent={<LoginFormModal />}
                styleOption="nav-login-button"
              />
            </div>
            <div>
              <OpenModalButton
                buttonText="Sign Up"
                onItemClick={toggleMenu}
                modalComponent={<SignupFormModal />}
                styleOption="nav-signup-button"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
