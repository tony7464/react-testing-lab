import React from "react";

// Updates search text in AccountContainer so the list can be filtered
function Search({ setSearch }) {
  return (
    <div className="search-bar">
      <span className="search-icon" aria-hidden="true">
        ⌕
      </span>
      <input
        type="text"
        placeholder="Search your Recent Transactions"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default Search;
