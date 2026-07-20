import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { X, Plus, Eye, LogOut, LayoutDashboard, MessageSquare, Users, Handshake, Network, UserPlus, Trash2, Search, Download } from "lucide-react";
import pamhoLogo from "@/assets/pamho-logo.png";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin Dashboard — PAMHO" }],
  }),
  component: AdminPage,
});

const TABS = [
  { id: "all", label: "All Submissions", icon: LayoutDashboard },
  { id: "contact", label: "Contact", icon: MessageSquare },
  { id: "join", label: "Join the Conversation", icon: Users },
  { id: "partners", label: "Partners", icon: Handshake },
  { id: "conversation", label: "Apply to Speak", icon: Network },
  { id: "ambassadors", label: "Ambassadors", icon: UserPlus },
];

const FORM_SCHEMAS: Record<string, { name: string, label: string, type: string, options?: string[] }[]> = {
  contact: [
    { name: "fullName", label: "Full Name", type: "text" },
    { name: "email", label: "Email Address", type: "email" },
    { name: "whatsapp", label: "WhatsApp Number", type: "text" },
    { name: "subject", label: "Subject", type: "text" },
    { name: "message", label: "Message", type: "textarea" },
  ],
  join: [
    { name: "fullName", label: "Full Name", type: "text" },
    { name: "country", label: "Country of Residence", type: "text" },
    { name: "email", label: "Email Address", type: "email" },
    { name: "whatsapp", label: "WhatsApp Number", type: "text" },
    { name: "occupation", label: "Occupation", type: "text" },
    { name: "referral", label: "How did you hear about us", type: "text" },
    { name: "theme", label: "Theme", type: "text" },
    { name: "message", label: "Message", type: "textarea" },
  ],
  partners: [
    { name: "orgName", label: "Organization Name", type: "text" },
    { name: "orgType", label: "Organization Type", type: "select", options: ["NGO", "University", "Research Institution", "Professional Association", "Youth Organization", "Community Organization", "International Organization", "Other"] },
    { name: "countryReg", label: "Country of Registration", type: "text" },
    { name: "regions", label: "Regions of Operation", type: "text" },
    { name: "contactName", label: "Contact Person Full Name", type: "text" },
    { name: "contactRole", label: "Contact Role", type: "text" },
    { name: "contactEmail", label: "Contact Email", type: "email" },
    { name: "contactWhatsapp", label: "Contact WhatsApp", type: "text" },
    { name: "website", label: "Website", type: "url" },
    { name: "instagram", label: "Instagram Handle", type: "text" },
    { name: "twitter", label: "Twitter / X Handle", type: "text" },
    { name: "linkedin", label: "LinkedIn Page URL", type: "url" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "heardAbout", label: "How did you hear about us?", type: "text" },
    { name: "contribution", label: "Contribution", type: "textarea" },
    { name: "speaking", label: "Speaking Opportunity", type: "select", options: ["Yes", "No"] },
    { name: "additional", label: "Additional Info", type: "textarea" },
  ],
  conversation: [
    { name: "fullName", label: "Full Name", type: "text" },
    { name: "country", label: "Country of Residence", type: "text" },
    { name: "whatsapp", label: "WhatsApp Number", type: "text" },
    { name: "email", label: "Email Address", type: "email" },
    { name: "background", label: "Professional Background", type: "textarea" },
    { name: "title", label: "Proposed Title", type: "text" },
    { name: "theme", label: "Theme", type: "text" },
    { name: "format", label: "Format", type: "text" },
    { name: "abstract", label: "Abstract", type: "textarea" },
    { name: "panelSuggestions", label: "Panel Co-panelist Suggestions", type: "textarea" },
    { name: "why", label: "Why This Topic Matters", type: "textarea" },
    { name: "instagram", label: "Instagram Handle", type: "text" },
    { name: "twitter", label: "Twitter / X Handle", type: "text" },
    { name: "linkedin", label: "LinkedIn Profile URL", type: "url" },
  ],
  ambassadors: [
    { name: "fullName", label: "Full Name", type: "text" },
    { name: "country", label: "Country of Residence", type: "text" },
    { name: "city", label: "City", type: "text" },
    { name: "email", label: "Email Address", type: "email" },
    { name: "whatsapp", label: "WhatsApp Number", type: "text" },
    { name: "instagram", label: "Instagram Handle", type: "text" },
    { name: "twitter", label: "Twitter / X Handle", type: "text" },
    { name: "linkedin", label: "LinkedIn Profile URL", type: "url" },
    { name: "occupation", label: "Current Occupation", type: "text" },
    { name: "why", label: "Why become an Ambassador?", type: "textarea" },
    { name: "promote", label: "How will you promote?", type: "textarea" },
    { name: "meaning", label: "What does mental health mean to you?", type: "textarea" },
    { name: "reach", label: "Estimated Reach", type: "select", options: ["Under 500", "500 to 2000", "2000 to 10000", "Over 10000"] },
    { name: "prior", label: "Prior Advocacy?", type: "select", options: ["Yes", "No"] },
    { name: "priorDetails", label: "Prior Advocacy Details", type: "textarea" },
  ]
};

