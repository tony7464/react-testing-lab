import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";
import Sort from "./Sort";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("description");
  const [loadError, setLoadError] = useState("");
  const [saveError, setSaveError] = useState("");

  // Load transactions once when the app starts
  useEffect(() => {
    fetch("http://localhost:6001/transactions")
      .then((r) => {
        if (!r.ok) throw new Error("Load failed");
        return r.json();
      })
      .then((data) => setTransactions(data))
      .catch(() => setLoadError("Could not load transactions"));
  }, []);

  // POST a new transaction, then add the saved record to local state
  function postTransaction(newTransaction) {
    setSaveError("");
    fetch("http://localhost:6001/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    })
      .then((r) => {
        if (!r.ok) throw new Error("Save failed");
        return r.json();
      })
      .then((data) => setTransactions((current) => [...current, data]))
      .catch(() => setSaveError("Could not add transaction"));
  }

  function onSort(value) {
    setSortBy(value);
  }

  // Filter by description or category, then sort if a sort option is selected
  const displayedTransactions = transactions
    .filter((transaction) => {
      const query = search.toLowerCase();
      return (
        transaction.description.toLowerCase().includes(query) ||
        transaction.category.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      if (!sortBy) return 0;
      return a[sortBy].localeCompare(b[sortBy]);
    });

  return (
    <div className="account">
      <Search setSearch={setSearch} />
      <AddTransactionForm postTransaction={postTransaction} />
      {saveError ? <p className="status-error">{saveError}</p> : null}
      {loadError ? <p className="status-error">{loadError}</p> : null}
      <div className="toolbar">
        <h3>Recent activity</h3>
        <Sort onSort={onSort} />
      </div>
      <TransactionsList transactions={displayedTransactions} />
    </div>
  );
}

export default AccountContainer;
