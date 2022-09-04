import React, { useContext, useEffect, useState } from "react";
import { Transaction } from "./Transaction";

import { GlobalContext } from "../context/GlobalState";
import { formatDate } from "../utils/format";
import Spinner from "./Spinner";

export const TransactionList = () => {
  const { transactions, getTransactions, getTotal, changeDate, dateFilter, loading } =
    useContext(GlobalContext);

  const setDateFilter = (e) => {
    changeDate(e);
    getTransactions(e);
  };
  useEffect(() => {
    getTransactions();
    getTotal();
    changeDate();
  }, []);
  
  let date = new Date();
  if(dateFilter) date = new Date(dateFilter);
  const month = date.toLocaleString('default', { month: 'long' });
  // console.log(date.g);
  return (
    <>
      <h3>
        Statement List for month of {month}{" "} 
        <input
          type="date"
          name="date-filter"
          id="date-filter"
          placeholder="Statement date..."
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </h3>
      <ul className="list">
        {loading ? (
          <Spinner />
        ) : transactions.length > 0 ? (
          transactions.map((transaction) => (
            <Transaction key={transaction._id} transaction={transaction} />
          ))
        ) : (
          <h4 className="center">No Statments for this month</h4>
        )}
      </ul>
    </>
  );
};
