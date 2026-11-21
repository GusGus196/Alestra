import { useMemo, useState } from "react";
import { CircleAlert, Info } from "lucide-react";
import {
  DataNatureBadge,
  RiskLevelBadge,
  TreatmentBadge,
} from "../components/common/Badge";
import { DetailDrawer, DetailField, DetailSection } from "../components/common/DetailDrawer";
import { PageIntro } from "../components/common/PageIntro";
import { RiskHeatmap } from "../components/charts/RiskHeatmap";
import { FilterBar } from "../components/tables/FilterBar";
import { DataTable } from "../components/tables/DataTable";
import { meta, risks } from "../lib/data";
import {
  inherentScore,
  riskLevelFromScore,
} from "../lib/calculations";
import {
  normalizeText,
  RISK_LEVEL_LABEL,
  TREATMENT_STATUS_LABEL,
} from "../lib/formatters";
import type { Risk } from "../types";

const levelOptions = [
  { value: "all", label: "Todos los niveles" },
  ...meta.riskScale.levels.map((level) => ({
    value: level.key,
    label: level.label,
  })),
];

const statusOptions = [
  { value: "all", label: "Todos los estados" },
  { value: "not_specified", label: "No especificado" },
  { value: "in_progress", label: "En Proceso" },
  { value: "implemented", label: "Implementado" },
  { value: "pending", label: "Pendiente" },
];

