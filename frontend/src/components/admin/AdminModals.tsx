import React, { useState } from "react";
import { X, Plus, Trash2, FileDown } from "lucide-react";
import { FORM_SCHEMAS } from "../../lib/admin-constants";
import { downloadSinglePDF } from "../../lib/export";
import { toast } from "sonner";

export function ViewDetailsModal({ viewEntry, setViewEntry }: { viewEntry: any, setViewEntry: (entry: any) => void }) {
  if (!viewEntry) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm transition-opacity font-sans text-foreground">
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
            {FORM_SCHEMAS[viewEntry.formType]?.map((field: any) => (
              <div key={field.name}>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{field.label}</p>
                <p className="rounded-lg bg-muted/40 p-3 text-sm text-foreground whitespace-pre-wrap">{String(viewEntry.data[field.name] || "—")}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-border bg-muted/20 px-6 py-4 flex justify-between items-center shrink-0">
          <button
            onClick={() => downloadSinglePDF(viewEntry)}
            className="inline-flex items-center gap-2 rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm transition hover:bg-muted hover:text-foreground"
          >
            <FileDown className="h-4 w-4" />
            Download PDF
          </button>
          <button onClick={() => setViewEntry(null)} className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export function AddEntryModal({ 
  setIsAdding, 
  addMutation 
}: { 
  setIsAdding: (val: boolean) => void;
  addMutation: { mutateAsync: (data: any[]) => Promise<void>; isPending: boolean };
}) {
  const [newEntries, setNewEntries] = useState([{ id: Date.now(), formType: "contact", data: {} as any }]);

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
      await addMutation.mutateAsync(newEntries);
      toast.success(`Successfully saved ${newEntries.length} ${newEntries.length === 1 ? 'entry' : 'entries'}`);
      setIsAdding(false);
    } catch (err: any) {
      toast.error(err.message || "Failed to add entries.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm transition-opacity font-sans text-foreground">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-background shadow-2xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between border-b border-border px-6 py-4 shrink-0 bg-background z-10">
          <h3 className="text-lg font-semibold">Manually Add Entries</h3>
          <button onClick={() => setIsAdding(false)} className="rounded-full p-1.5 text-muted-foreground hover:bg-muted transition" disabled={addMutation.isPending}>
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
                      disabled={addMutation.isPending}
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
                      disabled={addMutation.isPending}
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
                            disabled={addMutation.isPending}
                            className="resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition focus:border-primary"
                          />
                        ) : field.type === 'select' ? (
                          <select
                            value={entry.data[field.name] || ""}
                            onChange={(e) => updateNewEntryData(entry.id, field.name, e.target.value)}
                            disabled={addMutation.isPending}
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
                            disabled={addMutation.isPending}
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
              disabled={addMutation.isPending}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 px-4 py-4 text-sm font-medium text-primary hover:bg-primary/10 transition disabled:opacity-50"
            >
              <Plus className="h-4 w-4" />
              Add Another Entry
            </button>
          </form>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-border bg-background px-6 py-4 shrink-0 z-10 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
          <button type="button" onClick={() => setIsAdding(false)} disabled={addMutation.isPending} className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground">
            Cancel
          </button>
          <button type="submit" form="bulkAddForm" disabled={addMutation.isPending} className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:opacity-75">
            {addMutation.isPending ? "Saving..." : `Save ${newEntries.length > 1 ? `All ${newEntries.length} Entries` : 'Entry'}`}
          </button>
        </div>
      </div>
    </div>
  );
}
