import React from "react";
import AccountContainer from "./AccountContainer";

function App() {
  return (
    <div className="app-shell">
      <div className="app-header">
        <div>
          <span className="header-kicker">Est. 2024</span>
          <h2>The Royal Bank of Flatiron</h2>
        </div>
        <span className="header-badge">Personal ledger</span>
      </div>
      <AccountContainer />
    </div>
  );
}

export default App;
