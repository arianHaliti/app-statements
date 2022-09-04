import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import { numberWithCommas } from "../utils/format";

export const IncomeExpenses = ({ type }) => {
  const { transactions, getTotal, totalTranscations } =
    useContext(GlobalContext);

  const amounts =
    type === "monthly"
      ? transactions.map((transaction) => transaction.amount)
      : totalTranscations.map((transaction) => transaction.amount);
  // const amounts = transactions.map(transaction => transaction.amount);
  // console.log(totalTranscations);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const spendings = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  return (
    <div className="total-statments-container flex-child green ">
      <div>
        <h4>Income</h4>
        <p className="money plus">{numberWithCommas(income)}€</p>
      </div>
      <div>
        <h4>Spendings</h4>
        <p className="money minus">{numberWithCommas(spendings)}€</p>
      </div>
    </div>
  );
};
