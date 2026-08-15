import React from "react";
import Transaction from "./Transaction";

function TransactionsList({ transactions }) {
  const transactionComponent = transactions.map((transaction) => {
    return <Transaction key={transaction.id} transaction={transaction} />;
  });
  return (
    <div className="table-card">
      <table className="ledger">
        <tbody>
          <tr>
            <th>
              <h3>Date</h3>
            </th>
            <th>
              <h3>Description</h3>
            </th>
            <th>
              <h3>Category</h3>
            </th>
            <th>
              <h3>Amount</h3>
            </th>
          </tr>
          {transactionComponent}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionsList;
