import { useState } from "react";
import { ArrowRight, ClipboardCheck, FileText } from "lucide-react";
import type { RouteKey } from "../app/routes";
import { Badge } from "../components/common/Badge";
import { DetailDrawer, DetailField, DetailSection } from "../components/common/DetailDrawer";
import { PageIntro } from "../components/common/PageIntro";
import { SourceLabel } from "../components/common/SourceLabel";
import { StatusBadge } from "../components/common/StatusBadge";
import { procedures } from "../lib/data";
import type { ProcedureRecord } from "../types";

const DRAFT_LABEL = "Borrador académico — pendiente de validación";

export function ProceduresPage({ onNavigate }: { onNavigate: (route: RouteKey) => void }) {
  const [selected, setSelected] = useState<ProcedureRecord | null>(null);

  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="Operar · procedimientos del SGI"
        title="Procedimientos"
        description="Un procedimiento disponible en el expediente y dos propuestas académicas. Las fichas muestran objetivo, alcance, pasos, decisiones humanas, roles, controles y registros asociados."
        actions={<Badge tone="blue">3 procedimientos</Badge>}
      />

      <div className="notice notice--academic">
        <ClipboardCheck size={18} aria-hidden="true" />
        <div>
          <strong>Estado documental:</strong> ALE-PR-01 está documentado con
          aprobación formal pendiente. ALE-PR-02 y ALE-PR-03 están rotulados como
          «{DRAFT_LABEL}». Ninguno debe presentarse como procedimiento vigente de
          Alestra.
        </div>
      </div>

      <div className="procedure-grid">
        {procedures.map((procedure) => {
          const draft = procedure.status.includes("Borrador");
          return (
            <article className="procedure-card" key={procedure.id}>
              <div className="procedure-card__top">
                <span className="procedure-card__code">{procedure.code}</span>
                <Badge tone={draft ? "amber" : "blue"}>
                  {draft ? DRAFT_LABEL : "DOCUMENTADO"}
                </Badge>
              </div>
              <h3>{procedure.title}</h3>
              <p>{procedure.objective}</p>
              <dl className="procedure-card__meta">
                <div><dt>Versión</dt><dd>{procedure.version}</dd></div>
                <div><dt>Pasos</dt><dd>{procedure.steps.length}</dd></div>
                <div><dt>Registros</dt><dd>{procedure.records.length}</dd></div>
                <div><dt>Riesgos</dt><dd>{procedure.relatedRisks.join(", ") || "Sin vincular"}</dd></div>
              </dl>
              <div className="procedure-card__scope">
                <strong>Alcance</strong>
                <span>{procedure.scope}</span>
              </div>
              <div className="procedure-card__actions">
                <button type="button" className="button button--ghost" onClick={() => setSelected(procedure)}>
                  <FileText size={15} aria-hidden="true" /> Ver ficha completa
                </button>
                <button type="button" className="text-link" onClick={() => onNavigate("formatos")}>
                  Formatos <ArrowRight size={14} />
                </button>
              </div>
              <SourceLabel source={procedure} compact />
            </article>
          );
        })}
      </div>

      <section className="panel" aria-labelledby="comparativa-procedimientos">
        <div className="panel__header">
          <div>
            <h2 id="comparativa-procedimientos">Comparativa de procedimientos</h2>
            <p>Relaciones con controles, indicadores y registros del portal.</p>
          </div>
        </div>
        <div className="table-scroll">
          <table className="data-table data-table--compact">
            <thead>
              <tr>
                <th scope="col">Código</th>
                <th scope="col">Estado</th>
                <th scope="col">Controles</th>
                <th scope="col">Registros</th>
                <th scope="col">Indicadores</th>
                <th scope="col">Aprobación</th>
              </tr>
            </thead>
            <tbody>
              {procedures.map((procedure) => (
                <tr key={`${procedure.id}-comparison`}>
                  <td><strong>{procedure.code}</strong></td>
                  <td><StatusBadge status={procedure.evidenceStatus} /></td>
                  <td>{procedure.controls.join(", ")}</td>
                  <td>{procedure.records.join(", ")}</td>
                  <td>{procedure.kpi}</td>
                  <td className="clamp-2">{procedure.approval}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <DetailDrawer
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        eyebrow={selected ? `Ficha documental · ${selected.code} · ${selected.version}` : undefined}
        title={selected?.title ?? ""}
      >
        {selected && (
          <>
            <div className="detail-badges">
              <StatusBadge status={selected.evidenceStatus} />
              <Badge tone={selected.status.includes("Borrador") ? "amber" : "blue"}>{selected.status}</Badge>
            </div>

            <DetailSection title="Objetivo y alcance">
              <dl className="detail-grid">
                <DetailField label="Objetivo">{selected.objective}</DetailField>
                <DetailField label="Alcance">{selected.scope}</DetailField>
                <DetailField label="Entradas">{selected.inputs.join(" · ")}</DetailField>
                <DetailField label="Referencias">{selected.references.join(" · ")}</DetailField>
              </dl>
            </DetailSection>

            <DetailSection title={`Secuencia (${selected.steps.length} pasos)`}>
              <ol className="timeline">
                {selected.steps.map((step) => (
                  <li key={`${selected.id}-step-${step.order}`}>
                    <span className="timeline__number">{step.order}</span>
                    <div>
                      <strong>{step.name}</strong>
                      <p>{step.detail}</p>
                      {step.decision && <p className="decision-note">Decisión: {step.decision}</p>}
                    </div>
                  </li>
                ))}
              </ol>
            </DetailSection>

            <DetailSection title="Decisiones y responsables">
              <ul className="bullet-list">
                {selected.decisions.map((decision) => <li key={`${selected.id}-decision-${decision}`}>{decision}</li>)}
              </ul>
              <dl className="detail-grid">
                {selected.roles.map((role) => (
                  <DetailField key={`${selected.id}-role-${role.role}`} label={role.role}>
                    {role.responsibility}
                  </DetailField>
                ))}
              </dl>
            </DetailSection>

            <DetailSection title="Controles y registros">
              <dl className="detail-grid">
                <DetailField label="Definiciones">
                  {selected.definitions.map((item) => `${item.term}: ${item.meaning}`).join(" · ")}
                </DetailField>
                <DetailField label="Controles">{selected.controls.join(", ")}</DetailField>
                <DetailField label="Registros">{selected.records.join(", ")}</DetailField>
                <DetailField label="Indicadores">{selected.kpi}</DetailField>
                <DetailField label="Anexos">{selected.attachments.join(", ")}</DetailField>
                <DetailField label="Aprobación">{selected.approval}</DetailField>
                <DetailField label="Control de cambios">{selected.changeControl}</DetailField>
              </dl>
            </DetailSection>

            <SourceLabel source={selected} />
          </>
        )}
      </DetailDrawer>
    </div>
  );
}
