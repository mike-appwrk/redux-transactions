import { useSelector } from "react-redux";
import { selectSortedTransactions } from "./transactionsSlice";
import TransactionEntity from "../../components/TransactionEntity";

const TransactionsEditorBody = ({ modalTransactionIdUpdater }) => {

  const transactions = useSelector(selectSortedTransactions); 
  
  let balance = 0;

  const transactionSorted = [...transactions];

  const transactionsWithBalance = transactionSorted.map((transaction) => {
    balance = transaction.type === 'credit' ? balance + parseInt(transaction.amount) : balance - parseInt(transaction.amount);
    console.log({ balance })
    return {
      ...transaction,
      balance
    }
  }).reverse()

  return (
      <tbody>
        {transactionsWithBalance.map((transaction, index) => {
          const id = transaction['_id'];
          return (
            <TransactionEntity balance={balance} modalTransactionIdUpdater={modalTransactionIdUpdater} id={id} index={index} key={`${id}-${index}`} transaction={transaction}/>
          )
        })}
      </tbody>
  )
}

export default TransactionsEditorBody;
