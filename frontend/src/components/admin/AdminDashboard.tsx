import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { LogOut, Search, Download, FileDown, Plus, Menu, X } from "lucide-react";
import pamhoLogo from "@/assets/pamho-logo.png";
import { TABS, FORM_SCHEMAS } from "../../lib/admin-constants";
import { exportToCSV, exportToPDF } from "../../lib/export";
import { AdminTable } from "./AdminTable";
import { ViewDetailsModal, AddEntryModal } from "./AdminModals";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

interface AdminDashboardProps {
  auth: string;
  onLogout: () => void;
}

export function AdminDashboard({ auth, onLogout }: AdminDashboardProps) {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewEntry, setViewEntry] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Data Fetching with TanStack Query
  const { data: submissions = [], isLoading, isError, error } = useQuery({
    queryKey: ['submissions', auth],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/submissions`, {
        headers: { Authorization: auth }
      });
      if (!res.ok) {
        if (res.status === 401) {
          onLogout();
          throw new Error("Session expired or unauthorized");
        }
        throw new Error("Failed to fetch submissions");
      }
      return res.json();
    },
    retry: false
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`${API_URL}/api/submissions/${id}`, {
        method: "DELETE",
        headers: { Authorization: auth }
      });
      if (!res.ok) throw new Error("Failed to delete entry");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
    }
  });

  const addMutation = useMutation({
    mutationFn: async (entries: any[]) => {
      await Promise.all(entries.map(async (entry) => {
        const res = await fetch(`${API_URL}/api/submissions`, {
          method: "POST",
          body: JSON.stringify({ formType: entry.formType, data: entry.data }),
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) {
          const body = await res.json();
          throw new Error(body.error || "Failed to add entry.");
        }
      }));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
    }
  });

  useEffect(() => {
    if (isError) {
      toast.error(error instanceof Error ? error.message : "Error fetching data");
    }
  }, [isError, error]);

  useEffect(() => {
    setPage(1);
  }, [filter, searchQuery]);

  // Filtering
  const filteredSubmissions = submissions
    .filter((sub: any) => filter === "all" || sub.formType === filter)
    .filter((sub: any) => {
      if (!searchQuery) return true;
      const term = searchQuery.toLowerCase();
      return JSON.stringify(sub).toLowerCase().includes(term);
    });

  const totalPages = Math.max(1, Math.ceil(filteredSubmissions.length / itemsPerPage));
  const currentSubmissions = filteredSubmissions.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const currentSchema = filter === "all" ? null : FORM_SCHEMAS[filter];

  return (
    <div className="flex h-screen overflow-hidden bg-muted/10 font-sans text-foreground">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-border bg-background flex flex-col shadow-2xl lg:shadow-sm lg:relative transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-6">
          <img src={pamhoLogo} alt="PAMHO" className="h-45" />
          <button 
            className="lg:hidden rounded-lg p-1 text-muted-foreground hover:bg-muted"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto py-6">
          <div className="px-5 mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Filters
          </div>
          <nav className="space-y-1.5 px-3">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${filter === tab.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
              >
                <tab.icon className="h-[18px] w-[18px]" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t border-border shrink-0">
          <button onClick={onLogout} className="flex w-full items-center justify-center gap-2 rounded-lg border border-input bg-background px-4 py-2.5 text-sm font-medium text-muted-foreground shadow-sm hover:bg-muted hover:text-foreground transition">
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-background px-4 sm:px-8 shadow-sm z-10 gap-3 sm:gap-4">
          <div className="flex items-center gap-3">
            <button 
              className="lg:hidden rounded-lg p-2 text-muted-foreground hover:bg-muted"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-semibold whitespace-nowrap hidden sm:block">Dashboard</h1>
          </div>

          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search names, emails, messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-input bg-muted/30 pl-9 sm:pl-10 pr-4 py-2 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary focus:bg-background"
            />
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => exportToCSV(filteredSubmissions, filter)}
              className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm transition hover:bg-muted hover:text-foreground"
            >
              <Download className="h-4 w-4" />
              CSV
            </button>
            {filter !== "all" && (
              <button
                onClick={() => exportToPDF(filteredSubmissions, filter)}
                className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm transition hover:bg-muted hover:text-foreground"
              >
                <FileDown className="h-4 w-4" />
                PDF
              </button>
            )}
            <button
              onClick={() => setIsAdding(true)}
              className="inline-flex items-center gap-1.5 sm:gap-2 rounded-lg bg-primary px-3 sm:px-4 py-2 text-sm font-medium text-primary-foreground shadow transition hover:bg-primary/90 whitespace-nowrap"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Entry</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </header>

        <AdminTable
          loading={isLoading}
          filteredSubmissionsLength={filteredSubmissions.length}
          currentSchema={currentSchema}
          currentSubmissions={currentSubmissions}
          setViewEntry={setViewEntry}
          deleteMutation={deleteMutation}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      </main>

      <ViewDetailsModal viewEntry={viewEntry} setViewEntry={setViewEntry} />
      
      {isAdding && (
        <AddEntryModal setIsAdding={setIsAdding} addMutation={addMutation} />
      )}
    </div>
  );
}
