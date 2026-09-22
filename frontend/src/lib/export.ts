import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { TABS, FORM_SCHEMAS } from "./admin-constants";
import { toast } from "sonner";

export const PDF_SUMMARY_FIELDS: Record<string, string[]> = {
  contact:      ["fullName", "email", "whatsapp", "subject", "message"],
  join:         ["fullName", "country", "email", "whatsapp", "occupation", "theme"],
  partners:     ["orgName", "orgType", "countryReg", "contactName", "contactEmail", "contactWhatsapp"],
  conversation: ["fullName", "country", "email", "title", "theme", "format"],
  ambassadors:  ["fullName", "country", "city", "email", "whatsapp", "occupation"],
};

export const exportToCSV = (filteredSubmissions: any[], filter: string) => {
  if (filteredSubmissions.length === 0) {
    toast.error("No data to export.");
    return;
  }

  const allKeys = new Set<string>();
  filteredSubmissions.forEach(sub => {
    Object.keys(sub.data || {}).forEach(k => allKeys.add(k));
  });

  const csvRows: string[] = [];
  const header = ["id", "createdAt", "formType", ...Array.from(allKeys)];
  csvRows.push(header.join(","));

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

export const exportToPDF = (filteredSubmissions: any[], filter: string) => {
  if (filteredSubmissions.length === 0) {
    toast.error("No data to export.");
    return;
  }

  const doc = new jsPDF({ orientation: "landscape" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 14;
  const dateStr = new Date().toLocaleDateString();
  const filterLabel = TABS.find(t => t.id === filter)?.label || "All Submissions";
  const schema = FORM_SCHEMAS[filter] || [];

  // Determine which fields to show as columns
  const summaryKeys = PDF_SUMMARY_FIELDS[filter] || schema.slice(0, 6).map(f => f.name);
  const summaryFields = summaryKeys.map(key => schema.find(f => f.name === key)).filter(Boolean) as typeof schema;

  const drawHeader = () => {
    doc.setFillColor(88, 28, 135);
    doc.rect(0, 0, pageW, 22, "F");
    doc.setTextColor(255);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("PAMHO — Admin Records", margin, 10);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text(`${filterLabel}   |   Exported: ${dateStr}   |   Total: ${filteredSubmissions.length} record(s)`, margin, 18);
  };

  drawHeader();

  const head = [["#", "Date", ...summaryFields.map(f => f.label)]];
  const body = filteredSubmissions.map((sub, i) => [
    String(i + 1),
    new Date(sub.createdAt).toLocaleDateString(),
    ...summaryFields.map(f => String(sub.data[f.name] || "—")),
  ]);

  autoTable(doc, {
    head,
    body,
    startY: 26,
    styles: { fontSize: 8, cellPadding: 2.5, overflow: "linebreak", valign: "top" },
    headStyles: { fillColor: [88, 28, 135], textColor: 255, fontStyle: "bold", fontSize: 8 },
    alternateRowStyles: { fillColor: [245, 240, 255] },
    columnStyles: {
      0: { cellWidth: 10, halign: "center" },
      1: { cellWidth: 24 },
    },
    margin: { left: margin, right: margin, top: 26 },
    didDrawPage: (data: any) => {
      if (data.pageNumber > 1) drawHeader();
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(`PAMHO Admin  |  ${filterLabel}  |  Page ${data.pageNumber}`, margin, pageH - 6);
    },
  });

  doc.save(`pamho_${filter}_${new Date().toISOString().slice(0, 10)}.pdf`);
};

export const downloadSinglePDF = (sub: any) => {
  const doc = new jsPDF();
  const schema = FORM_SCHEMAS[sub.formType] || [];
  const dateStr = new Date(sub.createdAt).toLocaleString();
  const typeLabel = TABS.find(t => t.id === sub.formType)?.label || sub.formType;

  doc.setFillColor(88, 28, 135);
  doc.rect(0, 0, doc.internal.pageSize.getWidth(), 28, "F");
  doc.setTextColor(255);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("PAMHO", 14, 12);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`${typeLabel} Submission`, 14, 20);

  doc.setTextColor(80);
  doc.setFontSize(9);
  doc.text(`Record ID: #${sub.id}`, 14, 36);
  doc.text(`Submitted: ${dateStr}`, 14, 43);
  doc.setDrawColor(200);
  doc.line(14, 47, doc.internal.pageSize.getWidth() - 14, 47);

  const rows = schema.map((field: any) => [
    field.label,
    String(sub.data[field.name] || "—")
  ]);

  autoTable(doc, {
    body: rows,
    startY: 52,
    theme: "striped",
    styles: { fontSize: 9, cellPadding: 3, overflow: "linebreak" },
    columnStyles: {
      0: { cellWidth: 55, fontStyle: "bold", textColor: [88, 28, 135], fillColor: [245, 240, 255] },
      1: { cellWidth: "auto", textColor: [40, 40, 40] }
    },
    margin: { left: 14, right: 14 },
  });

  const pageCount = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(`Page ${i} of ${pageCount}  |  PAMHO Admin`, 14, doc.internal.pageSize.getHeight() - 8);
  }

  const name = sub.data.fullName || sub.data.orgName || `record_${sub.id}`;
  doc.save(`pamho_${sub.formType}_${name.replace(/\s+/g, "_")}.pdf`);
};
