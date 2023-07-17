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
          <NavLink exact to='/pin-builder' style={{ textDecoration: "none", color: "inherit", fontWeight: '500'}}>
            Create Pin
          </NavLink>



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
