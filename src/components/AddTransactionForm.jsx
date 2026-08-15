import React from "react";

function AddTransactionForm({ postTransaction }) {
  // Collect form values and send them to AccountContainer to POST
  function submitForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const description = formData.get("description")?.trim();

    // Skip empty submits so we do not POST blank rows
    if (!description) return;

    const newTransaction = {
      date: formData.get("date"),
      description,
      category: formData.get("category"),
      amount: formData.get("amount"),
    };
    postTransaction(newTransaction);
  }

  return (
    <div className="form-card">
      <h3>Add a transaction</h3>
      <form onSubmit={(e) => submitForm(e)}>
        <div className="form-grid">
          <input type="date" name="date" />
          <input type="text" name="description" placeholder="Description" />
          <input type="text" name="category" placeholder="Category" />
          <input type="number" name="amount" placeholder="Amount" step="0.01" />
        </div>
        <button className="add-btn" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
