import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Root = () => {
  useEffect(() => {
    document.title = 'Transactions | Redux';
  }, []);

  return (
    <div>
      Root
      <Outlet />
    </div>
  )
}

export default Root;
