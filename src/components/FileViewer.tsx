import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import * as XLSX from "xlsx";
import { Portal } from "@/components/Portal";
import { X, Download, FileText } from "lucide-react";

/* Embedded viewer: PDFs render inline (iframe), spreadsheets render as a
   clean grid (SheetJS) with sheet tabs, images inline. Else → download. */
export function FileViewer({ url, fileName, onClose }: { url: string; fileName: string; onClose: () => void }) {
  const ext = (fileName.split(".").pop() || "").toLowerCase();
  const isPdf = ext === "pdf";
  const isSheet = ["xlsx", "xls", "csv", "tsv"].includes(ext);
  const isImg = ["png", "jpg", "jpeg", "gif", "webp", "svg", "avif"].includes(ext);
  const [wb, setWb] = useState<XLSX.WorkBook | null>(null);
  const [sheet, setSheet] = useState(0);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!isSheet) return;
    let alive = true;
    (async () => {
      try {
        const buf = await (await fetch(url)).arrayBuffer();
        const book = XLSX.read(buf);
        if (alive) setWb(book);
      } catch (e: any) { if (alive) setErr(e?.message || "Could not read spreadsheet"); }
    })();
    return () => { alive = false; };
  }, [url, isSheet]);

  const rows = useMemo<string[][]>(() => {
    if (!wb) return [];
    const ws = wb.Sheets[wb.SheetNames[sheet]];
    if (!ws) return [];
    const data = XLSX.utils.sheet_to_json<any[]>(ws, { header: 1, blankrows: false, defval: "" });
    // trim fully-empty trailing columns
    const maxCols = data.reduce((m, r) => Math.max(m, r.length), 0);
    return data.map((r) => Array.from({ length: maxCols }, (_, i) => (r[i] == null ? "" : String(r[i]))));
  }, [wb, sheet]);

  return (
    <Portal>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[110] grid place-items-center bg-black/85 p-4 backdrop-blur-md" onClick={onClose}>
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} onClick={(e) => e.stopPropagation()}
          className="glass-strong flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
            <div className="flex min-w-0 items-center gap-2"><FileText className="h-4 w-4 shrink-0 text-white/50" /><span className="truncate text-sm font-medium">{fileName}</span></div>
            <div className="flex items-center gap-2">
              <a href={url} download={fileName} className="glass grid h-8 w-8 place-items-center rounded-lg hover:bg-white/5" title="Download"><Download className="h-4 w-4" /></a>
              <button onClick={onClose} className="glass grid h-8 w-8 place-items-center rounded-lg hover:bg-white/5"><X className="h-4 w-4" /></button>
            </div>
          </div>

          {/* Sheet tabs */}
          {isSheet && wb && wb.SheetNames.length > 1 && (
            <div className="flex gap-1 border-b border-white/10 px-3 py-2">
              {wb.SheetNames.map((n, i) => (
                <button key={n} onClick={() => setSheet(i)} className={`rounded-md px-3 py-1 text-xs transition-colors ${sheet === i ? "bg-white/10 text-white" : "text-muted-foreground hover:text-white"}`}>{n}</button>
              ))}
            </div>
          )}

          <div className="min-h-0 flex-1 overflow-auto bg-black/40">
            {isPdf && <iframe src={url} title={fileName} className="h-[78vh] w-full" />}
            {isImg && <div className="grid place-items-center p-4"><img src={url} alt={fileName} className="max-h-[78vh] max-w-full rounded-lg" /></div>}
            {isSheet && (
              <div className="p-4">
                {err && <div className="text-sm text-[oklch(0.75_0.2_20)]">Couldn't render: {err}. You can still download it.</div>}
                {!err && !wb && <div className="text-sm text-muted-foreground">Loading spreadsheet…</div>}
                {rows.length > 0 && (
                  <div className="overflow-hidden rounded-lg border border-white/10">
                    <table className="w-full border-collapse text-[13px]">
                      <thead className="sticky top-0 z-10">
                        <tr>
                          <th className="w-10 border-b border-r border-white/10 bg-white/[0.06] px-2 py-2 text-[10px] font-normal text-white/30"></th>
                          {rows[0].map((cell, ci) => (
                            <th key={ci} className="border-b border-r border-white/10 bg-white/[0.06] px-3 py-2 text-left font-semibold text-white last:border-r-0">{cell}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {rows.slice(1).map((r, ri) => (
                          <tr key={ri} className={ri % 2 ? "bg-white/[0.015]" : ""}>
                            <td className="border-b border-r border-white/[0.06] bg-white/[0.03] px-2 py-1.5 text-center text-[10px] text-white/25">{ri + 1}</td>
                            {r.map((cell, ci) => (
                              <td key={ci} className="max-w-[280px] truncate border-b border-r border-white/[0.06] px-3 py-1.5 text-white/80 last:border-r-0" title={cell}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
            {!isPdf && !isImg && !isSheet && (
              <div className="grid place-items-center p-16 text-center text-sm text-muted-foreground">
                Preview not available for .{ext} files.<br /><a href={url} download={fileName} className="mt-3 inline-block rounded-full bg-white px-4 py-2 text-black">Download instead</a>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </Portal>
  );
}
