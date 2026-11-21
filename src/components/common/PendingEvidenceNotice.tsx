import { CircleAlert } from "lucide-react";

export function PendingEvidenceNotice({
  title = "Evidencia pendiente",
  description,
}: {
  title?: string;
  description: string;
}) {
  return (
    <div className="notice notice--academic pending-evidence">
      <CircleAlert size={18} aria-hidden="true" />
      <div>
        <strong>{title}:</strong> {description}
      </div>
    </div>
  );
}
