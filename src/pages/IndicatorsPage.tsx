import { CircleAlert, ClipboardList, Info, Target } from "lucide-react";
import { DataNatureBadge, MeasurementBadge } from "../components/common/Badge";
import { EmptyState } from "../components/common/EmptyState";
import { PageIntro } from "../components/common/PageIntro";
import { DataTable } from "../components/tables/DataTable";
import { objectives } from "../lib/data";
import type { Objective } from "../types";

const rules = [
  "Las metas son propuestas de diseño; no son resultados medidos.",
  "Si no existe medición, se muestra «Sin medición» o «Pendiente».",
  "No se generan series temporales ficticias que parezcan datos históricos reales.",
  "SLA depende del contrato aplicable: no se asigna un porcentaje universal.",
  "CSAT requiere definir escala, pregunta, muestra y meta antes de calcularlo.",
];

export function IndicatorsPage() {
  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="ALE-SGI-OBJ-01 · matriz de objetivos"
        title="Indicadores del proceso"
        description="Cuatro objetivos vinculados a ALE-CP-01, con fórmula, meta propuesta, frecuencia y responsable sugerido. La hoja de seguimiento del archivo fuente no contiene mediciones registradas."
        actions={<DataNatureBadge nature="proposed" />}
      />

      <div className="notice notice--academic">
        <CircleAlert size={18} aria-hidden="true" />
        <div>
          <strong>No hay resultados operativos en esta versión.</strong> Uptime
          &gt;99.9% y MTTR &lt;2h son metas propuestas; SLA es «Según SLA
          contratado» y CSAT está «Por definir».
        </div>
      </div>

      <div className="objective-grid">
        {objectives.map((objective) => (
          <article className="objective-card" key={objective.id}>
            <header>
              <span className="objective-card__id">{objective.id}</span>
              <MeasurementBadge status={objective.measurementStatus} />
            </header>
            <h3>{objective.indicator}</h3>
            <p>{objective.title}</p>
            <dl>
              <div>
                <dt>Meta propuesta</dt>
                <dd>{objective.target}</dd>
              </div>
              <div>
                <dt>Frecuencia</dt>
                <dd>{objective.frequency}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

      <section className="panel" aria-labelledby="objetivos-tabla">
        <div className="panel__header">
          <div>
            <h2 id="objetivos-tabla">Detalle de objetivos</h2>
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
            {
              key: "formula",
              header: "Fórmula / método",
              render: (row) => <span className="text-muted">{row.formula}</span>,
            },
            { key: "target", header: "Meta", render: (row) => <strong>{row.target}</strong> },
            { key: "frequency", header: "Frecuencia", render: (row) => row.frequency },
            {
              key: "measurement",
              header: "Última medición",
              render: () => <MeasurementBadge status="not_measured" />,
            },
          ]}
          rows={objectives}
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
            {rules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </section>

        <section className="panel" aria-labelledby="evidencia-title">
          <div className="panel__header">
            <div>
              <h2 id="evidencia-title">Evidencia y responsables</h2>
              <p>Campos documentados en la matriz de objetivos.</p>
            </div>
            <ClipboardList size={20} aria-hidden="true" />
          </div>
          <ul className="stack-list">
            {objectives.map((objective) => (
              <li key={objective.id}>
                <strong>{objective.id} · {objective.indicator}</strong>
                <span>{objective.evidence}</span>
                <span className="text-muted">Responsable propuesto: {objective.owner}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

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
