import { useMemo, useState } from "react";
import { Info, ListChecks, Scale } from "lucide-react";
import { Badge } from "../components/common/Badge";
import { DetailDrawer, DetailField, DetailSection } from "../components/common/DetailDrawer";
import { PageIntro } from "../components/common/PageIntro";
import { SourceLabel } from "../components/common/SourceLabel";
import { StatusBadge } from "../components/common/StatusBadge";
import { DataTable } from "../components/tables/DataTable";
import { FilterBar } from "../components/tables/FilterBar";
import { requirements } from "../lib/data";
import { normalizeText } from "../lib/formatters";
import type { RequirementRecord } from "../types";

type Tone = "neutral" | "blue" | "green" | "amber" | "red" | "violet";

const applicabilityTone: Record<RequirementRecord["applicability"], Tone> = {
  Aplica: "green",
  "Aplica parcialmente": "amber",
  "No aplica": "neutral",
  "Pendiente de validar": "violet",
};

const reviewTone: Record<RequirementRecord["reviewStatus"], Tone> = {
  Revisado: "green",
  "Pendiente de revisión": "amber",
  "Pendiente de análisis": "violet",
};

export function RequirementsPage() {
  const [search, setSearch] = useState("");
  const [framework, setFramework] = useState("all");
  const [applicability, setApplicability] = useState("all");
  const [selected, setSelected] = useState<RequirementRecord | null>(null);

  const frameworks = [...new Set(requirements.map((row) => row.framework))].sort((a, b) =>
    a.localeCompare(b, "es"),
  );

  const filtered = useMemo(() => {
    const term = normalizeText(search.trim());
    return requirements.filter((row) => {
      const matchesText =
        !term ||
        normalizeText(`${row.id} ${row.framework} ${row.clause} ${row.description}`).includes(term);
      const matchesFramework = framework === "all" || row.framework === framework;
      const matchesApplicability = applicability === "all" || row.applicability === applicability;
      return matchesText && matchesFramework && matchesApplicability;
    });
  }, [search, framework, applicability]);

  const norms = requirements.filter((row) => row.type !== "Marco de buenas prácticas").length;
  const frameworksCount = requirements.length - norms;
  const pendingAnalysis = requirements.filter(
    (row) => row.reviewStatus === "Pendiente de análisis",
  ).length;

  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="Planificar · matriz general de requisitos"
        title="Requisitos y aplicabilidad"
        description="Consultable por norma o marco, con descripción en palabras propias, tipo, aplicabilidad, justificación, evidencia esperada y estado de revisión. No se inventan cláusulas no analizadas."
        actions={<StatusBadge status="pendiente_validacion" />}
      />

      <div className="notice notice--academic">
        <Info size={18} aria-hidden="true" />
        <div>
          <strong>Distinción importante:</strong> ISO/IEC 20000, familia ISO/IEC
          27000, ISO 22301 e ISO/IEC 27001:2022 son normas o marcos de sistemas
          de gestión. <strong>COBIT e ITIL son marcos de buenas prácticas</strong>,
          no normas ISO. Las filas «Pendiente de análisis» permanecen abiertas.
        </div>
      </div>

      <div className="mini-stat-grid">
        <div className="mini-stat"><span>Requisitos registrados</span><strong>{requirements.length}</strong></div>
        <div className="mini-stat"><span>Normas de sistema / técnicas</span><strong>{norms}</strong></div>
        <div className="mini-stat"><span>Marcos de buenas prácticas</span><strong>{frameworksCount}</strong></div>
        <div className="mini-stat"><span>Pendientes de análisis</span><strong>{pendingAnalysis}</strong></div>
      </div>

      <section className="panel" aria-labelledby="requisitos-title">
        <div className="panel__header">
          <div>
            <h2 id="requisitos-title">Matriz de requisitos</h2>
            <p>Selecciona un renglón para ver justificación, responsable y procedencia.</p>
          </div>
          <ListChecks size={19} aria-hidden="true" />
        </div>
        <FilterBar
          search={search}
          onSearch={setSearch}
          searchPlaceholder="Buscar por ID, norma, cláusula o descripción…"
          filters={[
            {
              label: "Marco o norma",
              value: framework,
              onChange: setFramework,
              options: [
                { value: "all", label: "Todos los marcos" },
                ...frameworks.map((value) => ({ value, label: value })),
              ],
            },
            {
              label: "Aplicabilidad",
              value: applicability,
              onChange: setApplicability,
              options: [
                { value: "all", label: "Todas" },
                ...(["Aplica", "Aplica parcialmente", "No aplica", "Pendiente de validar"] as const).map(
                  (value) => ({ value, label: value }),
                ),
              ],
            },
          ]}
          resultLabel={`${filtered.length} de ${requirements.length} requisitos`}
        />
        <DataTable<RequirementRecord>
          compact
          rowKey={(row) => row.id}
          rows={filtered}
          onRowClick={setSelected}
          columns={[
            { key: "id", header: "ID", render: (row) => <strong>{row.id}</strong> },
            { key: "framework", header: "Norma / marco", render: (row) => row.framework },
            { key: "clause", header: "Cláusula / práctica", render: (row) => <span className="clamp-2">{row.clause}</span> },
            {
              key: "type",
              header: "Tipo",
              render: (row) => (
                <Badge tone={row.type === "Marco de buenas prácticas" ? "violet" : "blue"}>
                  {row.type === "Marco de buenas prácticas" ? "BUENAS PRÁCTICAS" : "NORMA"}
                </Badge>
              ),
            },
            {
              key: "applicability",
              header: "Aplicabilidad",
              render: (row) => <Badge tone={applicabilityTone[row.applicability]}>{row.applicability}</Badge>,
            },
            { key: "process", header: "Proceso", render: (row) => row.relatedProcess },
            {
              key: "review",
              header: "Revisión",
              render: (row) => <Badge tone={reviewTone[row.reviewStatus]}>{row.reviewStatus}</Badge>,
            },
          ]}
        />
      </section>

      <section className="panel" aria-labelledby="criterios-title">
        <div className="panel__header">
          <div>
            <h2 id="criterios-title">Criterios de aplicabilidad</h2>
            <p>Cómo se determina el estado de cada fila sin resolver pendientes inventando datos.</p>
          </div>
          <Scale size={19} aria-hidden="true" />
        </div>
        <ul className="bullet-list">
          <li><strong>Aplica:</strong> existe evidencia documental en el expediente y una decisión de inclusión registrada.</li>
          <li><strong>Aplica parcialmente:</strong> hay elementos documentados, pero falta evidencia o cobertura completa.</li>
          <li><strong>No aplica:</strong> se requiere exclusión justificada por alcance; no se usa sin justificación documental.</li>
          <li><strong>Pendiente de validar:</strong> la guía lo identifica como referencia, pero no hay análisis de cláusulas o decisión formal.</li>
          <li>La SoA de ISO/IEC 27001 no sustituye a esta matriz general.</li>
        </ul>
      </section>

      <DetailDrawer
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        eyebrow={selected ? `${selected.id} · ${selected.framework}` : undefined}
        title={selected?.clause ?? ""}
      >
        {selected && (
          <>
            <div className="detail-badges">
              <Badge tone={applicabilityTone[selected.applicability]}>{selected.applicability}</Badge>
              <Badge tone={reviewTone[selected.reviewStatus]}>{selected.reviewStatus}</Badge>
              <StatusBadge status={selected.evidenceStatus} />
            </div>

            <DetailSection title="Análisis">
              <dl className="detail-grid">
                <DetailField label="Descripción">{selected.description}</DetailField>
                <DetailField label="Tipo">{selected.type}</DetailField>
                <DetailField label="Justificación">{selected.justification}</DetailField>
                <DetailField label="Proceso relacionado">{selected.relatedProcess}</DetailField>
                <DetailField label="Riesgo relacionado">{selected.relatedRisk}</DetailField>
                <DetailField label="Control relacionado">{selected.relatedControl}</DetailField>
                <DetailField label="Responsable">{selected.owner}</DetailField>
                <DetailField label="Evidencia esperada">{selected.expectedEvidence}</DetailField>
              </dl>
            </DetailSection>

            {selected.discrepancyNote && (
              <div className="callout callout--muted">{selected.discrepancyNote}</div>
            )}
            <SourceLabel source={selected} />
          </>
        )}
      </DetailDrawer>
    </div>
  );
}
