import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { nanoid } from '@reduxjs/toolkit'
import Input from "./elements/Input";
import Label from "./elements/Label";
import Select from "./elements/Select";
import { validateFormData } from "../lib/helpers";
import { createTransaction } from "../api";
import { transactionCreated } from "../features/transactions/transactionsSlice";
import { useDispatch } from "react-redux";

function CreateForm () {

  const dispatch = useDispatch();

  const [state, setState] = useState({
    loading: false,
    transaction: {
      description: '',
      amount: 0,
      type: 'credit',
      date: ''
    },
    error: false
  });

  const navigate = useNavigate();

  function handleFormSubmit(e) {
    e.preventDefault();

    const validationErrors = validateFormData(state.transaction);
    if (validationErrors.length) {
      setState({
        ...state,
        error: validationErrors
      });
      return;
    }

    async function postTransaction() {
      setState({ ...state, loading: true })
      try {
        const res = await createTransaction(state.transaction);
        if (res.status === 400){
          const json = await res.json();
          setState({ ...state, loading: false, error: json?.errors })
          return;
        }
        const newTransaction = await res.json();
        console.log({ newTransaction })
        dispatch(transactionCreated(newTransaction));
        return navigate(`/`);
      } catch (error) {
        const { message } = error;
        console.log({message: error.message});
        setState({ ...state, loading: false, error: { message } })
      }
    }

    postTransaction();

  }

  function handleChange(e) {
    
    let value = e.target.value;
    if (e.target.type === 'number') value = parseInt(value) || '';
    const updatedTransaction = {...state.transaction, [e.target.name]: value}
    setState({
      ...state,
      transaction: updatedTransaction
    });
  }

  function handleClear() {
    const updatedTransaction = {
      description: '',
      amount: 0,
      type: 'credit',
      date: ''
    };
    setState({
      ...state,
      transaction: updatedTransaction
    });
  }

  const { loading, transaction, error } = state;

  return (
    <div className="p-12 bg-white">
      <h2 className="mb-8 text-lg font-bold">Add A Transaction</h2>
      <form onSubmit={handleFormSubmit}>
        {error.length ? (
          error.map((error) => (
            <p className="text-md text-red-700 my-2" key={nanoid()}>{error.msg}</p>
            ))
          ): null
        }
        {error.message ? <p>Server is down. Please try after some time!</p> : null}
        <div className="mb-4">
          <Label htmlFor="type">Transaction Type</Label>
          <Select id="type" name="type" value={transaction.type} onChange={handleChange}>
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
          </Select>
        </div>
        
        <div className="mb-4">
          <Label htmlFor="amount">Amount</Label>
          <Input type="number" id="amount" name="amount" value={transaction.amount} onChange={handleChange}/>
        </div>
        <div className="mb-4">
          <Label htmlFor="description">Description</Label>
          <Input type="text" id="description" name="description" value={transaction.description} onChange={handleChange} />
        </div>

        <div className="mb-4">
          <Label htmlFor="date">Date</Label>
          <Input type="date" id="date" name="date" value={transaction.date} onChange={handleChange} />
        </div>

        <div className="flex gap-4 mt-8">
          <button type="submit" className="btn btn--primary">Submit</button>
          
          <button type="button" onClick={handleClear} className="btn btn--secondary">Clear</button>
          {loading ? 'Loading...' : null}
        </div>
      </form>
    </div>
  )
}
export default CreateForm;
