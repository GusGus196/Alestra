import { CircleAlert, ClipboardList, Info, Target } from "lucide-react";
import { Badge, DataNatureBadge, MeasurementBadge } from "../components/common/Badge";
import { EmptyState } from "../components/common/EmptyState";
import { PageIntro } from "../components/common/PageIntro";
import { SourceLabel } from "../components/common/SourceLabel";
import { StatusBadge } from "../components/common/StatusBadge";
import { DataTable } from "../components/tables/DataTable";
import { kpis, objectives } from "../lib/data";
import type { KpiRecord, Objective } from "../types";

const rules = [
  "OBJ-01 a OBJ-04 son la base documentada; PROP-05 a PROP-08 son propuestas pendientes de aprobación.",
  "Las metas son propuestas de diseño; no son resultados medidos.",
  "Si no existe medición, se muestra «Sin medición» o «Pendiente».",
  "No se generan series temporales ficticias que parezcan datos históricos reales.",
  "SLA depende del contrato aplicable: no se asigna un porcentaje universal.",
  "CSAT requiere definir escala, pregunta, muestra y meta antes de calcularlo.",
];

export function IndicatorsPage() {
  const baseKpis = kpis.filter((kpi) => kpi.code.startsWith("OBJ-"));
  const proposedKpis = kpis.filter((kpi) => kpi.code.startsWith("PROP-"));

  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="Evaluar · matriz de objetivos e indicadores"
        title="Indicadores del proceso"
        description="Ocho indicadores: cuatro objetivos documentados (OBJ-01 a OBJ-04) y cuatro propuestas pendientes de aprobación (PROP-05 a PROP-08). Fórmula, fuente, frecuencia, responsable y evidencia esperada sin resultados inventados."
        actions={<Badge tone="violet">8 indicadores</Badge>}
      />

      <div className="notice notice--academic">
        <CircleAlert size={18} aria-hidden="true" />
        <div>
          <strong>No hay resultados operativos en esta versión.</strong> Uptime
          &gt;99.9% y MTTR &lt;2h son metas propuestas; SLA depende del contrato
          aplicable y CSAT está «Por definir». Las cuatro propuestas adicionales
          tampoco tienen medición registrada.
        </div>
      </div>

      <section aria-labelledby="kpis-base">
        <div className="section-heading">
          <h3 id="kpis-base">Base documentada · OBJ-01 a OBJ-04</h3>
          <span className="section-heading__hint">Fuente: matriz de objetivos e indicadores</span>
        </div>
        <div className="objective-grid">
          {baseKpis.map((kpi) => (
            <article className="objective-card" key={`base-${kpi.id}`}>
              <header>
                <span className="objective-card__id">{kpi.code}</span>
                <StatusBadge status={kpi.evidenceStatus} />
              </header>
              <h3>{kpi.name}</h3>
              <p>{kpi.definition}</p>
              <dl>
                <div><dt>Meta propuesta</dt><dd>{kpi.target}</dd></div>
                <div><dt>Frecuencia</dt><dd>{kpi.frequency}</dd></div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="kpis-propuestos">
        <div className="section-heading">
          <h3 id="kpis-propuestos">Propuestos · PROP-05 a PROP-08</h3>
          <span className="section-heading__hint">Pendientes de aprobación; sin medición</span>
        </div>
        <div className="objective-grid">
          {proposedKpis.map((kpi) => (
            <article className="objective-card objective-card--proposed" key={`prop-${kpi.id}`}>
              <header>
                <span className="objective-card__id">{kpi.code}</span>
                <StatusBadge status={kpi.evidenceStatus} />
              </header>
              <h3>{kpi.name}</h3>
              <p>{kpi.definition}</p>
              <dl>
                <div><dt>Meta</dt><dd>{kpi.target}</dd></div>
                <div><dt>Estado</dt><dd>{kpi.statusLabel}</dd></div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="panel" aria-labelledby="kpis-tabla">
        <div className="panel__header">
          <div>
            <h2 id="kpis-tabla">Fichas de los ocho indicadores</h2>
            <p>Numerador, denominador, fuente de datos y evidencia esperada.</p>
          </div>
          <span className="panel__count">{kpis.length} indicadores</span>
        </div>
        <DataTable<KpiRecord>
          compact
          rowKey={(row) => row.id}
          rows={kpis}
          columns={[
            { key: "code", header: "Código", render: (row) => <strong>{row.code}</strong> },
            { key: "name", header: "Indicador", render: (row) => row.name },
            { key: "formula", header: "Fórmula", render: (row) => <span className="clamp-2">{row.formula}</span> },
            { key: "target", header: "Meta", render: (row) => row.target },
            { key: "unit", header: "Unidad", render: (row) => row.unit },
            { key: "frequency", header: "Frecuencia", render: (row) => row.frequency },
            { key: "result", header: "Resultado", render: () => <MeasurementBadge status="not_measured" /> },
            { key: "status", header: "Estado", render: (row) => <StatusBadge status={row.evidenceStatus} /> },
          ]}
        />
      </section>

      <div className="two-column">
        <section className="panel" aria-labelledby="reglas-medicion">
          <div className="panel__header">
            <div>
              <h2 id="reglas-medicion">Reglas de presentación</h2>
              <p>Lineamientos para evitar resultados ficticios.</p>
            </div>
            <Target size={20} aria-hidden="true" />
          </div>
          <ul className="bullet-list">
            {rules.map((rule) => <li key={rule}>{rule}</li>)}
          </ul>
        </section>

        <section className="panel" aria-labelledby="evidencia-title">
          <div className="panel__header">
            <div>
              <h2 id="evidencia-title">Responsables y evidencia</h2>
              <p>Campos documentados en la matriz de objetivos y propuestas.</p>
            </div>
            <ClipboardList size={20} aria-hidden="true" />
          </div>
          <ul className="stack-list">
            {kpis.map((kpi) => (
              <li key={`evidence-${kpi.id}`}>
                <strong>{kpi.code} · {kpi.name}</strong>
                <span>{kpi.expectedEvidence}</span>
                <span className="text-muted">Responsable: {kpi.owner}</span>
                <SourceLabel source={kpi} compact />
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="panel" aria-labelledby="objetivos-tabla">
        <div className="panel__header">
          <div>
            <h2 id="objetivos-tabla">Matriz de objetivos fuente</h2>
            <p>Fuente: ALE-SGI-OBJ-01, hoja Objetivos_SGI (propuesta académica).</p>
          </div>
          <span className="panel__count">{objectives.length} objetivos</span>
        </div>
        <DataTable<Objective>
          compact
          rowKey={(row) => row.id}
          columns={[
            { key: "id", header: "ID", render: (row) => <strong>{row.id}</strong> },
            { key: "title", header: "Objetivo", render: (row) => row.title },
            { key: "indicator", header: "Indicador", render: (row) => row.indicator },
            { key: "evidence", header: "Evidencia", render: (row) => <span className="clamp-2">{row.evidence}</span> },
            { key: "nature", header: "Naturaleza", render: (row) => <DataNatureBadge nature={row.dataNature} /> },
            { key: "measurement", header: "Última medición", render: () => <MeasurementBadge status="not_measured" /> },
          ]}
          rows={objectives}
        />
      </section>

      <section className="panel" aria-labelledby="sin-series">
        <div className="panel__header">
          <div>
            <h2 id="sin-series">Seguimiento temporal</h2>
            <p>La hoja Seguimiento del archivo fuente no registra resultados.</p>
          </div>
          <Info size={20} aria-hidden="true" />
        </div>
        <EmptyState
          title="Pendiente de medición"
          description="No se muestra ninguna gráfica de series temporales porque no hay mediciones verificadas ni datos DEMO en este módulo."
        />
      </section>
    </div>
  );
}
