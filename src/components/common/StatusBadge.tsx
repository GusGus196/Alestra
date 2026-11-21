import { Badge } from "./Badge";
import type { EvidenceStatus, SourceStatus } from "../../types";

type Tone = "neutral" | "blue" | "green" | "amber" | "red" | "violet";

const evidenceMap: Record<EvidenceStatus, { label: string; tone: Tone }> = {
  documentado: { label: "Documentado", tone: "blue" },
  propuesto: { label: "Propuesto", tone: "violet" },
  pendiente_validacion: { label: "Pendiente de validación", tone: "amber" },
  ejemplo: { label: "Ejemplo", tone: "amber" },
  simulacion_academica: { label: "Simulación académica", tone: "red" },
  medido: { label: "Medido", tone: "green" },
  sin_evidencia: { label: "Sin evidencia", tone: "neutral" },
};

const sourceMap: Record<SourceStatus, { label: string; tone: Tone }> = {
  disponible: { label: "Archivo disponible", tone: "green" },
  pendiente_incorporar: { label: "Archivo pendiente de incorporar", tone: "amber" },
  equivalente_documentado: { label: "Fuente equivalente documentada", tone: "blue" },
  no_aplica: { label: "Propuesta sin archivo fuente", tone: "neutral" },
};

export function StatusBadge({ status }: { status?: EvidenceStatus }) {
  if (!status) return <Badge tone="neutral">Sin estado</Badge>;
  const config = evidenceMap[status];
  return <Badge tone={config.tone}>{config.label}</Badge>;
}

export function SourceStatusBadge({ status }: { status: SourceStatus }) {
  const config = sourceMap[status];
  return <Badge tone={config.tone}>{config.label}</Badge>;
}

export function evidenceLabel(status?: EvidenceStatus): string {
  return status ? evidenceMap[status].label : "Sin estado";
}
