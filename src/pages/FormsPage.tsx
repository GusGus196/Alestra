import { useEffect, useState } from "react";
import { Download, FileJson, FileSpreadsheet, Info, Printer, RotateCcw } from "lucide-react";
import { AcademicSimulationBanner } from "../components/common/AcademicSimulationBanner";
import { Badge } from "../components/common/Badge";
import { PageIntro } from "../components/common/PageIntro";
import { SourceLabel } from "../components/common/SourceLabel";
import { StatusBadge } from "../components/common/StatusBadge";
import { forms } from "../lib/data";
import type { FormRecord } from "../types";

const escapeCsv = (value: string) => `"${value.replace(/"/g, '""')}"`;

function downloadBlob(filename: string, blob: Blob) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export function FormsPage() {
  const [selectedId, setSelectedId] = useState(forms[0].id);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const selected: FormRecord = forms.find((form) => form.id === selectedId) ?? forms[0];

  useEffect(() => {
    setAnswers({});
  }, [selectedId]);

  const simulate = Boolean(selected.simulationNotice);

  const exportCsv = () => {
    const headers = ["campo", "etiqueta", "valor"];
    const lines = [
      headers.map(escapeCsv).join(","),
      ...selected.fields.map((field) =>
        [field.key, field.label, answers[field.key] ?? ""].map(escapeCsv).join(","),
      ),
    ];
    const blob = new Blob([`\uFEFF${lines.join("\r\n")}`], {
      type: "text/csv;charset=utf-8;",
    });
    downloadBlob(`${selected.code}_respuestas.csv`, blob);
  };

  const exportJson = () => {
    const payload = {
      formato: selected.code,
      nombre: selected.name,
      version: selected.version,
      estado: selected.recordStatus,
      generadoEn: new Date().toISOString(),
      aviso: selected.simulationNotice ?? null,
      valores: answers,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json;charset=utf-8;",
    });
    downloadBlob(`${selected.code}_respuestas.json`, blob);
  };

  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="Operar · formatos y registros"
        title="Formatos y registros"
        description="Seis formatos consultables y utilizables en el navegador. Incluyen campos, instrucciones, vista previa, ejemplo lleno cuando existe y exportación local CSV/JSON sin servicios externos."
        actions={<Badge tone="blue">{forms.length} formatos</Badge>}
      />

      <div className="notice notice--muted">
        <Info size={18} aria-hidden="true" />
        <div>
          Los archivos originales no se publican. El registro ALE-F-01 se muestra
          siempre con la etiqueta exacta «SIMULACIÓN ACADÉMICA — NO ES UN
          INCIDENTE REAL». Los demás formatos son borradores propuestos, no
          registros operativos de Alestra.
        </div>
      </div>

      <section className="panel" aria-labelledby="catalogo-formatos">
        <div className="panel__header">
          <div>
            <h2 id="catalogo-formatos">Catálogo de formatos</h2>
            <p>Selecciona un formato para abrir su vista previa.</p>
          </div>
          <span className="panel__count">{forms.length} disponibles</span>
        </div>
        <div className="format-tabs" role="tablist" aria-label="Formatos disponibles">
          {forms.map((form) => (
            <button
              key={form.id}
              type="button"
              role="tab"
              aria-selected={form.id === selected.id}
              className={`format-tab ${form.id === selected.id ? "is-active" : ""}`}
              onClick={() => setSelectedId(form.id)}
            >
              <strong>{form.code}</strong>
              <span>{form.name}</span>
              <StatusBadge status={form.evidenceStatus} />
            </button>
          ))}
        </div>
      </section>

      {simulate && (
        <AcademicSimulationBanner
          notice={selected.simulationNotice}
          description="El folio, el tiempo de restauración y el resultado mostrados corresponden a un escenario ficticio incluido en el Manual SGI. No son datos operativos ni un incidente real."
        />
      )}

      <div className="form-layout">
        <section className="panel" aria-labelledby="vista-previa-formato">
          <div className="panel__header">
            <div>
              <p className="form-preview__code">{selected.code} · v{selected.version}</p>
              <h2 id="vista-previa-formato">{selected.name}</h2>
              <p>{selected.purpose}</p>
            </div>
            <Badge tone={selected.recordStatus === "Simulado" ? "red" : "amber"}>
              {selected.recordStatus}
            </Badge>
          </div>

          <div className="form-preview">
            <div className="form-preview__meta">
              <div><span>Responsable</span><strong>{selected.owner}</strong></div>
              <div><span>Clasificación</span><strong>{selected.classification}</strong></div>
              <div><span>Procedimiento</span><strong>{selected.relatedProcedure}</strong></div>
              <div><span>Indicador</span><strong>{selected.relatedKpi || "Sin vincular"}</strong></div>
            </div>

            <div className="form-preview__fields">
              {selected.fields.map((field) => (
                <label className="form-field" key={`${selected.id}-${field.key}`}>
                  <span className="form-field__label">
                    {field.label} {field.required && <em aria-label="obligatorio">*</em>}
                  </span>
                  {field.type === "textarea" ? (
                    <textarea
                      rows={3}
                      value={answers[field.key] ?? ""}
                      placeholder={field.instruction}
                      onChange={(event) => setAnswers((current) => ({ ...current, [field.key]: event.target.value }))}
                    />
                  ) : field.type === "select" ? (
                    <select
                      value={answers[field.key] ?? ""}
                      onChange={(event) => setAnswers((current) => ({ ...current, [field.key]: event.target.value }))}
                    >
                      <option value="">Seleccionar…</option>
                      {(field.options ?? []).map((option) => (
                        <option value={option} key={`${field.key}-${option}`}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type === "date" ? "date" : "text"}
                      value={answers[field.key] ?? ""}
                      placeholder={field.instruction}
                      onChange={(event) => setAnswers((current) => ({ ...current, [field.key]: event.target.value }))}
                    />
                  )}
                  <span className="form-field__hint">{field.instruction}</span>
                </label>
              ))}
            </div>

            <div className="form-preview__actions">
              <button type="button" className="button button--primary" onClick={exportCsv}>
                <FileSpreadsheet size={16} aria-hidden="true" /> Exportar CSV
              </button>
              <button type="button" className="button button--ghost" onClick={exportJson}>
                <FileJson size={16} aria-hidden="true" /> Exportar JSON
              </button>
              <button type="button" className="button button--ghost" onClick={() => window.print()}>
                <Printer size={16} aria-hidden="true" /> Imprimir
              </button>
              <button
                type="button"
                className="button button--ghost"
                onClick={() => setAnswers({})}
                disabled={Object.keys(answers).length === 0}
              >
                <RotateCcw size={16} aria-hidden="true" /> Limpiar
              </button>
            </div>
            <p className="form-preview__local">
              <Download size={14} aria-hidden="true" />
              La exportación se genera en el navegador con Blob; no se envían datos a ningún servidor.
            </p>
          </div>
        </section>

        <div className="form-side">
          <section className="panel" aria-labelledby="instrucciones-formato">
            <div className="panel__header">
              <div>
                <h2 id="instrucciones-formato">Instrucciones</h2>
                <p>Reglas de llenado y resguardo.</p>
              </div>
            </div>
            <ol className="pending-list">
              {selected.instructions.map((instruction) => (
                <li key={`${selected.id}-instruction-${instruction}`}>{instruction}</li>
              ))}
            </ol>
            <div className="callout callout--muted">
              Aprobación: {selected.approval}. Control de cambios: {selected.changeControl}.
            </div>
          </section>

          <section className="panel" aria-labelledby="ejemplo-formato">
            <div className="panel__header">
              <div>
                <h2 id="ejemplo-formato">Ejemplo lleno</h2>
                <p>
                  {selected.example
                    ? "Ejemplo incluido en la fuente documental."
                    : "Este formato no tiene un ejemplo lleno documentado."}
                </p>
              </div>
            </div>
            {selected.example ? (
              <>
                {simulate && (
                  <div className="form-example__label">
                    <strong>SIMULACIÓN ACADÉMICA — NO ES UN INCIDENTE REAL</strong>
                  </div>
                )}
                <dl className="form-example">
                  {selected.fields.map((field) => (
                    <div key={`${selected.id}-example-${field.key}`}>
                      <dt>{field.label}</dt>
                      <dd>{selected.example?.[field.key] || "Sin dato en el ejemplo"}</dd>
                    </div>
                  ))}
                </dl>
                <button
                  type="button"
                  className="button button--ghost"
                  onClick={() => setAnswers({ ...(selected.example ?? {}) })}
                >
                  Cargar ejemplo en el formulario
                </button>
              </>
            ) : (
              <div className="empty-state" role="status">
                <strong>Pendiente de ejemplo lleno</strong>
                <p>El borrador no incluye un registro de ejemplo. No se inventa información operativa.</p>
              </div>
            )}
          </section>

          <section className="panel" aria-labelledby="procedencia-formato">
            <div className="panel__header">
              <div>
                <h2 id="procedencia-formato">Procedencia</h2>
                <p>Relaciones y estado documental del formato.</p>
              </div>
            </div>
            <div className="detail-badges">
              <StatusBadge status={selected.evidenceStatus} />
              <Badge tone="neutral">{selected.relatedControl || "Sin vincular"}</Badge>
            </div>
            <SourceLabel source={selected} />
          </section>
        </div>
      </div>
    </div>
  );
}
