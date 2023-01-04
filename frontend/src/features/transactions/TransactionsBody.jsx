import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { dateFormatter } from "../../lib/helpers";
import { selectSortedTransactions } from "./transactionsSlice";

const TransactionsBody = () => {

  const navigate = useNavigate();

  const transactions = useSelector(selectSortedTransactions); 

  let balance = 0;

  const transactionsWithBalance = transactions.map((transaction) => {
    balance = transaction.type === 'credit' ? balance + parseInt(transaction.amount) : balance - parseInt(transaction.amount);
    console.log({ balance })
    return {
      ...transaction,
      balance
    }
  }).reverse();

  return (
      <tbody>
        {transactionsWithBalance.map((transaction, index) => (
          <tr id={transaction._id} key={`${transaction._id}-${index}`} className="odd:bg-white even:bg-primary-400 cursor-pointer" 
            onClick={() => navigate(`/transactions/${transaction._id}`)}
          >
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
