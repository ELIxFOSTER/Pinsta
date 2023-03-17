import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import logo from "../../images/logo.png";
import SearchBar from "./Searchbar";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const location = useLocation();

  const homeButtonClasses = ["home-button"];
  if (location.pathname === "/") {
    homeButtonClasses.push("home-button-active");
  }

  const homeTextClasses = ["home-text"];
  if (location.pathname === "/") {
    homeTextClasses.push("home-text-active");
  }

  return (
    <div className='navbar-wrapper'>
      <div className='navbar-left-section-container'>
        <div>
          <img id="navlogo" src={logo}></img>
        </div>
        <div className={homeButtonClasses.join(" ")}>
      <NavLink exact to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <div className={homeTextClasses.join(" ")}>Home</div>
      </NavLink>
    </div>
        <div className='create-button'>
          <NavLink exact to='/pin-builder' style={{ textDecoration: "none", color: "inherit" }}>
            <div className='create-button'>Create</div>
          </NavLink>
        </div>
      </div>
	  <div>
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
