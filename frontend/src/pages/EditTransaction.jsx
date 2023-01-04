import EditForm from "../components/EditForm";
import { useParams } from "react-router-dom";

const EditTransaction = () => {
  const { id } = useParams();

  return (
    <div>
      <EditForm id={id} />
    </div>
  )
}

export default EditTransaction;
