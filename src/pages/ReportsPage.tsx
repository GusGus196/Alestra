import { FileCheck2, FileWarning, Info } from "lucide-react";
import { Badge } from "../components/common/Badge";
import { PageIntro } from "../components/common/PageIntro";
import { PendingEvidenceNotice } from "../components/common/PendingEvidenceNotice";
import { SourceLabel } from "../components/common/SourceLabel";
import { StatusBadge } from "../components/common/StatusBadge";
import { reports } from "../lib/data";

const REPORT_STATUS = "Reporte pendiente de elaboración";

export function ReportsPage() {
  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="Expediente · reportes de tercera parcial"
        title="Reportes"
        description="Portadas y contenidos planificados para los reportes ejecutivo y técnico. Ninguno está elaborado: no se muestran enlaces PDF falsos ni datos corporativos inventados."
        actions={<Badge tone="amber">{REPORT_STATUS}</Badge>}
      />

      <div className="notice notice--academic">
        <Info size={18} aria-hidden="true" />
        <div>
          <strong>Entrega pendiente.</strong> Los reportes deben elaborarse en PDF
          como entregables independientes del dashboard. La portada debe usar
          «Pendiente de confirmar» para domicilio, teléfono, correo, sitio web e
          integrantes hasta que el equipo proporcione datos autorizados.
        </div>
      </div>

      <div className="report-grid">
        {reports.map((report) => (
          <article className="report-card" key={report.id}>
            <div className="report-card__top">
              <span className="report-card__code">{report.id}</span>
              <StatusBadge status={report.evidenceStatus} />
            </div>
            <h3>{report.name}</h3>
            <p className="report-card__audience"><strong>Destinatarios:</strong> {report.audience}</p>
            <p>{report.purpose}</p>

            <div className="report-cover" aria-label={`Portada planificada de ${report.name}`}>
              <div className="report-cover__header">
                <span>SGI-Dash · Tercera parcial</span>
                <strong>Alestra</strong>
                <span>{report.name}</span>
              </div>
              <dl className="report-cover__fields">
                {report.cover.map((item) => (
                  <div key={`${report.id}-${item.field}`}>
                    <dt>{item.field}</dt>
                    <dd className={item.value === "Pendiente de confirmar" ? "text-muted" : ""}>
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <span className="report-cover__stamp">{REPORT_STATUS}</span>
            </div>

            <section className="report-card__outline">
              <h4>Contenido planificado</h4>
              <ol className="pending-list">
                {report.outline.map((item) => <li key={`${report.id}-outline-${item}`}>{item}</li>)}
              </ol>
            </section>

            <PendingEvidenceNotice
              title={REPORT_STATUS}
              description={`No existe un archivo publicado para ${report.name}. El vínculo de descarga se habilitaría solo después de elaborar y revisar el PDF.`}
            />
            <div className="report-card__footer">
              <Badge tone="neutral"><FileWarning size={14} /> Sin archivo adjunto</Badge>
              <SourceLabel source={report} compact />
            </div>
          </article>
        ))}
      </div>

      <section className="panel" aria-labelledby="checklist-reportes">
        <div className="panel__header">
          <div>
            <h2 id="checklist-reportes">Antes de publicar los PDF</h2>
            <p>Condiciones que deben cumplirse para cambiar el estado de estos reportes.</p>
          </div>
          <FileCheck2 size={19} aria-hidden="true" />
        </div>
        <ul className="bullet-list">
          <li>Confirmar domicilio, teléfono, correo, sitio web y fecha con fuentes autorizadas.</li>
          <li>Revisar ortografía y consistencia de los integrantes según el Plan de Proyecto SGI.</li>
          <li>Diferenciar funciones demostrativas de propuestas y de evidencia documentada.</li>
          <li>Exportar cada reporte a PDF y ubicar el archivo en <code>public/documents/</code>.</li>
          <li>Actualizar el catálogo documental con la ruta publicada y el estado revisado.</li>
        </ul>
      </section>
    </div>
  );
}
