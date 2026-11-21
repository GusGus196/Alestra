import { ArrowRight, CircleAlert, ClipboardCheck, Users } from "lucide-react";
import type { RouteKey } from "../app/routes";
import { AcademicSimulationBanner } from "../components/common/AcademicSimulationBanner";
import { DataNatureBadge } from "../components/common/Badge";
import { PageIntro } from "../components/common/PageIntro";
import { SourceLabel } from "../components/common/SourceLabel";
import { incidents, meta, risks } from "../lib/data";
import { formatDateTime, formatDuration } from "../lib/formatters";

export function IncidentsPage({
  onNavigate,
}: {
  onNavigate: (route: RouteKey) => void;
}) {
  const incident = incidents[0];
  const relatedRisk = risks.find((risk) => risk.id === incident.riskId);

  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="Registros de ejemplo · ALE-PR-01"
        title="Incidentes y atención"
        description="Consulta del registro de ejemplo incluido en el Manual SGI y del flujo propuesto para atender solicitudes e incidentes de Internet Empresarial."
        actions={<DataNatureBadge nature="simulated" />}
      />

      <AcademicSimulationBanner
        notice={incident.simulationNotice}
        description="Los valores 45 minutos y 99.95% de Uptime aparecen solo dentro de este escenario académico. No son indicadores operativos reales de Alestra."
      />

      <section className="panel incident-card" aria-labelledby="incidente-titulo">
        <div className="panel__header">
          <div>
            <p className="incident-card__code">Registro {incident.id}</p>
            <h2 id="incidente-titulo">Ataque volumétrico Anti-DDoS</h2>
            <p>{incident.process}</p>
          </div>
          <span className="badge badge--red">SEVERIDAD: {incident.severity.toUpperCase()}</span>
        </div>

        <div className="incident-card__alert">
          <CircleAlert size={18} aria-hidden="true" />
          <span>
            SIMULACIÓN ACADÉMICA — NO ES UN INCIDENTE REAL · Fuente: Manual SGI,
            formato F-01 lleno como evidencia de ejemplo.
          </span>
        </div>

        <dl className="incident-fields">
          <div>
            <dt>Fecha y hora de detección</dt>
            <dd>{formatDateTime(incident.date)}</dd>
          </div>
          <div>
            <dt>Proceso afectado</dt>
            <dd>{incident.process}</dd>
          </div>
          <div>
            <dt>Descripción</dt>
            <dd>{incident.description}</dd>
          </div>
          <div>
            <dt>Severidad / riesgo</dt>
            <dd>
              {incident.severity} · {incident.riskId}
              {relatedRisk ? ` (${relatedRisk.inherentScore}, ${relatedRisk.classification})` : ""}
            </dd>
          </div>
          <div>
            <dt>Acción inmediata</dt>
            <dd>{incident.action}</dd>
          </div>
          <div>
            <dt>Tiempo de resolución reportado</dt>
            <dd>
              <strong>{formatDuration(incident.mttrMinutes)}</strong>{" "}
              <span className="text-muted">(SIMULADO)</span>
            </dd>
          </div>
          <div>
            <dt>Resultado / estatus final</dt>
            <dd>{incident.status}</dd>
          </div>
          <div>
            <dt>Uptime reportado en el escenario</dt>
            <dd>
              <strong>{incident.reportedUptime}</strong>{" "}
              <span className="text-muted">(SIMULADO)</span>
            </dd>
          </div>
          <div className="incident-fields__wide">
            <dt>Resultado documentado</dt>
            <dd>{incident.outcome}</dd>
          </div>
        </dl>

        <div className="incident-card__footer">
          <button type="button" className="button button--ghost" onClick={() => onNavigate("riesgos")}>
            Ver riesgo {incident.riskId} <ArrowRight size={15} />
          </button>
          <button type="button" className="button button--ghost" onClick={() => onNavigate("formatos")}>
            Abrir formato ALE-F-01 <ArrowRight size={15} />
          </button>
          <SourceLabel source={incident} compact />
        </div>
      </section>

      <div className="two-column">
        <section className="panel" aria-labelledby="flujo-title">
          <div className="panel__header">
            <div>
              <h2 id="flujo-title">Flujo propuesto de atención</h2>
              <p>{meta.procedure.source}</p>
            </div>
            <ClipboardCheck size={20} aria-hidden="true" />
          </div>
          <ol className="timeline">
            {meta.procedure.steps.map((step, index) => (
              <li key={step}>
                <span className="timeline__number">{index + 1}</span>
                <div><strong>{step}</strong></div>
              </li>
            ))}
          </ol>
        </section>

        <section className="panel" aria-labelledby="roles-title">
          <div className="panel__header">
            <div>
              <h2 id="roles-title">Roles propuestos</h2>
              <p>Responsabilidades definidas en el procedimiento académico.</p>
            </div>
            <Users size={20} aria-hidden="true" />
          </div>
          <ul className="stack-list">
            {meta.procedure.roles.map((item) => (
              <li key={item.role}>
                <strong>{item.role}</strong>
                <span>{item.responsibility}</span>
              </li>
            ))}
          </ul>
          <div className="callout callout--muted">
            <strong>Estado documental:</strong> propuesta académica pendiente de
            validación. Los niveles, contactos y tiempos exactos no se fijaron
            en el expediente.
          </div>
        </section>
      </div>
    </div>
  );
}
