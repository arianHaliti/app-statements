import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";
import { isDate } from "../utils/format";

const initialState = {
  transactions: [],
  totalTranscations: [],
  dateFilter: new Date(),
  error: null,
  loading: true,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  async function getTransactions(date) {
    try {
      if(!date) date = "";
      state.loading = true;
      const res = await axios.get(`/api/statements/${date}`);

      dispatch({
        type: "GET_TRANSACTIONS",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response.data.error,
      });
    }
  }
  function changeDate(date) {
    try {
      dispatch({
        type: "CHANGE_DATE",
        payload: date,
      });
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error.response.data.error,
      });
    }
  }
  async function getTotal() {
    try {
      const res = await axios.get("/api/statements/getTotal/all");

      dispatch({
        type: "GET_TOTAL",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response.data.error,
      });
    }
  }
  async function deleteTransaction(id) {
    try {
      await axios.delete(`/api/statements/${id}`);

      dispatch({
        type: "DELETE_TRANSACTION",
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  async function addTransaction(transaction) {
    try {
      // console.log(state);return;

      // return;
      const res = await axios.post("/api/statements", transaction, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({
        type: "ADD_TRANSACTION",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response.data.error,
        date: state.dateFilter
      });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        totalTranscations: state.totalTranscations,
        getTransactions,
        deleteTransaction,
        addTransaction,
        getTotal,
        dateFilter: state.dateFilter,
        changeDate,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
