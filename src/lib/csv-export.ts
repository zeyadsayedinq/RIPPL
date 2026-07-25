import type { Creator } from "./mock-data";

/* Creator roster + campaign-assignment CSV export — for finance/reporting
   outside RIPPL. Pure client-side (Blob download), no backend involved,
   same spirit as the existing jsPDF exports in pdf.ts but for tabular data
   a spreadsheet tool can actually open. */

function csvCell(v: string | number | boolean): string {
  const s = String(v ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function download(filename: string, csv: string) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* Generic row exporter — headers are taken from the first row's keys.
   Used by /affiliates, /live and anywhere else that needs a quick ledger
   dump into a spreadsheet. */
export function downloadCsv(
  filename: string,
  rows: Record<string, string | number | boolean>[],
) {
  if (rows.length === 0) return;
  const headers = Object.keys(rows[0]);
  const csv = [headers, ...rows.map((r) => headers.map((h) => r[h]))]
    .map((row) => row.map(csvCell).join(","))
    .join("\r\n");
  download(filename, csv);
}

export function exportCreatorsCsv(
  creators: Creator[],
  assignedIds: string[],
  campaignLabel?: string,
) {
  const headers = [
    "Name",
    "Handle",
    "Platform",
    "Tier",
    "City",
    "Followers",
    "Avg Views",
    "Engagement %",
    "Price (EGP)",
    "Status",
    "Assigned to campaign",
    "Deliverable URL",
    "Live post URL",
  ];
  const rows = creators.map((c) => [
    c.name,
    c.handle,
    c.platform,
    c.tier,
    c.city,
    c.followers,
    c.avgViews,
    c.engagement,
    c.price,
    c.status,
    assignedIds.includes(c.id) ? "Yes" : "No",
    c.deliverableUrl ?? "",
    c.livePostUrl ?? "",
  ]);
  const csv = [headers, ...rows]
    .map((row) => row.map(csvCell).join(","))
    .join("\r\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const safeLabel = (campaignLabel || "Creators").replace(/\s+/g, "_");
  a.href = url;
  a.download = `${safeLabel}_Roster_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
