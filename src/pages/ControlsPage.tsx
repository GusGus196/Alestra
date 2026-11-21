import { useMemo, useState } from "react";
import { Info, ShieldCheck } from "lucide-react";
import { DataNatureBadge, TreatmentBadge } from "../components/common/Badge";
import { DetailDrawer, DetailField, DetailSection } from "../components/common/DetailDrawer";
import { PageIntro } from "../components/common/PageIntro";
import { SourceLabel } from "../components/common/SourceLabel";
import { StatusBadge } from "../components/common/StatusBadge";
import { FilterBar } from "../components/tables/FilterBar";
import { DataTable } from "../components/tables/DataTable";
import { controls } from "../lib/data";
import { normalizeText } from "../lib/formatters";
import type { SoaControl } from "../types";

const themes = [...new Set(controls.map((control) => control.theme))].sort((a, b) =>
  a.localeCompare(b, "es"),
);

export function ControlsPage() {
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState("all");
  const [applies, setApplies] = useState("all");
  const [selected, setSelected] = useState<SoaControl | null>(null);

  const filtered = useMemo(() => {
    const term = normalizeText(search.trim());
    return controls.filter((control) => {
      const matchesText =
        !term ||
        normalizeText(`${control.id} ${control.name} ${control.justification}`).includes(term);
      const matchesTheme = theme === "all" || control.theme === theme;
      const matchesApplies =
        applies === "all" || (applies === "yes") === control.applies;
      return matchesText && matchesTheme && matchesApplies;
    });
  }, [search, theme, applies]);

  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="Declaración de Aplicabilidad · ISO/IEC 27001:2022"
        title="Controles ISO / SoA"
        description="Selección de controles incluida en el documento fuente, con justificación, tema y relación con riesgos cuando está documentada."
        actions={<DataNatureBadge nature="documented" />}
      />

      <div className="notice notice--academic">
        <ShieldCheck size={18} aria-hidden="true" />
        <div>
          <strong>{controls.length} controles seleccionados.</strong> El documento
          no incluye los 93 controles del Anexo A y no indica que estén
          implementados. Por eso no se muestra un porcentaje global de
          cumplimiento.
        </div>
      </div>

      <div className="mini-stat-grid">
        <div className="mini-stat"><span>Controles en la SoA</span><strong>{controls.length}</strong></div>
        <div className="mini-stat"><span>Aplicables según el documento</span><strong>{controls.filter((c) => c.applies).length}</strong></div>
        <div className="mini-stat"><span>Con estado verificable</span><strong>0</strong></div>
        <div className="mini-stat"><span>Temas representados</span><strong>{themes.length}</strong></div>
      </div>

      <section className="panel" aria-labelledby="tabla-controles">
        <div className="panel__header">
          <div>
            <h2 id="tabla-controles">Matriz de aplicabilidad</h2>
            <p>Selecciona un control para consultar su justificación y nota normativa.</p>
          </div>
          <span className="panel__count">{filtered.length} de {controls.length} controles</span>
        </div>
        <FilterBar
          search={search}
          onSearch={setSearch}
          searchPlaceholder="Buscar por control, nombre o justificación…"
          filters={[
            {
              label: "Tema",
              value: theme,
              onChange: setTheme,
              options: [
                { value: "all", label: "Todos los temas" },
                ...themes.map((value) => ({ value, label: value })),
              ],
            },
            {
              label: "Aplicabilidad",
              value: applies,
              onChange: setApplies,
              options: [
                { value: "all", label: "Todas" },
                { value: "yes", label: "Aplica (SÍ)" },
                { value: "no", label: "No aplica" },
              ],
            },
          ]}
        />
        <DataTable<SoaControl>
          compact
          rowKey={(row) => row.id}
          rows={filtered}
          onRowClick={setSelected}
          columns={[
            { key: "id", header: "Control", render: (row) => <strong>{row.id}</strong> },
            { key: "name", header: "Nombre", render: (row) => row.name },
            { key: "theme", header: "Tema", render: (row) => row.theme },
            {
              key: "applies",
              header: "Aplica",
              render: (row) => (
                <span className={`badge ${row.applies ? "badge--green" : "badge--neutral"}`}>
                  {row.applies ? "SÍ" : "NO"}
                </span>
              ),
            },
            {
              key: "risks",
              header: "Riesgos relacionados",
              render: (row) =>
                row.relatedRisks.length > 0 ? row.relatedRisks.join(", ") : "No documentado",
            },
            {
              key: "status",
              header: "Estado",
              render: (row) => <TreatmentBadge status={row.status} />,
            },
            {
              key: "justification",
              header: "Justificación",
              render: (row) => <span className="clamp-2">{row.justification}</span>,
            },
          ]}
        />
      </section>

      <section className="panel" aria-labelledby="nota-soa">
        <div className="panel__header">
          <div>
            <h2 id="nota-soa">Notas de uso</h2>
            <p>Consideraciones para interpretar la SoA del expediente.</p>
          </div>
          <Info size={19} aria-hidden="true" />
        </div>
        <ul className="bullet-list">
          <li>El documento aclara la equivalencia entre la numeración ISO/IEC 27001:2013 y la de 2022.</li>
          <li>La relación con riesgos se toma únicamente de los controles referenciados en la matriz de riesgos; si no aparece, se indica «No documentado».</li>
          <li>El estado de implantación no está indicado en la fuente: se muestra «No especificado» o «Pendiente de validación».</li>
          <li>Los controles 8.15, 8.16 y 8.17 aparecen en políticas y matrices, pero no en la tabla SoA disponible: se mantienen como referencias no confirmadas.</li>
          <li>Los controles relacionados con políticas operativas se resumen en la sección de Documentación.</li>
        </ul>
      </section>

      <DetailDrawer
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        eyebrow={selected ? `Control ISO/IEC 27001:2022 ${selected.id}` : undefined}
        title={selected?.name ?? ""}
        footer={selected && <span className="drawer__source">Fuente: {selected.source}</span>}
      >
        {selected && (
          <>
            <div className="detail-badges">
              <span className={`badge ${selected.applies ? "badge--green" : "badge--neutral"}`}>
                {selected.applies ? "APLICA (SÍ)" : "NO APLICA"}
              </span>
              <TreatmentBadge status={selected.status} />
              <DataNatureBadge nature={selected.dataNature} />
              <StatusBadge status={selected.evidenceStatus} />
            </div>

            <DetailSection title="Justificación y nota normativa">
              <dl className="detail-grid">
                <DetailField label="Tema">{selected.theme}</DetailField>
                <DetailField label="Justificación técnica">{selected.justification}</DetailField>
                <DetailField label="Nota ISO 27002">{selected.isoNote}</DetailField>
                <DetailField label="Riesgos relacionados">
                  {selected.relatedRisks.length > 0
                    ? selected.relatedRisks.join(", ")
                    : "No documentado en la matriz de riesgos"}
                </DetailField>
                <DetailField label="Estado de implantación">
                  No especificado · pendiente de validación
                </DetailField>
              </dl>
            </DetailSection>

            <DetailSection title="Procedencia">
              <SourceLabel source={selected} />
            </DetailSection>
          </>
        )}
      </DetailDrawer>
    </div>
  );
}
