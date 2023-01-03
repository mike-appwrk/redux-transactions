import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { dateFormatter } from "../../lib/helpers";
import { selectTransactions, getTransactions } from "./transactionsSlice";

const TransactionsBody = () => {

  const dispatch = useDispatch();
  const status = useSelector(state => state.transactions.status);

  useEffect(() => {
    if (status === 'idle'){
      dispatch(getTransactions())
    }
  }, [dispatch])

  const transactions = useSelector(selectTransactions); 

  return (
      <tbody>
        {transactions.map((transaction, index) => (
          <tr id={transaction._id} key={`${transaction._id}-${index}`} className="odd:bg-white even:bg-primary-400 cursor-pointer" onClick={() => navigate(`/transaction/${id}`)}>
            <td className="pr-16 pl-8 py-4 capitalize">{transaction?.description}</td>
            <td className="pr-16 pl-8 py-4 capitalize">{dateFormatter(transaction?.date)}</td>
            <td className="pr-16 pl-8 py-4 capitalize">{transaction.type === 'credit' ? transaction.amount : '-'}</td>
            <td className="pr-16 pl-8 py-4 capitalize">{transaction.type === 'debit' ? transaction.amount : '-'}</td>
            <td className="pr-16 pl-8 py-4 capitalize">{transaction.balance}</td>
            <td className="pr-16 pl-8 py-4 capitalize"><Link to={`/transaction/${transaction._id}`}>View</Link></td>
         </tr>
        ))}
      </tbody>
  )
}

export default TransactionsBody;
