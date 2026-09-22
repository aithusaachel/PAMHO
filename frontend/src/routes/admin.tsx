import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLogin } from "../components/admin/AdminLogin";
import { AdminDashboard } from "../components/admin/AdminDashboard";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin Dashboard — PAMHO" }],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [auth, setAuth] = useState(sessionStorage.getItem("adminAuth") || "");

  const handleLogout = () => {
    setAuth("");
    sessionStorage.removeItem("adminAuth");
  };

  return (
    <>
      <Toaster />
      {!auth ? (
        <AdminLogin onLogin={setAuth} />
      ) : (
        <AdminDashboard auth={auth} onLogout={handleLogout} />
      )}
    </>
  );
}
