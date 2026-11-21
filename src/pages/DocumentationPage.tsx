import {
  BookOpen,
  CircleAlert,
  ExternalLink,
  FileText,
  Layers,
  Network,
  ShieldCheck,
} from "lucide-react";
import { DataNatureBadge } from "../components/common/Badge";
import { PageIntro } from "../components/common/PageIntro";
import { DataTable } from "../components/tables/DataTable";
import { meta, risks, assets, controls } from "../lib/data";
import type { ProjectMeta } from "../types";

type DocumentRow = ProjectMeta["documents"][number];

export function DocumentationPage() {
  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="Expediente documental · procedencia de datos"
        title="Documentación y proyecto"
        description="Fuentes del caso académico, prioridad de uso, políticas, contexto y asuntos pendientes. Los archivos internos no se publican en GitHub Pages: aquí solo se describe su función."
        actions={<DataNatureBadge nature="documented" />}
      />

      <section className="panel" aria-labelledby="acerca-title">
        <div className="panel__header">
          <div>
            <h2 id="acerca-title">Acerca de SGI-Dash</h2>
            <p>{meta.dataNote}</p>
          </div>
          <BookOpen size={20} aria-hidden="true" />
        </div>
        <div className="about-grid">
          <div>
            <span className="about-grid__label">Alcance</span>
            <p>{meta.project.scope}</p>
          </div>
          <div>
            <span className="about-grid__label">Proceso</span>
            <p><strong>{meta.project.process.id}</strong> · {meta.project.process.name}</p>
          </div>
          <div>
            <span className="about-grid__label">Datasets locales</span>
            <p>
              {risks.length} riesgos · {assets.length} activos · {controls.length} controles ·
              {" "}{meta.documents.length} documentos fuente
            </p>
          </div>
          <div>
            <span className="about-grid__label">Actualización</span>
            <p>{meta.project.datasetUpdatedAt} · versión {meta.project.version}</p>
          </div>
        </div>
      </section>

      <section className="panel" aria-labelledby="documentos-title">
        <div className="panel__header">
          <div>
            <h2 id="documentos-title">Documentos fuente</h2>
            <p>Inventario documental del expediente académico.</p>
          </div>
          <FileText size={20} aria-hidden="true" />
        </div>
        <DataTable<DocumentRow>
          compact
          rowKey={(row) => row.code}
          rows={meta.documents}
          columns={[
            { key: "code", header: "Código", render: (row) => <strong>{row.code}</strong> },
            { key: "name", header: "Documento", render: (row) => row.name },
            { key: "file", header: "Archivo", render: (row) => <span className="text-muted">{row.file}</span> },
            { key: "version", header: "Versión", render: (row) => row.version },
            { key: "status", header: "Estado documental", render: (row) => row.status },
            { key: "use", header: "Uso en el proyecto", render: (row) => row.use },
          ]}
        />
      </section>

      <div className="two-column">
        <section className="panel" aria-labelledby="procedencia-title">
          <div className="panel__header">
            <div>
              <h2 id="procedencia-title">Procedencia de la información</h2>
              <p>Etiquetas usadas en todas las vistas.</p>
            </div>
            <Layers size={20} aria-hidden="true" />
          </div>
          <ul className="bullet-list">
            {meta.dataPolicy.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
          <div className="callout callout--muted">
            Cuando dos fuentes difieren, se conserva la procedencia y se marca
            la discrepancia como pendiente de revisión documental.
          </div>
        </section>

        <section className="panel" aria-labelledby="prioridad-title">
          <div className="panel__header">
            <div>
              <h2 id="prioridad-title">Prioridad de fuentes</h2>
              <p>Se aplica por tema, sin combinar valores silenciosamente.</p>
            </div>
            <ExternalLink size={20} aria-hidden="true" />
          </div>
          <ul className="stack-list">
            {meta.sourcePriority.map((item) => (
              <li key={item.topic}>
                <strong>{item.topic}</strong>
                <span className="text-muted">{item.source}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="panel" aria-labelledby="pendientes-title">
        <div className="panel__header">
          <div>
            <h2 id="pendientes-title">Asuntos pendientes y discrepancias</h2>
            <p>No se resuelven inventando datos.</p>
          </div>
          <CircleAlert size={20} aria-hidden="true" />
        </div>
        <ol className="pending-list">
          {meta.pendingItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>

      <div className="two-column">
        <section className="panel" aria-labelledby="politicas-title">
          <div className="panel__header">
            <div>
              <h2 id="politicas-title">Políticas reflejadas</h2>
              <p>Resumen de lineamientos del Manual SGI; no prueba de operación.</p>
            </div>
            <ShieldCheck size={20} aria-hidden="true" />
          </div>
          {meta.policies.map((policy) => (
            <details className="disclosure" key={policy.name}>
              <summary>
                <strong>{policy.name}</strong>
                <span>{policy.controls.join(" · ")}</span>
              </summary>
              <p>{policy.objective}</p>
              <ul className="compact-list">
                {policy.lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </details>
          ))}
        </section>

        <section className="panel" aria-labelledby="phva-doc-title">
          <div className="panel__header">
            <div>
              <h2 id="phva-doc-title">Mapa PHVA</h2>
              <p>Relación entre fases y módulos del dashboard.</p>
            </div>
          </div>
          <ul className="stack-list">
            {meta.phva.map((phase) => (
              <li key={phase.phase}>
                <strong>{phase.phase} · {phase.label}</strong>
                <span>{phase.description}</span>
                <span className="text-muted">Módulos: {phase.modules.join(", ")}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="two-column">
        <section className="panel" aria-labelledby="contexto-title">
          <div className="panel__header">
            <div>
              <h2 id="contexto-title">Contexto organizacional</h2>
              <p>FODA y partes interesadas del caso académico.</p>
            </div>
          </div>
          {meta.foda.map((group) => (
            <details className="disclosure" key={group.category}>
              <summary>
                <strong>{group.category}</strong>
                <span>{group.type}</span>
              </summary>
              <ul className="compact-list">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </details>
          ))}
          <h3 className="subheading">Partes interesadas</h3>
          <ul className="stack-list">
            {meta.stakeholders.map((item) => (
              <li key={item.name}>
                <strong>{item.name}</strong>
                <span>{item.need}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="panel" aria-labelledby="integraciones-title">
          <div className="panel__header">
            <div>
              <h2 id="integraciones-title">Integraciones conceptuales</h2>
              <p>Fuentes contempladas, sin conexiones API en esta entrega.</p>
            </div>
            <Network size={20} aria-hidden="true" />
          </div>
          <ul className="bullet-list">
            {meta.integrations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="callout callout--blue">
            La capa <code>dataProvider</code> separa la lectura de datos de la
            interfaz para permitir una futura integración sin rehacer los
            componentes.
          </div>
        </section>
      </div>
    </div>
  );
}
