import { FileText } from "lucide-react";
import { SourceStatusBadge } from "./StatusBadge";
import type { SourceMeta } from "../../types";

export function SourceLabel({
  source,
  compact = false,
}: {
  source: Pick<SourceMeta, "sourceDocument" | "sourceStatus" | "discrepancyNote">;
  compact?: boolean;
}) {
  return (
    <div className={`source-label ${compact ? "source-label--compact" : ""}`}>
      <div className="source-label__row">
        <FileText size={14} aria-hidden="true" />
        <span title={source.sourceDocument}>{source.sourceDocument || "Sin fuente documental"}</span>
        <SourceStatusBadge status={source.sourceStatus} />
      </div>
      {!compact && source.discrepancyNote && (
        <p className="source-label__note">{source.discrepancyNote}</p>
      )}
    </div>
  );
}
