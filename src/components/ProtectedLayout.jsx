import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Topbar from "../scenes/global/Topbar";
import Sidebar from "../scenes/global/Sidebar";
import { useAuth } from "../hooks/useAuth";

export const ProtectedLayout = () => {
  const { user } = useAuth();
  const [isSidebar, setIsSidebar] = useState(true);

  if (!user) {
    return <Navigate to="/login" />;
  }

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
