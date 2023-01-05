import { useState } from "react";
import TransactionsDataTable from "../components/TransactionsDataTable";
import Modal from "../components/Modal";
import { Link } from "react-router-dom";
import { dateFormatter } from "../lib/helpers";
import close from "../icons/close.svg";

const TableFeatures = () => {

  const [ activeTransaction, setActiveTransaction ] = useState(null);

  function activeTransactionUpdater (transaction) {
    setActiveTransaction(transaction);
  }

  return (
    <div>
     <TransactionsDataTable activeTransactionUpdater={activeTransactionUpdater}/>
     {
      activeTransaction ? (
        <Modal>
          <div className="fixed bg-white bottom-0 left-0 w-full px-10 py-4 shadow-2xl flex gap-8 items-center">
            <div className="flex gap-2">
              <span className="font-bold">Description: </span>
              <span className="capitalize">{activeTransaction.description}</span>
            </div>
            <div>
              <span className="font-bold">Transacted on: </span>
              <span>{dateFormatter(activeTransaction.date)}</span>
            </div>
            <div>
              <span className="font-bold">Type: </span>
              <span className="capitalize">{activeTransaction.type}</span>
            </div>
            <div>
              <span className="font-bold">Amount: </span>
              <span className="capitalize">{activeTransaction.amount}</span>
            </div>
            <div className="ml-auto flex gap-2">
              <Link to={`/transactions/${activeTransaction.id}`} className="btn btn--primary">View</Link> 
              <Link to={`/transactions/edit/${activeTransaction.id}`} className="btn btn--primary">Edit</Link>
              <button onClick={() => activeTransactionUpdater(null)} className="btn btn--secondary">
                <img src={close} alt="close-icon" />
              </button>
            </div>
          </div>
        </Modal>
      ) : null
    }
    </div>
  )
}

export default TableFeatures;
