import React, { useState } from "react";
import pamhoLogo from "@/assets/pamho-logo.png";
import { toast } from "sonner";

interface AdminLoginProps {
  onLogin: (token: string) => void;
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!credentials.username || !credentials.password) {
      toast.error("Please enter both username and password");
      return;
    }
    const token = btoa(`${credentials.username}:${credentials.password}`);
    const basicAuth = `Basic ${token}`;
    sessionStorage.setItem("adminAuth", basicAuth);
    onLogin(basicAuth);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4 font-sans">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-xl">
        <div className="mb-8 flex justify-center">
          <img src={pamhoLogo} alt="PAMHO" className="h-45" />
        </div>
        <h2 className="mb-6 text-center text-xl font-medium text-foreground">Admin Login</h2>
        <form onSubmit={handleLogin} className="grid gap-5">
          <label className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Username</span>
            <input
              type="text"
              value={credentials.username}
              onChange={e => setCredentials({ ...credentials, username: e.target.value })}
              className="rounded-lg border border-input bg-background px-4 py-2.5 outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
              required
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</span>
            <input
              type="password"
              value={credentials.password}
              onChange={e => setCredentials({ ...credentials, password: e.target.value })}
              className="rounded-lg border border-input bg-background px-4 py-2.5 outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
              required
            />
          </label>
          <button type="submit" className="mt-2 w-full rounded-lg bg-primary px-4 py-3 font-semibold text-primary-foreground hover:bg-primary/90 transition">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
