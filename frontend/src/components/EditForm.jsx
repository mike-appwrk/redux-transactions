import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { nanoid } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from "react-redux";
import { validateFormData } from "../lib/helpers";
import { updateTransaction } from "../api";
import { selectTransactionById, transactionUpdated } from "../features/transactions/transactionsSlice";
import { dateFormatter } from "../lib/helpers";
import Input from "./elements/Input";
import Label from "./elements/Label";
import Select from "./elements/Select";

const EditForm = ({ id }) => {

  const dispatch = useDispatch();

  const selectedTransaction = useSelector(state => selectTransactionById(state, id));

  const [state, setState] = useState({
    loading: false,
    transaction: selectedTransaction,
    error: false
  });

  useEffect(() => {
    setState({
      ...state,
      transaction: selectedTransaction
    })
  }, [selectedTransaction]);

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

    async function patchTransaction() {
      setState({ ...state, loading: true })
      try {
        const res = await updateTransaction(state.transaction, id);
        if (res.status === 400){
          const json = await res.json();
          setState({ ...state, loading: false, error: json?.errors })
          return;
        }
        const updatedTransaction = await res.json();
        dispatch(transactionUpdated(updatedTransaction));
        return navigate(`/`);
      } catch (error) {
        const { message } = error;
        console.log({message: error.message});
        setState({ ...state, loading: false, error: { message } })
      }
    }
    patchTransaction();
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

  function handleReset() {
    setState({
      ...state,
      transaction: selectedTransaction
    });
  }

  const { loading, transaction, error } = state;

  return (
    <div>
      {loading ? (
        <p>Loading..</p>
      ) :
      <div className="p-12 bg-white">
        <h2 className="mb-8 text-lg font-bold">Update Transaction</h2>
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
            <Select id="type" name="type" value={transaction?.type} onChange={handleChange}>
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </Select>
          </div>
          
          <div className="mb-4">
            <Label htmlFor="amount">Amount</Label>
            <Input type="number" id="amount" name="amount" value={transaction?.amount} onChange={handleChange}/>
          </div>
          <div className="mb-4">
            <Label htmlFor="description">Description</Label>
            <Input type="text" id="description" name="description" value={transaction?.description} onChange={handleChange} />
          </div>

          <div className="mb-4">
            <Label htmlFor="date">Date</Label>
            <Input type="date" id="date" name="date" value={dateFormatter(transaction?.date, 'YYYY-MM-DD')} onChange={handleChange} />
          </div>

          <div className="flex gap-4 mt-8">
            <button type="submit" className="btn btn--primary">Submit</button>
            
            <button type="button" onClick={handleReset} className="btn btn--secondary">Reset</button>
            {loading ? 'Loading...' : null}
          </div>
        </form>
      </div>
    }
    </div>
  )
}
export default EditForm;
