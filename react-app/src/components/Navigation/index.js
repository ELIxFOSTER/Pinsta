import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import logo from "../../images/logo.png";
import SearchBar from "./Searchbar";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className='navbar-wrapper'>
      <div className='navbar-left-section-container'>
        <div>
          <img id="navlogo" src={logo}></img>
        </div>
        <div>
          <NavLink exact to="/">
            Home
          </NavLink>
        </div>
        <div>
          <NavLink exact to='/pin-builder'>
            <div>Create</div>
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
