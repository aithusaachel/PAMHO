import React from "react";
import { Eye, FileDown, Trash2 } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { downloadSinglePDF } from "../../lib/export";
import { toast } from "sonner";

interface AdminTableProps {
  loading: boolean;
  filteredSubmissionsLength: number;
  currentSchema: any[] | null;
  currentSubmissions: any[];
  setViewEntry: (entry: any) => void;
  deleteMutation: { mutateAsync: (id: number) => Promise<void>; isPending: boolean };
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

export function AdminTable({
  loading,
  filteredSubmissionsLength,
  currentSchema,
  currentSubmissions,
  setViewEntry,
  deleteMutation,
  page,
  setPage,
  totalPages,
}: AdminTableProps) {
  
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

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to permanently delete this entry?")) return;
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Entry deleted successfully");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete entry");
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-8">
      <div className="rounded-xl border border-border bg-background shadow-sm overflow-hidden min-h-[400px]">
        {loading && filteredSubmissionsLength === 0 ? (
          <div className="p-12 text-center text-muted-foreground">Loading submissions...</div>
        ) : filteredSubmissionsLength === 0 ? (
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
                            onClick={() => downloadSinglePDF(sub)}
                            className="inline-flex items-center gap-1.5 rounded-md border border-input bg-background px-3 py-1.5 text-xs font-medium shadow-sm transition hover:bg-muted hover:text-foreground"
                            title="Download PDF"
                          >
                            <FileDown className="h-3.5 w-3.5" />
                            PDF
                          </button>
                          <button
                            onClick={() => handleDelete(sub.id)}
                            disabled={deleteMutation.isPending}
                            className="inline-flex items-center justify-center rounded-md border border-red-200 bg-red-50 px-2 py-1.5 text-red-600 shadow-sm transition hover:bg-red-100 dark:border-red-900/50 dark:bg-red-950/30 dark:hover:bg-red-900/50 disabled:opacity-50"
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
  );
}
