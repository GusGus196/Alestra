import { useMemo, useState } from "react";
import { ArrowRight, GitBranch, Target } from "lucide-react";
import type { RouteKey } from "../app/routes";
import { Badge } from "../components/common/Badge";
import { EmptyState } from "../components/common/EmptyState";
import { PageIntro } from "../components/common/PageIntro";
import { SourceLabel } from "../components/common/SourceLabel";
import { StatusBadge } from "../components/common/StatusBadge";
import { DataTable } from "../components/tables/DataTable";
import { FilterBar } from "../components/tables/FilterBar";
import { correctiveActions, findings, improvementActions, meta } from "../lib/data";
import { normalizeText } from "../lib/formatters";
import type { ImprovementActionRecord } from "../types";

const priorityTone: Record<ImprovementActionRecord["priority"], "red" | "amber" | "blue" | "neutral"> = {
  Alta: "red",
  Media: "amber",
  Baja: "blue",
  Pendiente: "neutral",
};

export function ImprovementPage({ onNavigate }: { onNavigate: (route: RouteKey) => void }) {
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("all");

  const filtered = useMemo(() => {
    const term = normalizeText(search.trim());
    return improvementActions.filter((action) => {
      const matchesText =
        !term ||
        normalizeText(`${action.id} ${action.origin} ${action.description} ${action.owner}`).includes(term);
      const matchesPriority = priority === "all" || action.priority === priority;
      return matchesText && matchesPriority;
    });
  }, [search, priority]);

  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="Mejorar · ciclo PHVA"
        title="Mejora continua"
        description="Brechas identificadas en la revisión documental, organizadas por origen y prioridad. No son acciones correctivas derivadas de hallazgos de auditoría."
        actions={<Badge tone="violet">PHVA</Badge>}
      />

      <section aria-labelledby="phva-mejora" className="panel">
        <div className="panel__header">
          <div>
            <h2 id="phva-mejora">Ciclo Planificar–Hacer–Verificar–Actuar</h2>
            <p>Relación entre fases y módulos del portal.</p>
          </div>
          <GitBranch size={19} aria-hidden="true" />
        </div>
        <div className="phva-grid">
          {meta.phva.map((phase, index) => (
            <article className="phva-card" key={`${phase.phase}-mejora`}>
              <span className="phva-card__number">0{index + 1}</span>
              <h3>{phase.phase}</h3>
              <p>{phase.description}</p>
              <span className="phva-card__label">{phase.label}</span>
              <div className="phva-card__modules">
                <strong>Módulos</strong>
                <span>{phase.modules.join(" · ")}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="mini-stat-grid">
        <div className="mini-stat"><span>Acciones de mejora</span><strong>{improvementActions.length}</strong></div>
        <div className="mini-stat"><span>Prioridad alta</span><strong>{improvementActions.filter((a) => a.priority === "Alta").length}</strong></div>
        <div className="mini-stat"><span>Hallazgos de auditoría</span><strong>{findings.length}</strong></div>
        <div className="mini-stat"><span>Acciones correctivas</span><strong>{correctiveActions.length}</strong></div>
      </div>

      <div className="notice notice--academic">
        <Target size={18} aria-hidden="true" />
        <div>
          <strong>Diferencia de conceptos:</strong> una acción de mejora puede
          surgir de una revisión documental o de una brecha de diseño. Una acción
          correctiva requiere un hallazgo con evidencia objetiva. Como no hay
          auditoría ejecutada, este módulo solo muestra mejoras pendientes.
        </div>
      </div>

      <section className="panel" aria-labelledby="plan-mejora">
        <div className="panel__header">
          <div>
            <h2 id="plan-mejora">Plan de mejoras</h2>
            <p>Selecciona una fila para consultar procedencia y evidencia esperada.</p>
          </div>
          <span className="panel__count">{filtered.length} de {improvementActions.length}</span>
        </div>
        <FilterBar
          search={search}
          onSearch={setSearch}
          searchPlaceholder="Buscar mejora, origen o responsable…"
          filters={[
            {
              label: "Prioridad",
              value: priority,
              onChange: setPriority,
              options: [
                { value: "all", label: "Todas las prioridades" },
                ...(["Alta", "Media", "Baja", "Pendiente"] as const).map((value) => ({ value, label: value })),
              ],
            },
          ]}
          resultLabel={`${filtered.length} acciones`}
        />
        <DataTable<ImprovementActionRecord>
          compact
          rowKey={(row) => row.id}
          rows={filtered}
          columns={[
            { key: "id", header: "ID", render: (row) => <strong>{row.id}</strong> },
            { key: "origin", header: "Origen", render: (row) => row.origin },
            { key: "description", header: "Acción propuesta", render: (row) => <span className="clamp-2">{row.description}</span> },
            {
              key: "priority",
              header: "Prioridad",
              render: (row) => <Badge tone={priorityTone[row.priority]}>{row.priority}</Badge>,
            },
            { key: "owner", header: "Responsable por rol", render: (row) => row.owner },
            { key: "kpi", header: "Indicador", render: (row) => row.relatedKpi },
            { key: "due", header: "Fecha", render: (row) => row.dueDate },
            { key: "status", header: "Estado", render: (row) => <StatusBadge status={row.evidenceStatus} /> },
          ]}
        />
      </section>

      <section className="panel" aria-labelledby="detalle-mejoras">
        <div className="panel__header">
          <div>
            <h2 id="detalle-mejoras">Detalle y procedencia</h2>
            <p>Evidencia esperada de cada mejora antes de considerarla cerrada.</p>
          </div>
        </div>
        <div className="improvement-list">
          {improvementActions.map((action) => (
            <article className="improvement-item" key={`detail-${action.id}`}>
              <div className="improvement-item__head">
                <strong>{action.id} · {action.origin}</strong>
                <Badge tone={priorityTone[action.priority]}>{action.priority}</Badge>
              </div>
              <p>{action.description}</p>
              <dl className="improvement-item__meta">
                <div><dt>Responsable</dt><dd>{action.owner}</dd></div>
                <div><dt>Indicador</dt><dd>{action.relatedKpi}</dd></div>
                <div><dt>Evidencia</dt><dd>{action.evidence}</dd></div>
                <div><dt>Estado</dt><dd>{action.status}</dd></div>
              </dl>
              <SourceLabel source={action} compact />
            </article>
          ))}
        </div>
      </section>

      <div className="two-column">
        <section className="panel" aria-labelledby="sin-correctivas">
          <div className="panel__header">
            <div><h2 id="sin-correctivas">Sin acciones correctivas</h2></div>
          </div>
          <EmptyState
            title="No hay acciones correctivas"
            description="Cuando se ejecute la auditoría y existan hallazgos, se registrarán en ALE-F-05 y se vincularán aquí."
          />
        </section>
        <section className="panel" aria-labelledby="siguiente-paso">
          <div className="panel__header">
            <div><h2 id="siguiente-paso">Siguiente paso</h2></div>
          </div>
          <ul className="bullet-list">
            <li>Validar prioridades y responsables con el equipo académico.</li>
            <li>Definir fechas compromiso reales antes de medir cumplimiento.</li>
            <li>Vincular cada mejora cerrada con evidencia documentada.</li>
            <li>Revisar el efecto en los indicadores propuestos.</li>
          </ul>
          <button type="button" className="button button--ghost" onClick={() => onNavigate("indicadores")}>
            Ver indicadores <ArrowRight size={15} />
          </button>
        </section>
      </div>
    </div>
  );
}
