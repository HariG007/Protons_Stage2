import { useParams } from "react-router-dom";

function Station() {
  const { id } = useParams();
  return <div>Station {id}</div>;
}

export default Station;
