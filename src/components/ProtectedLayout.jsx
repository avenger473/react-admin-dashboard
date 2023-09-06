import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Topbar from "../scenes/global/Topbar";
import Sidebar from "../scenes/global/Sidebar";

export const ProtectedLayout = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <>
      <Sidebar isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <Outlet />
      </main>
    </>
  );
};
