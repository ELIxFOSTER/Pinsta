import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { getFilteredPins } from "../../store/pins";
import "./Searchbar.css";

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const filteredPins = useSelector((state) => state.pinsReducer.FiltPins);

  function handleChange(e) {
    const value = e.target.value;
    setSearchTerm(value);
    dispatch(getFilteredPins({ str: value }));
    history.push("/filtered");
  }

  function handlePinClick(pinId) {
    history.push(`/pins/${pinId}`);
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="search-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleChange}
          className="search-input"
        />
        {filteredPins && filteredPins.length > 0 && (
          <ul className="search-results">
            {filteredPins.map((pin) => (
              <li
                key={pin.id}
                onClick={() => handlePinClick(pin.id)}
                className="search-result"
              >
                {pin.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
}

export default SearchBar;
