import { useNavigate } from "react-router-dom";
import { deleteTransaction } from "../api";
import { useDispatch } from "react-redux";
import { transactionDeleted } from "../features/transactions/transactionsSlice";

function DeleteForm ({ id }) {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleDelete (e) {
    e.preventDefault();
    try {
      const res = await deleteTransaction(id);
      const json = await res.json();
      dispatch(transactionDeleted(json.id))
      navigate(`/`);
    } catch (error) {
      console.log({ message: error.message })
    }
  }

  function handleReturnClick () {
    navigate(`/transactions/${id}`);
  }

  return (
    <form onSubmit={handleDelete}>
      <div className="flex gap-2  mt-4">
        <button type="submit" className="btn btn--primary">Confirm</button>
        <button onClick={handleReturnClick} type="button" className="btn btn--secondary">Go Back</button>
      </div>
    </form>
  )
}

export default DeleteForm;
