import TransactionsTableHeaders from "./TransactionsTableHeaders";
import TransactionsBody from "../features/transactions/TransactionsBody";
import { Link } from "react-router-dom";

const TransactionsTable = () => {

  return (
    <div>
      <div  className="flex gap-4 items-center mb-10">
        <h2 className="font-bold text-xl">Transactions History</h2>
        <Link className="btn btn--primary" to="/create">Add New</Link>
      </div>
      <table>
        <TransactionsTableHeaders />
        <TransactionsBody />
      </table>
    </div>
  )
}

export default TransactionsTable;
