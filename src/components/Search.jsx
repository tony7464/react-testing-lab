import React from "react";

// Updates search text in AccountContainer so the list can be filtered
function Search({setSearch}) {
  return (
    <div className="ui large fluid icon input">
      <input
        type="text"
        placeholder="Search your Recent Transactions"
        onChange={(e) => setSearch(e.target.value)}
      />
      <i className="circular search link icon"></i>
    </div>
  );
}

export default Search;