function AdminPage() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [auth, setAuth] = useState(localStorage.getItem("adminAuth") || "");
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const [viewEntry, setViewEntry] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Bulk add state
  const [newEntries, setNewEntries] = useState([{ id: Date.now(), formType: "contact", data: {} as any }]);

  const filteredSubmissions = submissions
    .filter(sub => filter === "all" || sub.formType === filter)
    .filter(sub => {
      if (!searchQuery) return true;
      const term = searchQuery.toLowerCase();
      return JSON.stringify(sub).toLowerCase().includes(term);
    });

  const totalPages = Math.max(1, Math.ceil(filteredSubmissions.length / itemsPerPage));
  const currentSubmissions = filteredSubmissions.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 4) {
        pages.push(1, 2, 3, 4, 5, 'ellipsis-1', totalPages);
      } else if (page >= totalPages - 3) {
        pages.push(1, 'ellipsis-1', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, 'ellipsis-1', page - 1, page, page + 1, 'ellipsis-2', totalPages);
      }
    }
    return pages;
  };

  useEffect(() => {
    setPage(1);
  }, [filter, searchQuery]);

  const fetchSubmissions = () => {
    if (!auth) return;
    setLoading(true);
    fetch(`${API_URL}/api/submissions`, {
      headers: { Authorization: auth }
    })
      .then(res => {
        if (!res.ok) throw new Error("Authentication failed or server error");
        return res.json();
      })
      .then(data => {
        setSubmissions(data);
        setError("");
      })
      .catch(err => {
        setError(err.message);
        if (err.message.includes("Authentication")) {
          handleLogout();
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchSubmissions();
  }, [auth]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const token = btoa(`${credentials.username}:${credentials.password}`);
    const basicAuth = `Basic ${token}`;
    setAuth(basicAuth);
    localStorage.setItem("adminAuth", basicAuth);
  };

  const handleLogout = () => {
    setAuth("");
    localStorage.removeItem("adminAuth");
  };

  const updateNewEntryFormType = (id: number, formType: string) => {
    setNewEntries(entries => entries.map(entry => entry.id === id ? { ...entry, formType, data: {} } : entry));
  };

  const updateNewEntryData = (id: number, field: string, value: string) => {
    setNewEntries(entries => entries.map(entry =>
      entry.id === id ? { ...entry, data: { ...entry.data, [field]: value } } : entry
    ));
  };

  const removeNewEntry = (id: number) => {
    setNewEntries(entries => entries.filter(e => e.id !== id));
  };

  const addAnotherEntry = () => {
    setNewEntries([...newEntries, { id: Date.now(), formType: "contact", data: {} }]);
  };

  const handleBulkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await Promise.all(newEntries.map(async (entry) => {
        const res = await fetch(`${API_URL}/api/submissions`, {
          method: "POST",
          body: JSON.stringify({ formType: entry.formType, data: entry.data }),
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) throw new Error(`Failed to add entry.`);
      }));

      setIsAdding(false);
      setNewEntries([{ id: Date.now(), formType: "contact", data: {} }]);
      fetchSubmissions();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to permanently delete this entry?")) return;
    try {
      const res = await fetch(`${API_URL}/api/submissions/${id}`, {
        method: "DELETE",
        headers: { Authorization: auth }
      });
      if (!res.ok) throw new Error("Failed to delete entry");
      fetchSubmissions();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleExportCSV = () => {
    if (filteredSubmissions.length === 0) return alert("No data to export.");

    const allKeys = new Set<string>();
    filteredSubmissions.forEach(sub => {
      Object.keys(sub.data).forEach(k => allKeys.add(k));
    });

    const headers = ["ID", "Date", "Type", ...Array.from(allKeys)];
    const csvRows = [headers.join(",")];

    filteredSubmissions.forEach(sub => {
      const row = [
        sub.id,
        new Date(sub.createdAt).toLocaleString(),
        sub.formType,
        ...Array.from(allKeys).map(k => `"${String(sub.data[k] || "").replace(/"/g, '""')}"`)
      ];
      csvRows.push(row.join(","));
    });

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `pamho_submissions_${filter}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!auth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-xl">
          <div className="mb-8 flex justify-center">
            <img src={pamhoLogo} alt="PAMHO" className="h-45" />
          </div>
          <h2 className="mb-6 text-center text-xl font-medium text-foreground">Admin Login</h2>
          {error && <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/50 dark:text-red-400">{error}</p>}
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

  // Dynamic columns for the table header based on filter
  const currentSchema = filter === "all" ? null : FORM_SCHEMAS[filter];

  return (
    <div className="flex h-screen overflow-hidden bg-muted/10 font-sans text-foreground">

      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-background flex flex-col shadow-sm z-20">
        <div className="flex h-16 shrink-0 items-center border-b border-border px-6">
          <img src={pamhoLogo} alt="PAMHO" className="h-45" />
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
          <button onClick={handleLogout} className="flex w-full items-center justify-center gap-2 rounded-lg border border-input bg-background px-4 py-2.5 text-sm font-medium text-muted-foreground shadow-sm hover:bg-muted hover:text-foreground transition">
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-background px-8 shadow-sm z-10 gap-4">
          <h1 className="text-xl font-semibold whitespace-nowrap hidden sm:block">Dashboard</h1>

          {/* Search Bar */}
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search names, emails, messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-input bg-muted/30 pl-10 pr-4 py-2 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary focus:bg-background"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm transition hover:bg-muted hover:text-foreground"
            >
              <Download className="h-4 w-4" />
              Export
            </button>
            <button
              onClick={() => setIsAdding(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition hover:bg-primary/90 whitespace-nowrap"
            >
              <Plus className="h-4 w-4" />
              Add Entry
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="rounded-xl border border-border bg-background shadow-sm overflow-hidden min-h-[400px]">
            {loading && submissions.length === 0 ? (
              <div className="p-12 text-center text-muted-foreground">Loading submissions...</div>
            ) : filteredSubmissions.length === 0 ? (
              <div className="p-12 text-center text-muted-foreground">No submissions found for this category.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-border bg-muted/40">
                    <tr>
                      <th className="whitespace-nowrap px-6 py-4 font-medium text-muted-foreground">Date</th>
                      <th className="whitespace-nowrap px-6 py-4 font-medium text-muted-foreground">Type</th>

                      {currentSchema ? (
                        currentSchema.map(field => (
                          <th key={field.name} className="whitespace-nowrap px-6 py-4 font-medium text-muted-foreground">
                            {field.label}
                          </th>
                        ))
                      ) : (
                        <>
                          <th className="whitespace-nowrap px-6 py-4 font-medium text-muted-foreground">Name / Org</th>
                          <th className="whitespace-nowrap px-6 py-4 font-medium text-muted-foreground">Email</th>
                        </>
                      )}

                      <th className="whitespace-nowrap px-6 py-4 font-medium text-muted-foreground text-right sticky right-0 bg-muted/40 backdrop-blur">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {currentSubmissions.map(sub => {
                      return (
                        <tr key={sub.id} className="transition-colors hover:bg-muted/20">
                          <td className="whitespace-nowrap px-6 py-4 text-muted-foreground">
                            {new Date(sub.createdAt).toLocaleDateString()}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-primary">
                              {sub.formType}
                            </span>
                          </td>

                          {currentSchema ? (
                            currentSchema.map(field => (
                              <td key={field.name} className="px-6 py-4 text-muted-foreground max-w-[250px] truncate" title={String(sub.data[field.name] || "—")}>
                                {String(sub.data[field.name] || "—")}
                              </td>
                            ))
                          ) : (
                            <>
                              <td className="px-6 py-4 font-medium">{sub.data.fullName || sub.data.orgName || "—"}</td>
                              <td className="px-6 py-4 text-muted-foreground">{sub.data.email || sub.data.contactEmail || "—"}</td>
                            </>
                          )}

                          <td className="px-6 py-4 text-right sticky right-0 bg-background/80 backdrop-blur group-hover:bg-muted/80">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => setViewEntry(sub)}
                                className="inline-flex items-center gap-1.5 rounded-md border border-input bg-background px-3 py-1.5 text-xs font-medium shadow-sm transition hover:bg-muted hover:text-foreground"
                              >
                                <Eye className="h-3.5 w-3.5" />
                                View
                              </button>
                              <button
                                onClick={() => handleDelete(sub.id)}
                                className="inline-flex items-center justify-center rounded-md border border-red-200 bg-red-50 px-2 py-1.5 text-red-600 shadow-sm transition hover:bg-red-100 dark:border-red-900/50 dark:bg-red-950/30 dark:hover:bg-red-900/50"
                                title="Delete Entry"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="mt-6 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>

                  {getPageNumbers().map((p, i) => {
                    if (typeof p === "string" && p.startsWith("ellipsis")) {
                      return (
                        <PaginationItem key={`ellipsis-${i}`}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }
                    return (
                      <PaginationItem key={p}>
                        <PaginationLink
                          isActive={page === p}
                          onClick={() => setPage(p as number)}
                          className="cursor-pointer"
                        >
                          {p}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      className={page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </main>

      {/* View Details Modal */}
      {viewEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm transition-opacity">
          <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-background shadow-2xl">
            <div className="flex items-center justify-between border-b border-border px-6 py-4 shrink-0 bg-background">
              <h3 className="text-lg font-semibold capitalize">{viewEntry.formType} Submission</h3>
              <button onClick={() => setViewEntry(null)} className="rounded-full p-1.5 text-muted-foreground hover:bg-muted transition">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="max-h-[70vh] overflow-y-auto px-6 py-5">
              <div className="mb-6 flex gap-4 text-sm text-muted-foreground">
                <p><strong>ID:</strong> #{viewEntry.id}</p>
                <p><strong>Date:</strong> {new Date(viewEntry.createdAt).toLocaleString()}</p>
              </div>
              <div className="grid gap-5">
                {FORM_SCHEMAS[viewEntry.formType]?.map((field) => (
                  <div key={field.name}>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{field.label}</p>
                    <p className="rounded-lg bg-muted/40 p-3 text-sm text-foreground whitespace-pre-wrap">{String(viewEntry.data[field.name] || "—")}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-border bg-muted/20 px-6 py-4 text-right shrink-0">
              <button onClick={() => setViewEntry(null)} className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Entry Modal (Bulk Support) */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm transition-opacity">
          <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-background shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between border-b border-border px-6 py-4 shrink-0 bg-background z-10">
              <h3 className="text-lg font-semibold">Manually Add Entries</h3>
              <button onClick={() => setIsAdding(false)} className="rounded-full p-1.5 text-muted-foreground hover:bg-muted transition">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5 bg-muted/5">
              <form id="bulkAddForm" onSubmit={handleBulkSubmit} className="space-y-6">
                {newEntries.map((entry, index) => (
                  <div key={entry.id} className="rounded-xl border border-border bg-card p-5 shadow-sm relative">
                    <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
                      <span className="text-sm font-semibold text-muted-foreground">Entry #{index + 1}</span>
                      {newEntries.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeNewEntry(entry.id)}
                          className="text-red-500 hover:text-red-600 p-1"
                          title="Remove Entry"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>

                    <div className="mb-6">
                      <label className="flex flex-col gap-2">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Form Type *</span>
                        <select
                          value={entry.formType}
                          onChange={(e) => updateNewEntryFormType(entry.id, e.target.value)}
                          required
                          className="rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition focus:border-primary w-fit min-w-[200px]"
                        >
                          <option value="contact">Contact</option>
                          <option value="join">Join</option>
                          <option value="partners">Partners</option>
                          <option value="conversation">Apply to Speak</option>
                          <option value="ambassadors">Ambassadors</option>
                        </select>
                      </label>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {FORM_SCHEMAS[entry.formType].map(field => {
                        const isWide = field.type === 'textarea' || field.name === 'website' || field.name === 'linkedin';
                        return (
                          <label key={field.name} className={`flex flex-col gap-2 ${isWide ? 'sm:col-span-2' : ''}`}>
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{field.label}</span>

                            {field.type === 'textarea' ? (
                              <textarea
                                value={entry.data[field.name] || ""}
                                onChange={(e) => updateNewEntryData(entry.id, field.name, e.target.value)}
                                rows={2}
                                className="resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition focus:border-primary"
                              />
                            ) : field.type === 'select' ? (
                              <select
                                value={entry.data[field.name] || ""}
                                onChange={(e) => updateNewEntryData(entry.id, field.name, e.target.value)}
                                className="rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition focus:border-primary"
                              >
                                <option value="">Select option</option>
                                {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                              </select>
                            ) : (
                              <input
                                type={field.type}
                                value={entry.data[field.name] || ""}
                                onChange={(e) => updateNewEntryData(entry.id, field.name, e.target.value)}
                                className="rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition focus:border-primary"
                              />
                            )}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addAnotherEntry}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 px-4 py-4 text-sm font-medium text-primary hover:bg-primary/10 transition"
                >
                  <Plus className="h-4 w-4" />
                  Add Another Entry
                </button>
              </form>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-border bg-background px-6 py-4 shrink-0 z-10 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
              <button type="button" onClick={() => setIsAdding(false)} className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground">
                Cancel
              </button>
              <button type="submit" form="bulkAddForm" className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90">
                Save {newEntries.length > 1 ? `All ${newEntries.length} Entries` : 'Entry'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
