import { CircleAlert, ClipboardList, FileSearch, ShieldCheck } from "lucide-react";
import type { RouteKey } from "../app/routes";
import { Badge } from "../components/common/Badge";
import { EmptyState } from "../components/common/EmptyState";
import { PageIntro } from "../components/common/PageIntro";
import { SourceLabel } from "../components/common/SourceLabel";
import { StatusBadge } from "../components/common/StatusBadge";
import { audits, correctiveActions, findings } from "../lib/data";

export function AuditPage({ onNavigate }: { onNavigate: (route: RouteKey) => void }) {
  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="Evaluar · auditoría y hallazgos"
        title="Auditoría y hallazgos"
        description="Planificación, criterios, checklist sugerido, hallazgos y acciones correctivas. No se presentan resultados de auditoría que no existen en el expediente."
        actions={<StatusBadge status="sin_evidencia" />}
      />

      <div className="notice notice--academic">
        <CircleAlert size={18} aria-hidden="true" />
        <div>
          <strong>Dos expedientes separados.</strong> La auditoría interna del
          SGSI de Alestra es distinta del ejercicio «Alestra a La Finca del
          Barrio». Sus alcances, responsables y resultados no se mezclan.
        </div>
      </div>

      <div className="mini-stat-grid">
        <div className="mini-stat"><span>Auditorías registradas</span><strong>{audits.length}</strong></div>
        <div className="mini-stat"><span>Auditorías ejecutadas</span><strong>0</strong></div>
        <div className="mini-stat"><span>Hallazgos</span><strong>{findings.length}</strong></div>
        <div className="mini-stat"><span>Acciones correctivas</span><strong>{correctiveActions.length}</strong></div>
      </div>

      <div className="audit-grid">
        {audits.map((audit) => {
          const internal = audit.type.startsWith("Auditoría interna");
          return (
            <article className="audit-card" key={audit.id}>
              <div className="audit-card__top">
                <span className="audit-card__code">{audit.id}</span>
                <Badge tone={internal ? "blue" : "violet"}>{audit.type}</Badge>
              </div>
              <h3>{audit.name}</h3>
              <p className="audit-card__status">
                <StatusBadge status={audit.evidenceStatus} />
                <Badge tone="amber">{audit.status}</Badge>
              </p>
              <dl className="audit-card__meta">
                <div><dt>Objetivo</dt><dd>{audit.objective}</dd></div>
                <div><dt>Alcance</dt><dd>{audit.scope}</dd></div>
                <div><dt>Criterios</dt><dd>{audit.criteria.join(" · ")}</dd></div>
                <div><dt>Programación</dt><dd>{audit.schedule}</dd></div>
                <div><dt>Auditores</dt><dd>{audit.auditors}</dd></div>
                <div><dt>Auditados / contraparte</dt><dd>{audit.auditees}</dd></div>
                <div><dt>Método</dt><dd>{audit.method}</dd></div>
                <div><dt>Muestra</dt><dd>{audit.samples}</dd></div>
              </dl>
              <div className="audit-card__checklist">
                <strong>Áreas sugeridas / pendientes</strong>
                <ul className="compact-list">
                  {audit.checklist.map((item) => <li key={`${audit.id}-${item}`}>{item}</li>)}
                </ul>
              </div>
              <div className="callout callout--muted">
                <strong>Resultado:</strong> {audit.results}
              </div>
              <p className="audit-card__note">{audit.notes}</p>
              <SourceLabel source={audit} />
            </article>
          );
        })}
      </div>

      <div className="two-column">
        <section className="panel" aria-labelledby="hallazgos-title">
          <div className="panel__header">
            <div>
              <h2 id="hallazgos-title">Hallazgos</h2>
              <p>Requisito, evidencia objetiva, clasificación y causa.</p>
            </div>
            <FileSearch size={19} aria-hidden="true" />
          </div>
          <EmptyState
            title="Sin hallazgos registrados"
            description="La auditoría interna está planeada pero no ejecutada. No se generan no conformidades ficticias. El formato ALE-F-05 está disponible para registrarlas cuando existan."
          />
          <button type="button" className="button button--ghost" onClick={() => onNavigate("formatos")}>
            Ver formato ALE-F-05
          </button>
        </section>

        <section className="panel" aria-labelledby="acciones-correctivas-title">
          <div className="panel__header">
            <div>
              <h2 id="acciones-correctivas-title">Acciones correctivas</h2>
              <p>Contención, causa raíz, verificación de eficacia y responsable.</p>
            </div>
            <ShieldCheck size={19} aria-hidden="true" />
          </div>
          <EmptyState
            title="Sin acciones correctivas"
            description="No hay hallazgos que originen acciones correctivas. Las acciones de mejora del módulo «Mejora continua» son brechas identificadas, no resultados de auditoría."
          />
          <button type="button" className="button button--ghost" onClick={() => onNavigate("mejora")}>
            Ver mejoras pendientes
          </button>
        </section>
      </div>

      <section className="panel" aria-labelledby="checklist-general">
        <div className="panel__header">
          <div>
            <h2 id="checklist-general">Estructura sugerida de verificación</h2>
            <p>Áreas para el cuestionario de auditoría pendiente de incorporar.</p>
          </div>
          <ClipboardList size={19} aria-hidden="true" />
        </div>
        <div className="checklist-grid">
          {audits[0].checklist.map((item) => (
            <div className="checklist-item" key={`general-${item}`}>
              <span aria-hidden="true">☐</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
        <div className="callout callout--blue">
          El plan y el cuestionario citados en la guía no están en <code>docs/</code>.
          Esta lista es una estructura propuesta y no sustituye esos documentos.
        </div>
      </section>
    </div>
  );
}
