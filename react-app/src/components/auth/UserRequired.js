import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import LoginFormModal from '../LoginFormModal';
import OpenedModal from '../OpenedModal';

const UserRequired = ({ children, ...rest }) => {
  const user = useSelector(state => state.session.user);
  const isLoggedIn = !!user
  const ulRef = useRef()

  const [showMenu, setShowMenu] = useState(false);

  const closeMenu = () => setShowMenu(false);

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

  return (
    <Route {...rest}>
      {user ? children : <Redirect to="/" />}
      {!user && (
        <OpenedModal
          buttonText="Log In"
          onItemClick={closeMenu}
          modalComponent={<LoginFormModal />}
        />
      )}
    </Route>
  );
};

export default UserRequired;
