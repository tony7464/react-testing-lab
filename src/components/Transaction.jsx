import React from "react";

function Transaction({ transaction }) {
  const amountNumber = Number(transaction.amount);
  const isCredit = amountNumber >= 0;

  return (
    <tr>
      <td>{transaction.date}</td>
      <td>{transaction.description}</td>
      <td>
        <span className="category-chip">{transaction.category}</span>
      </td>
      <td className={isCredit ? "amount credit" : "amount debit"}>
        {isCredit ? "+" : ""}
        {amountNumber.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </td>
    </tr>
  );
}

export default Transaction;
