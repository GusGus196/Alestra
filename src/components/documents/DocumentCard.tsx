import { FileWarning, FolderOpen } from "lucide-react";
import { Badge } from "../common/Badge";
import { StatusBadge } from "../common/StatusBadge";
import type { DocumentRecord } from "../../types";

export function DocumentCard({
  document,
  onOpen,
}: {
  document: DocumentRecord;
  onOpen: (document: DocumentRecord) => void;
}) {
  return (
    <article className="document-card">
      <div className="document-card__top">
        <span className="document-card__code">{document.code}</span>
        <StatusBadge status={document.evidenceStatus} />
      </div>
      <h3>{document.name}</h3>
      <p className="document-card__description">{document.description}</p>
      <dl className="document-card__meta">
        <div>
          <dt>Categoría</dt>
          <dd>{document.category}</dd>
        </div>
        <div>
          <dt>Versión</dt>
          <dd>{document.version}</dd>
        </div>
        <div>
          <dt>Responsable</dt>
          <dd>{document.owner}</dd>
        </div>
        <div>
          <dt>Clasificación</dt>
          <dd>{document.classification}</dd>
        </div>
      </dl>
      {document.file ? (
        <Badge tone="green">Archivo disponible</Badge>
      ) : (
        <span className="document-card__pending">
          <FileWarning size={15} aria-hidden="true" />
          Archivo pendiente de incorporar
        </span>
      )}
      <button type="button" className="button button--ghost document-card__action" onClick={() => onOpen(document)}>
        <FolderOpen size={15} aria-hidden="true" />
        Ver ficha documental
      </button>
    </article>
  );
}
