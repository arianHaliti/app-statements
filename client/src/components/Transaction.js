import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { formatDate, numberWithCommas } from "../utils/format";

export const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext);
  let date = new Date(transaction.date);
  let formatedDate = formatDate(date);
  // let day = date.getDate();
  // let month = date.getMonth() +1;
  // let year = date.getFullYear();
  return (
    <li>
      <span style={{ width: "400px" }}>{transaction.text}</span>{" "}
      <span style={{ width: "30px" }}>{formatedDate}</span>{" "}
      <span className={transaction.amount < 0 ? "red-txt" : "green-txt"}>
        {numberWithCommas(transaction.amount)}€
      </span>{" "}
      <button
        onClick={() => deleteTransaction(transaction._id)}
        className="delete-btn"
      >
        x
      </button>
    </li>
  );
};
