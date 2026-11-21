import { DetailDrawer, DetailField, DetailSection } from "../common/DetailDrawer";
import { Badge } from "../common/Badge";
import { SourceLabel } from "../common/SourceLabel";
import { StatusBadge } from "../common/StatusBadge";
import type { DocumentRecord } from "../../types";

const EMPTY = "Sin vincular";

export function DocumentViewer({
  document,
  onClose,
}: {
  document: DocumentRecord | null;
  onClose: () => void;
}) {
  if (!document) return null;
  const relations = [
    { label: "Procesos", values: document.relatedProcesses },
    { label: "Requisitos", values: document.relatedRequirements },
    { label: "Riesgos", values: document.relatedRisks },
    { label: "Controles", values: document.relatedControls },
  ];

  return (
    <DetailDrawer
      open={Boolean(document)}
      onClose={onClose}
      eyebrow={`Ficha documental · ${document.code}`}
      title={document.name}
      footer={<span className="drawer__source">Archivo publicado: {document.file ?? "Archivo pendiente de incorporar"}</span>}
    >
      <div className="detail-badges">
        <StatusBadge status={document.evidenceStatus} />
        <Badge tone="neutral">{document.status}</Badge>
        <Badge tone="amber">{document.classification}</Badge>
      </div>

      <DetailSection title="Metadatos">
        <dl className="detail-grid">
          <DetailField label="Categoría">{document.category}</DetailField>
          <DetailField label="Versión">{document.version}</DetailField>
          <DetailField label="Fecha">{document.date}</DetailField>
          <DetailField label="Responsable/propietario">{document.owner}</DetailField>
          <DetailField label="Descripción">{document.description}</DetailField>
          <DetailField label="Observaciones">{document.observations}</DetailField>
        </dl>
      </DetailSection>

      <DetailSection title="Relaciones">
        <dl className="detail-grid">
          {relations.map((relation) => (
            <DetailField key={relation.label} label={relation.label}>
              {relation.values.length > 0 ? relation.values.join(", ") : EMPTY}
            </DetailField>
          ))}
        </dl>
      </DetailSection>

      <DetailSection title="Procedencia">
        <SourceLabel source={document} />
      </DetailSection>

      <div className="callout callout--muted">
        No se muestra un enlace de descarga porque el archivo no ha sido
        publicado en <code>public/documents/</code>. No se crean enlaces rotos.
      </div>
    </DetailDrawer>
  );
}
