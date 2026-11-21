import { ArrowRight } from "lucide-react";
import { Badge } from "../common/Badge";
import type { TraceabilityRecord } from "../../types";

const stages: Array<{ key: keyof TraceabilityRecord; label: string }> = [
  { key: "requirement", label: "Requisito" },
  { key: "process", label: "Proceso" },
  { key: "asset", label: "Activo" },
  { key: "risk", label: "Riesgo" },
  { key: "control", label: "Control" },
  { key: "procedure", label: "Procedimiento" },
  { key: "form", label: "Formato/Registro" },
  { key: "kpi", label: "Indicador" },
  { key: "auditFinding", label: "Auditoría/Hallazgo" },
  { key: "improvementAction", label: "Acción de mejora" },
];

export function TraceabilityLinks({ record }: { record: TraceabilityRecord }) {
  return (
    <div className="trace-chain" aria-label={`Cadena de trazabilidad ${record.id}`}>
      {stages.map((stage, index) => {
        const value = String(record[stage.key]);
        const missing = value === "Sin vincular";
        return (
          <div className="trace-chain__step" key={stage.key}>
            <span className="trace-chain__label">
              {index + 1}. {stage.label}
            </span>
            {missing ? (
              <Badge tone="amber">Sin vincular</Badge>
            ) : (
              <span className="trace-chain__value">{value}</span>
            )}
            {index < stages.length - 1 && (
              <ArrowRight size={14} className="trace-chain__arrow" aria-hidden="true" />
            )}
          </div>
        );
      })}
    </div>
  );
}
