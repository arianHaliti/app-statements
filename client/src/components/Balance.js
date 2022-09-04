import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';

export const Balance = ({type}) => {
  const { transactions, getTotal, totalTranscations } = useContext(GlobalContext);
  const amounts =  type === 'monthly' ? transactions.map(transaction => transaction.amount):totalTranscations.map(transaction => transaction.amount) ;
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  return (
    <div className="flex-child magenta">
      <h4>{type==='all' ?  'Total' : 'Monthly'} Balance</h4>
    <h1>{numberWithCommas(total)}€</h1>

      <h4>Number of transactions:{ type === 'monthly' ? transactions.length : totalTranscations.length}</h4>
   
    </div>
  )
}
