import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Topbar from "../scenes/global/Topbar";
import Sidebar from "../scenes/global/Sidebar";
import { useAuth } from "../hooks/useAuth";

export const ProtectedLayout = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Sidebar user={user} />
      <main className="content">
        <Topbar />
        <Outlet />
      </main>
    </>
  );
};
