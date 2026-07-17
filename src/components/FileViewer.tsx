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

  const html = useMemo<string>(() => {
    if (!wb) return "";
    const ws = wb.Sheets[wb.SheetNames[sheet]];
    if (!ws) return "";
    try { return XLSX.utils.sheet_to_html(ws, { editable: false }); } catch { return ""; }
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
                {html && <div className="xlsx-view overflow-auto rounded-lg" dangerouslySetInnerHTML={{ __html: html }} />}
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
