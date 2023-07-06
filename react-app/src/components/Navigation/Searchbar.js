import { FaSearch } from "react-icons/fa";
import "./Searchbar.css";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { getFilteredPins } from "../../store/pins";

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === '/pin-builder' || location.pathname === '/myprofile' ) {
      setSearchTerm("");
    }
  }, [location]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getFilteredPins({ str: searchTerm }));
    history.push("/filtered");
  }

  function handleFocus() {
    setIsFocused(true);
  }

  function handleBlur() {
    setIsFocused(false);
  }

  return (
    <div className="search-container">
    <form className="form-search" onSubmit={handleSubmit}>

        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search by pin name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="search-input"
        />

    </form>
    </div>
  );
}

export default SearchBar;
