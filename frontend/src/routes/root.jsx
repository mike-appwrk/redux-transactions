import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Main from "../components/Main";
import Sidebar from "../components/Sidebar/Sidebar";

export default function Root() {

  useEffect(() => {
    document.title = 'Transaction Management System';
  }, []);

  return (
    <div className="grid grid-cols-ui">
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </div> 
    
  );
}