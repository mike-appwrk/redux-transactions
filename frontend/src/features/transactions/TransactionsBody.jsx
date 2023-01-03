import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { dateFormatter } from "../../lib/helpers";
import { selectTransactions } from "./transactionsSlice";

const TransactionsBody = () => {

  const transactions = useSelector(selectTransactions); 
  const transactionsReversed = [...transactions].reverse();

  return (
      <tbody>
        {transactionsReversed.map((transaction, index) => (
          <tr id={transaction._id} key={`${transaction._id}-${index}`} className="odd:bg-white even:bg-primary-400 cursor-pointer" onClick={() => navigate(`/transaction/${id}`)}>
            <td className="pr-16 pl-8 py-4 capitalize">{transaction?.description}</td>
            <td className="pr-16 pl-8 py-4 capitalize">{dateFormatter(transaction?.date)}</td>
            <td className="pr-16 pl-8 py-4 capitalize">{transaction.type === 'credit' ? transaction.amount : '-'}</td>
            <td className="pr-16 pl-8 py-4 capitalize">{transaction.type === 'debit' ? transaction.amount : '-'}</td>
            <td className="pr-16 pl-8 py-4 capitalize"><Link to={`/transaction/${transaction._id}`}>View</Link></td>
         </tr>
        ))}
      </tbody>
  )
}

export default TransactionsBody;
