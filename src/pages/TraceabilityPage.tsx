import { useMemo, useState } from "react";
import { Info, Route as RouteIcon } from "lucide-react";
import { Badge } from "../components/common/Badge";
import { DetailDrawer } from "../components/common/DetailDrawer";
import { PageIntro } from "../components/common/PageIntro";
import { SourceLabel } from "../components/common/SourceLabel";
import { StatusBadge } from "../components/common/StatusBadge";
import { DataTable } from "../components/tables/DataTable";
import { FilterBar } from "../components/tables/FilterBar";
import { TraceabilityLinks } from "../components/tracing/TraceabilityLinks";
import { traceability } from "../lib/data";
import { normalizeText } from "../lib/formatters";
import type { TraceabilityRecord } from "../types";

export function TraceabilityPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [selected, setSelected] = useState<TraceabilityRecord | null>(null);

  const statuses = [...new Set(traceability.map((row) => row.evidenceStatus))].filter(
    (value): value is NonNullable<typeof value> => Boolean(value),
  );

  const filtered = useMemo(() => {
    const term = normalizeText(search.trim());
    return traceability.filter((row) => {
      const text = [
        row.id,
        row.requirement,
        row.process,
        row.asset,
        row.risk,
        row.control,
        row.procedure,
        row.form,
        row.kpi,
        row.auditFinding,
        row.improvementAction,
      ].join(" ");
      const matchesText = !term || normalizeText(text).includes(term);
      const matchesStatus = status === "all" || row.evidenceStatus === status;
      return matchesText && matchesStatus;
    });
  }, [search, status]);

  const withGaps = traceability.filter((row) => row.gaps.length > 0).length;

  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="Expediente · matriz de trazabilidad"
        title="Trazabilidad del SGI"
        description="Cadena Requisito → Proceso → Activo → Riesgo → Control → Procedimiento → Formato/Registro → Indicador → Auditoría/Hallazgo → Acción de mejora. Los eslabones ausentes se muestran como «Sin vincular»."
        actions={<Badge tone="blue">{traceability.length} cadenas</Badge>}
      />

      <div className="notice notice--academic">
        <Info size={18} aria-hidden="true" />
        <div>
          <strong>Lectura honesta:</strong> «Sin vincular» no es un error de
          código ni un dato omitido: identifica una relación que aún no está
          documentada o verificada. Las brechas se listan en el detalle de cada
          cadena.
        </div>
      </div>

      <div className="mini-stat-grid">
        <div className="mini-stat"><span>Cadenas documentadas</span><strong>{traceability.length}</strong></div>
        <div className="mini-stat"><span>Con brechas registradas</span><strong>{withGaps}</strong></div>
        <div className="mini-stat"><span>Eslabones por cadena</span><strong>10</strong></div>
        <div className="mini-stat"><span>Hallazgos de auditoría</span><strong>0</strong></div>
      </div>

      <section className="panel" aria-labelledby="matriz-trazabilidad">
        <div className="panel__header">
          <div>
            <h2 id="matriz-trazabilidad">Matriz de trazabilidad</h2>
            <p>Selecciona una cadena para ver los diez eslabones y sus brechas.</p>
          </div>
          <RouteIcon size={19} aria-hidden="true" />
        </div>
        <FilterBar
          search={search}
          onSearch={setSearch}
          searchPlaceholder="Buscar por cualquier eslabón…"
          filters={[
            {
              label: "Estado de evidencia",
              value: status,
              onChange: setStatus,
              options: [
                { value: "all", label: "Todos los estados" },
                ...statuses.map((value) => ({ value, label: value.replace(/_/g, " ") })),
              ],
            },
          ]}
          resultLabel={`${filtered.length} de ${traceability.length} cadenas`}
        />
        <DataTable<TraceabilityRecord>
          compact
          rowKey={(row) => row.id}
          rows={filtered}
          onRowClick={setSelected}
          columns={[
            { key: "id", header: "ID", render: (row) => <strong>{row.id}</strong> },
            { key: "requirement", header: "Requisito", render: (row) => <span className="clamp-2">{row.requirement}</span> },
            { key: "process", header: "Proceso", render: (row) => row.process },
            { key: "risk", header: "Riesgo", render: (row) => <span className="clamp-2">{row.risk}</span> },
            { key: "control", header: "Control", render: (row) => <span className="clamp-2">{row.control}</span> },
            { key: "form", header: "Formato", render: (row) => row.form },
            { key: "kpi", header: "Indicador", render: (row) => row.kpi },
            { key: "audit", header: "Auditoría / hallazgo", render: (row) => <span className="clamp-2">{row.auditFinding}</span> },
            { key: "status", header: "Estado", render: (row) => <StatusBadge status={row.evidenceStatus} /> },
          ]}
        />
      </section>

      <DetailDrawer
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        eyebrow={selected ? `Cadena ${selected.id} · trazabilidad` : undefined}
        title={selected ? `Trazabilidad ${selected.id}` : ""}
      >
        {selected && (
          <>
            <div className="detail-badges">
              <StatusBadge status={selected.evidenceStatus} />
              <Badge tone="amber">{selected.gaps.length} brechas</Badge>
            </div>
            <TraceabilityLinks record={selected} />
            <section className="detail-section">
              <h3>Brechas y pendientes</h3>
              <div className="detail-section__content">
                {selected.gaps.length > 0 ? (
                  <ul className="bullet-list">
                    {selected.gaps.map((gap) => <li key={`${selected.id}-gap-${gap}`}>{gap}</li>)}
                  </ul>
                ) : (
                  <p>Sin brechas registradas.</p>
                )}
              </div>
            </section>
            {selected.academicLabel && (
              <div className="callout callout--muted">
                <strong>Etiqueta:</strong> {selected.academicLabel}
              </div>
            )}
            <SourceLabel source={selected} />
          </>
        )}
      </DetailDrawer>
    </div>
  );
}
