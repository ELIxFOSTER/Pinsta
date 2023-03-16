import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getFilteredPins } from "../../store/pins";

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch()
  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault();
    // handle search here
    dispatch(getFilteredPins({str: searchTerm}))
    history.push('/filtered')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
    </form>
  );
}

export default SearchBar;
