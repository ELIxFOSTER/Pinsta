import React, {useEffect, useState, useRef} from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import logo from "../../images/logo.png";
import SearchBar from "./Searchbar";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef()
  const location = useLocation();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

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

  const homeButtonClasses = ["home-button"];
  if (location.pathname === "/") {
    homeButtonClasses.push("home-button-active");
  }

  const homeTextClasses = ["home-text"];
  if (location.pathname === "/") {
    homeTextClasses.push("home-text-active");
  }

  const ulClassName = "create-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <div className='navbar-wrapper'>
      <div className='navbar-left-section-container'>
        <NavLink to='/'>
        <div>
          <img id="navlogo" src={logo}></img>
        </div>
        </NavLink>
        <div className={homeButtonClasses.join(" ")}>
      <NavLink exact to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <div className={homeTextClasses.join(" ")}>Home</div>
      </NavLink>
    </div>
        <div onClick={openMenu} className='create-buttons-container'>
            <div className='create-button'>Create</div>
            <i className="fa-solid fa-angle-down"></i>
        </div>
        <div className={ulClassName} ref={ulRef}>
          <>
          <NavLink exact to='/pin-builder' style={{ textDecoration: "none", color: "inherit" }}>
            <div onClick={closeMenu} className='create-pin-button'>Create Pin</div>
          </NavLink>
          </>
        </div>
      </div>
	  <div className="navbar-center">
		<SearchBar />
	  </div>
      <div className='navbar-right-section-container'>
        {isLoaded && (
          <div className='profile-button-box'>
            <ProfileButton user={sessionUser} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Navigation;
