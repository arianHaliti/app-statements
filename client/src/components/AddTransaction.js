import React, {useState, useContext} from 'react'
import { GlobalContext } from '../context/GlobalState';
import { formatDate } from '../utils/format';

export const  AddTransaction = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState( new Date());

  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = e => {
    e.preventDefault();

    const newTransaction = {
      text,
      amount: +amount,
      date:new Date(date)
    }

    addTransaction(newTransaction);
  }

  return (
    <>
      <h3>Add new transaction</h3>
      <form className="income-form" onSubmit={onSubmit}>

      <div className="form-inner">
        <input type="text" value={text}  placeholder="Transaction name..." onChange={(e) => setText(e.target.value)} /> 
        <input type="number" name="price" id="price" placeholder="Price..." onChange={(e) => setAmount(e.target.value)}/>
        <input type="date" name="date" id="date" placeholder="Statement date..." onChange={(e) => setDate(e.target.value)} />
        <input type="submit" value="Add Statement" />
      </div>
      </form>
    </>
  )
}
