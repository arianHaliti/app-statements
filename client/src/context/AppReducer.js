import { isDate } from "../utils/format";

export default (state, action) => {
  switch (action.type) {
    case "GET_TRANSACTIONS":
      return {
        ...state,
        loading: false,
        transactions: action.payload,
      };
    case "GET_TOTAL":
      return {
        ...state,
        totalTranscations: action.payload,
      };
    case "CHANGE_DATE":
      return {
        ...state,
        dateFilter:action.payload
      }
    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction._id !== action.payload
        ),
        totalTranscations: state.totalTranscations.filter(
          (transaction) => transaction._id !== action.payload
        ),
      };
    case "ADD_TRANSACTION":
      let date = null;
      if(!isDate(state.dateFilter)) date = new Date();
      else date = new Date(state.dateFilter);
      let date_c = action.payload.date;
      date_c = new Date(date_c);
      // console.log(date_c);
      // console.log(date.getYear(),date_c.getYear());
     
      // console.log('insert');
     
      // date = new Date(date);
      // date_c = new Date(date_c)
      // console.log(date.getMonth(), date_c.getMonth());
        let change = ( (date_c.getMonth() == date.getMonth()) && (date_c.getYear() == date.getYear())) ? [...state.transactions, action.payload] : [...state.transactions]  
        return {
          ...state,
          transactions: change,
          loading: false,
          totalTranscations: [...state.totalTranscations, action.payload],
        };
    case "TRANSACTION_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
