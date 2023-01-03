import { useSelector } from "react-redux";
import { selectTransactionById } from "../features/transactions/transactionsSlice";
import { dateFormatter } from "../lib/helpers";

function MainTransaction({ id }) {

  const transaction = useSelector(state => selectTransactionById(state, id));

  return (
    <div>
      <div>
        <h2 className="mb-1">
          <span>{transaction?.description}</span>
          </h2>
        <p className="mb-1">
            <span>Transacted: </span>
            <span>{transaction?.date ? dateFormatter(transaction.date) : null}</span>
        </p>
        <p className="mb-1">
          <span className="capitalize">{transaction?.type} Amount: </span>
          <span>{transaction?.amount}</span>
        </p>
      </div>
    </div>
  )
}

export default MainTransaction;
