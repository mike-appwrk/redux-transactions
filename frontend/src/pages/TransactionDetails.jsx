import { useParams, Link } from "react-router-dom";
import MainTransaction from "../components/MainTransaction";

const TransactionDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <MainTransaction id={id} />
      <div className="flex gap-2 mt-4">
        <Link to={`/transactions/edit/${id}`} className="btn btn--primary">Edit</Link>
        <Link to={`/transactions/delete/${id}`} className="btn btn--secondary">Delete</Link>
      </div>
    </div>
  )
}

export default TransactionDetails;
