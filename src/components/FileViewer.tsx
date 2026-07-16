import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import * as XLSX from "xlsx";
import { Portal } from "@/components/Portal";
import { X, Download, FileText } from "lucide-react";

/* Embedded viewer: PDFs render inline (iframe), spreadsheets render as a
   table (SheetJS), images inline. Everything else falls back to download. */
export function FileViewer({ url, fileName, onClose }: { url: string; fileName: string; onClose: () => void }) {
  const ext = (fileName.split(".").pop() || "").toLowerCase();
  const isPdf = ext === "pdf";
  const isSheet = ["xlsx", "xls", "csv", "tsv"].includes(ext);
  const isImg = ["png", "jpg", "jpeg", "gif", "webp", "svg", "avif"].includes(ext);
  const [rows, setRows] = useState<any[][] | null>(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!isSheet) return;
    let alive = true;
    (async () => {
      try {
        const buf = await (await fetch(url)).arrayBuffer();
        const wb = XLSX.read(buf);
        const ws = wb.Sheets[wb.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json<any[]>(ws, { header: 1, blankrows: false });
        if (alive) setRows(data);
      } catch (e: any) { if (alive) setErr(e?.message || "Could not read spreadsheet"); }
    })();
    return () => { alive = false; };
  }, [url, isSheet]);

  return (
    <Portal>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[110] grid place-items-center bg-black/85 p-4 backdrop-blur-md" onClick={onClose}>
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} onClick={(e) => e.stopPropagation()}
          className="glass-strong flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
            <div className="flex min-w-0 items-center gap-2"><FileText className="h-4 w-4 shrink-0 text-white/50" /><span className="truncate text-sm font-medium">{fileName}</span></div>
            <div className="flex items-center gap-2">
              <a href={url} download={fileName} className="glass grid h-8 w-8 place-items-center rounded-lg hover:bg-white/5" title="Download"><Download className="h-4 w-4" /></a>
              <button onClick={onClose} className="glass grid h-8 w-8 place-items-center rounded-lg hover:bg-white/5"><X className="h-4 w-4" /></button>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-auto bg-black/40">
            {isPdf && <iframe src={url} title={fileName} className="h-[78vh] w-full" />}
            {isImg && <div className="grid place-items-center p-4"><img src={url} alt={fileName} className="max-h-[78vh] max-w-full rounded-lg" /></div>}
            {isSheet && (
              <div className="p-4">
                {err && <div className="text-sm text-[oklch(0.75_0.2_20)]">Couldn't render: {err}. You can still download it.</div>}
                {!err && !rows && <div className="text-sm text-muted-foreground">Loading spreadsheet…</div>}
                {rows && (
                  <table className="w-full border-collapse text-sm">
                    <tbody>
                      {rows.map((r, ri) => (
                        <tr key={ri} className={ri === 0 ? "bg-white/[0.06] font-semibold" : ri % 2 ? "bg-white/[0.02]" : ""}>
                          {(r.length ? r : [""]).map((cell: any, ci: number) => (
                            <td key={ci} className="whitespace-nowrap border border-white/8 px-3 py-1.5">{cell == null ? "" : String(cell)}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
