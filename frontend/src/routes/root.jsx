import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Main from "../components/Main";
import Sidebar from "../components/Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getTransactions } from "../features/transactions/transactionsSlice";

export default function Root() {

  const dispatch = useDispatch();
  const status = useSelector(state => state.transactions.status);

  useEffect(() => {
    if (status === 'idle'){
      dispatch(getTransactions())
    }
  }, [dispatch])

  return (
    <div className="grid grid-cols-ui">
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </div> 
    
  );
}