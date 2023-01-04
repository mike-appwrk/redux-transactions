import { Link } from "react-router-dom";
import TransactionsTableHeaders from "./TransactionsTableHeaders";
import Modal from "./Modal";
import { dateFormatter } from "../lib/helpers";
import close from "../icons/close.svg";
import TransactionsEditorBody from "../features/transactions/TransactionsEditorBody";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectTransactionById } from "../features/transactions/transactionsSlice";

const TransactionsEditor = () => {

  const [modalTransactionId, setModalTransactionId] = useState(null);

  const modalTransaction = useSelector(state => selectTransactionById(state, modalTransactionId));

  function modalTransactionIdUpdater(id) {
    setModalTransactionId(id)
  }

  return (
    <div>
      <div className="text-black">
        <div  className="flex gap-4 items-center mb-10">
          <h2 className="font-bold text-xl">Transactions History</h2>
          <Link className="btn btn--primary" to="/create">Add New</Link>
        </div>
       
        <table className="rounded-md overflow-hidden mb-10">
          <TransactionsTableHeaders />
          <TransactionsEditorBody modalTransactionIdUpdater={modalTransactionIdUpdater} />
        </table>
    
      </div>

    {
      modalTransactionId ? (
        <Modal>
          <div className="fixed bg-white bottom-0 left-0 w-full px-10 py-4 shadow-2xl flex gap-8 items-center">
            <div className="flex gap-2">
              <span className="font-bold">Description: </span>
              <span className="capitalize">{modalTransaction.description}</span>
            </div>
            <div>
              <span className="font-bold">Transacted on: </span>
              <span>{dateFormatter(modalTransaction.date)}</span>
            </div>
            <div>
              <span className="font-bold">Type: </span>
              <span className="capitalize">{modalTransaction.type}</span>
            </div>
            <div>
              <span className="font-bold">Amount: </span>
              <span className="capitalize">{modalTransaction.amount}</span>
            </div>
            <div className="ml-auto flex gap-2">
              <Link to={`/transaction/${modalTransaction._id}`} className="btn btn--primary">View</Link> 
              <Link to={`/edit/${modalTransaction._id}`} className="btn btn--primary">Edit</Link>
              <button onClick={() => modalTransactionIdUpdater(null)} className="btn btn--secondary">
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

export default TransactionsEditor;
