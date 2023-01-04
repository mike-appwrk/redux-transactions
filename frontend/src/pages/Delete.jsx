import DeleteForm from "../components/DeleteForm";
import { useParams } from "react-router-dom";

const Delete = () => {

  const { id } = useParams();

  return (
    <div>
      <h4>Do you really want to delete transaction #{id} ?</h4>
      <DeleteForm id={id} />
    </div>
  )
}

export default Delete;