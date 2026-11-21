import type { ReactNode } from "react";
import { Inbox } from "lucide-react";

export function EmptyState({
  title = "Sin datos",
  description,
  icon,
}: {
  title?: string;
  description?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="empty-state" role="status">
      <span className="empty-state__icon" aria-hidden="true">
        {icon ?? <Inbox size={22} />}
      </span>
      <strong>{title}</strong>
      {description && <p>{description}</p>}
    </div>
  );
}
