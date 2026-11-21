import { useMemo, useState } from "react";
import { Boxes, Info } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { DataNatureBadge } from "../components/common/Badge";
import { DetailDrawer, DetailField, DetailSection } from "../components/common/DetailDrawer";
import { PageIntro } from "../components/common/PageIntro";
import { ChartPanel } from "../components/charts/ChartPanel";
import { CHART_AXIS, CHART_BLUE, CHART_GRID } from "../components/charts/palette";
import { FilterBar } from "../components/tables/FilterBar";
import { DataTable } from "../components/tables/DataTable";
import { assets } from "../lib/data";
import { assetCriticality, countBy } from "../lib/calculations";
import { normalizeText } from "../lib/formatters";
import type { Asset, ClassificationGroup } from "../types";

const categories = [...new Set(assets.map((asset) => asset.category))].sort((a, b) =>
  a.localeCompare(b, "es"),
);

const classificationOptions: Array<{ value: string; label: string }> = [
  { value: "all", label: "Todas las clasificaciones" },
  { value: "Confidencial", label: "Confidencial" },
  { value: "Interna", label: "Interna" },
  { value: "Pública", label: "Pública" },
  { value: "No especificada", label: "No especificada" },
];

export function AssetsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [classification, setClassification] = useState("all");
  const [selected, setSelected] = useState<Asset | null>(null);

  const filtered = useMemo(() => {
    const term = normalizeText(search.trim());
    return assets.filter((asset) => {
      const matchesText =
        !term ||
        normalizeText(`${asset.id} ${asset.name} ${asset.environment} ${asset.owner}`).includes(term);
      const matchesCategory = category === "all" || asset.category === category;
      const matchesClassification =
        classification === "all" || asset.classificationGroup === classification;
      return matchesText && matchesCategory && matchesClassification;
    });
  }, [search, category, classification]);

  const groupCounts = countBy(assets, (asset) => asset.classificationGroup);
  const criticalityCounts = countBy(assets, (asset) => String(assetCriticality(asset)));
  const criticalityData = [1, 2, 3, 4].map((level) => ({
    level: `Nivel ${level}`,
    total: criticalityCounts[String(level)] ?? 0,
  }));

  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="ALE-SGI-ACT-01 · inventario v02"
        title="Inventario de activos"
        description="Activos de información y tecnología vinculados a ALE-CP-01. El total se calcula a partir de los registros del dataset, no de celdas resumen vacías."
        actions={<DataNatureBadge nature="documented" />}
      />

      <div className="mini-stat-grid">
        <div className="mini-stat">
          <span>Registros en el dataset</span>
          <strong>{assets.length}</strong>
        </div>
        {(["Confidencial", "Interna", "Pública"] as ClassificationGroup[]).map((group) => (
          <div className="mini-stat" key={group}>
            <span>{group}</span>
            <strong>{groupCounts[group] ?? 0}</strong>
          </div>
        ))}
        <div className="mini-stat">
          <span>Categorías</span>
          <strong>{categories.length}</strong>
        </div>
      </div>

      <div className="notice notice--muted">
        <Info size={18} aria-hidden="true" />
        <div>
          La fuente usa etiquetas CID de cuatro niveles (Pública/Baja,
          Interna/Moderada, Restringida/Alta, Confidencial/Crítica). Para los
          filtros se agrupan en tres clases: «Restringida/Alta» se muestra como
          <strong> Interna</strong> y «Confidencial/Crítica» como
          <strong> Confidencial</strong>. El detalle conserva la etiqueta original.
        </div>
      </div>

      <ChartPanel
        title="Criticidad global CID"
        description="Máximo entre confidencialidad, integridad y disponibilidad (escala 1–4)."
        legend="La criticidad CID no equivale al nivel de riesgo P × I. Fuente: hoja Criterios_y_Control e Inventario_Activos."
      >
        <div className="chart-box chart-box--short">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={criticalityData} margin={{ top: 8, right: 12, left: 0, bottom: 4 }}>
              <CartesianGrid stroke={CHART_GRID} vertical={false} />
              <XAxis dataKey="level" tick={{ fill: CHART_AXIS, fontSize: 11 }} />
              <YAxis allowDecimals={false} tick={{ fill: CHART_AXIS, fontSize: 11 }} />
              <Tooltip cursor={{ fill: "#eff6ff" }} />
              <Bar dataKey="total" name="Activos" fill={CHART_BLUE} radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartPanel>

      <section className="panel" aria-labelledby="tabla-activos">
        <div className="panel__header">
          <div>
            <h2 id="tabla-activos">Activos registrados</h2>
            <p>Busca por ID, nombre, entorno o propietario; selecciona un renglón para ver el detalle.</p>
          </div>
          <span className="panel__count">{filtered.length} de {assets.length} activos</span>
        </div>
        <FilterBar
          search={search}
          onSearch={setSearch}
          searchPlaceholder="Buscar activo, entorno o propietario…"
          filters={[
            {
              label: "Categoría",
              value: category,
              onChange: setCategory,
              options: [
                { value: "all", label: "Todas las categorías" },
                ...categories.map((value) => ({ value, label: value })),
              ],
            },
            {
              label: "Clasificación",
              value: classification,
              onChange: setClassification,
              options: classificationOptions,
            },
          ]}
        />
        <DataTable<Asset>
          compact
          rowKey={(row) => row.id}
          rows={filtered}
          onRowClick={setSelected}
          columns={[
            { key: "id", header: "ID", render: (row) => <strong>{row.id}</strong> },
            { key: "name", header: "Activo", render: (row) => row.name },
            { key: "category", header: "Categoría", render: (row) => row.category },
            { key: "environment", header: "Entorno", render: (row) => <span className="text-muted">{row.environment}</span> },
            {
              key: "classification",
              header: "Clasificación",
              render: (row) => (
                <span className={`classification-tag classification-tag--${row.classificationGroup[0].toLowerCase()}`}>
                  {row.classificationGroup}
                </span>
              ),
            },
            {
              key: "cid",
              header: "C / I / A",
              render: (row) => `${row.confidentiality} / ${row.integrity} / ${row.availability}`,
              className: "cell-center",
            },
            {
              key: "criticality",
              header: "Criticidad",
              render: (row) => <strong>{assetCriticality(row)}</strong>,
              className: "cell-center",
            },
          ]}
        />
      </section>

      <DetailDrawer
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        eyebrow={selected ? `${selected.id} · ${selected.category}` : undefined}
        title={selected?.name ?? ""}
        footer={selected && <span className="drawer__source">Fuente: {selected.source}</span>}
      >
        {selected && (
          <>
            <div className="detail-badges">
              <DataNatureBadge nature={selected.dataNature} />
              <span className="classification-tag classification-tag--p">
                {selected.classification}
              </span>
            </div>

            <div className="score-strip score-strip--cid">
              <div><span>Confidencialidad</span><strong>{selected.confidentiality}</strong></div>
              <div><span>Integridad</span><strong>{selected.integrity}</strong></div>
              <div><span>Disponibilidad</span><strong>{selected.availability}</strong></div>
              <div><span>Criticidad</span><strong>{assetCriticality(selected)}</strong></div>
            </div>

            <DetailSection title="Ficha del activo">
              <dl className="detail-grid">
                <DetailField label="Categoría">{selected.category}</DetailField>
                <DetailField label="Ubicación / entorno">{selected.environment}</DetailField>
                <DetailField label="Propietario">{selected.owner}</DetailField>
                <DetailField label="Clasificación original">{selected.classification}</DetailField>
                <DetailField label="Grupo para filtros">{selected.classificationGroup}</DetailField>
                <DetailField label="Criticidad global CID">
                  {assetCriticality(selected)} de 4 · máximo de C, I y A
                </DetailField>
              </dl>
            </DetailSection>

            <DetailSection title="Controles ISO asignados">
              <div className="chip-row">
                {selected.controls.map((control) => (
                  <span className="chip" key={control}>{control}</span>
                ))}
              </div>
            </DetailSection>

            <div className="callout callout--muted">
              <Boxes size={16} aria-hidden="true" />
              <span>
                Las valoraciones son estimaciones académicas; deben validarse con
                el propietario del activo y evidencia operativa antes de
                considerarse oficiales.
              </span>
            </div>
          </>
        )}
      </DetailDrawer>
    </div>
  );
}