export function RisksPage() {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("all");
  const [status, setStatus] = useState("all");
  const [cell, setCell] = useState<string | null>(null);
  const [selected, setSelected] = useState<Risk | null>(null);

  const filtered = useMemo(() => {
    const term = normalizeText(search.trim());
    return risks.filter((risk) => {
      const matchesText =
        !term ||
        normalizeText(`${risk.id} ${risk.title} ${risk.asset} ${risk.owner}`).includes(term);
      const matchesLevel = level === "all" || risk.level === level;
      const matchesStatus = status === "all" || risk.treatmentStatus === status;
      const matchesCell =
        !cell || `${risk.probability}-${risk.impact}` === cell;
      return matchesText && matchesLevel && matchesStatus && matchesCell;
    });
  }, [search, level, status, cell]);

  const toggleCell = (probability: number, impact: number) => {
    const key = `${probability}-${impact}`;
    setCell((current) => (current === key ? null : key));
  };

  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="Matriz principal del proceso · ALE-CP-01"
        title="Gestión de riesgos"
        description="Siete riesgos documentados con valoración inherente P × I, mapa de calor 5 × 5 y medidas de tratamiento. El riesgo residual se muestra pendiente porque la fuente no contiene valores validados."
        actions={<DataNatureBadge nature="documented" />}
      />

      <div className="scale-strip" aria-label="Escala de riesgo documentada">
        <span><strong>P</strong> probabilidad 1–5</span>
        <span><strong>I</strong> impacto 1–5</span>
        <span><strong>Nivel</strong> P × I</span>
        <span className="scale-strip__item scale-strip__item--green">1–4 Aceptable</span>
        <span className="scale-strip__item scale-strip__item--amber">5–9 Tolerable</span>
        <span className="scale-strip__item scale-strip__item--red">10–25 Alto / Crítico</span>
      </div>

      <div className="two-column two-column--heatmap">
        <section className="panel" aria-labelledby="heatmap-title">
          <div className="panel__header">
            <div>
              <h2 id="heatmap-title">Mapa de calor 5 × 5</h2>
              <p>Haz clic en una celda para filtrar la tabla por P e I.</p>
            </div>
            <CircleAlert size={19} aria-hidden="true" />
          </div>
          <RiskHeatmap
            risks={risks}
            onCellClick={toggleCell}
            activeCell={cell}
          />
          <div className="heatmap-legend">
            <span><i className="legend-dot legend-dot--green" /> Aceptable</span>
            <span><i className="legend-dot legend-dot--amber" /> Tolerable</span>
            <span><i className="legend-dot legend-dot--red" /> Alto / Crítico</span>
            <span><i className="legend-dot legend-dot--count" /> Número de riesgos</span>
          </div>
        </section>

        <section className="panel" aria-labelledby="lectura-riesgos">
          <div className="panel__header">
            <div>
              <h2 id="lectura-riesgos">Cómo leer esta vista</h2>
              <p>Valoración inherente, no residual.</p>
            </div>
            <Info size={19} aria-hidden="true" />
          </div>
          <ul className="bullet-list">
            <li>La probabilidad y el impacto iniciales proceden de la matriz de riesgos del expediente.</li>
            <li>El nivel se calcula como P × I siguiendo la escala documentada: 1–4, 5–9 y 10–25.</li>
            <li>La matriz XLSX incluye columnas de valoración residual vacías; no se calculan ni inventan valores.</li>
            <li>El estado de tratamiento no está indicado en la fuente disponible: se muestra «No especificado».</li>
            <li>Se conserva la procedencia de cada riesgo; las variaciones de redacción entre documentos no se corrigen silenciosamente.</li>
          </ul>
          <div className="callout callout--muted">
            <strong>Riesgo residual:</strong> Pendiente de evaluación.
          </div>
        </section>
      </div>

      <section className="panel" aria-labelledby="tabla-riesgos">
        <div className="panel__header">
          <div>
            <h2 id="tabla-riesgos">Matriz de riesgos</h2>
            <p>Selecciona un renglón para ver escenario, activo, controles y tratamiento.</p>
          </div>
          <span className="panel__count">{filtered.length} de {risks.length} riesgos</span>
        </div>
        <FilterBar
          search={search}
          onSearch={setSearch}
          searchPlaceholder="Buscar por ID, riesgo, activo o propietario…"
          filters={[
            { label: "Nivel", value: level, onChange: setLevel, options: levelOptions },
            { label: "Estado de tratamiento", value: status, onChange: setStatus, options: statusOptions },
          ]}
          resultLabel={cell ? `Celda P/I: ${cell.replace("-", " × ")}` : undefined}
        />
        <DataTable<Risk>
          compact
          rowKey={(row) => row.id}
          rows={filtered}
          onRowClick={setSelected}
          columns={[
            { key: "id", header: "ID", render: (row) => <strong>{row.id}</strong> },
            { key: "title", header: "Riesgo", render: (row) => row.title },
            { key: "asset", header: "Activo / tipo", render: (row) => row.asset },
            { key: "p", header: "P", render: (row) => row.probability, className: "cell-center" },
            { key: "i", header: "I", render: (row) => row.impact, className: "cell-center" },
            {
              key: "score",
              header: "P×I",
              render: (row) => <strong>{inherentScore(row.probability, row.impact)}</strong>,
              className: "cell-center",
            },
            {
              key: "level",
              header: "Nivel",
              render: (row) => <RiskLevelBadge level={riskLevelFromScore(row.inherentScore)} />,
            },
            {
              key: "status",
              header: "Tratamiento",
              render: (row) => <TreatmentBadge status={row.treatmentStatus} />,
            },
            {
              key: "treatment",
              header: "Medida documentada",
              render: (row) => <span className="clamp-2">{row.treatment}</span>,
            },
          ]}
        />
      </section>

      <DetailDrawer
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        eyebrow={selected ? `Riesgo ${selected.id} · valoración inherente` : undefined}
        title={selected?.title ?? ""}
        footer={
          selected && (
            <span className="drawer__source">
              Fuente: {selected.source}
            </span>
          )
        }
      >
        {selected && (
          <>
            <div className="detail-badges">
              <RiskLevelBadge level={selected.level} />
              <TreatmentBadge status={selected.treatmentStatus} />
              <DataNatureBadge nature={selected.dataNature} />
            </div>

            <div className="score-strip">
              <div><span>Probabilidad</span><strong>{selected.probability}</strong></div>
              <div><span>Impacto</span><strong>{selected.impact}</strong></div>
              <div><span>P × I</span><strong>{selected.inherentScore}</strong></div>
              <div><span>Nivel</span><strong>{RISK_LEVEL_LABEL[selected.level]}</strong></div>
            </div>

            <DetailSection title="Escenario y activo afectado">
              <dl className="detail-grid">
                <DetailField label="Escenario (contexto)">{selected.scenario}</DetailField>
                <DetailField label="Activo / tipo">{selected.asset}</DetailField>
                <DetailField label="Vulnerabilidad documentada">{selected.vulnerability}</DetailField>
                <DetailField label="Atributos afectados">
                  {selected.affectedAttributes.length > 0
                    ? selected.affectedAttributes.join(", ")
                    : "No especificado"}
                </DetailField>
                <DetailField label="Partes interesadas">{selected.stakeholders}</DetailField>
                <DetailField label="Necesidad relacionada">{selected.needs}</DetailField>
              </dl>
            </DetailSection>

            <DetailSection title="Controles y tratamiento">
              <dl className="detail-grid">
                <DetailField label="Controles ISO referenciados">
                  <div className="chip-row">
                    {selected.isoControls.map((control) => (
                      <span className="chip" key={control}>{control}</span>
                    ))}
                  </div>
                </DetailField>
                <DetailField label="Controles existentes">
                  <ul className="compact-list">
                    {selected.existingControls.map((control) => (
                      <li key={control}>{control}</li>
                    ))}
                  </ul>
                </DetailField>
                <DetailField label="Medida de tratamiento">{selected.treatment}</DetailField>
                <DetailField label="Control adicional propuesto">{selected.additionalControls}</DetailField>
                <DetailField label="Plan de tratamiento">{selected.treatmentPlan}</DetailField>
                <DetailField label="Propietario documentado">{selected.owner}</DetailField>
                <DetailField label="Estado de tratamiento">
                  {TREATMENT_STATUS_LABEL[selected.treatmentStatus]}
                </DetailField>
                <DetailField label="Riesgo residual">
                  <span className="text-muted">Pendiente de evaluación</span>
                </DetailField>
              </dl>
            </DetailSection>
          </>
        )}
      </DetailDrawer>
    </div>
  );
}
