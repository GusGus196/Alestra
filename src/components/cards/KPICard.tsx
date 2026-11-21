import type { ReactNode } from "react";
import { Badge } from "../common/Badge";

export function KPICard({
  label,
  value,
  unit,
  description,
  badge,
  tone = "blue",
  icon,
  footer,
}: {
  label: string;
  value: ReactNode;
  unit?: string;
  description: string;
  badge?: ReactNode;
  tone?: "blue" | "green" | "amber" | "red" | "neutral";
  icon?: ReactNode;
  footer?: string;
}) {
  return (
    <article className={`kpi-card kpi-card--${tone}`}>
      <div className="kpi-card__top">
        <span className="kpi-card__label">{label}</span>
        {icon && (
          <span className="kpi-card__icon" aria-hidden="true">
            {icon}
          </span>
        )}
      </div>
      <div className="kpi-card__value">
        {value}
        {unit && <span className="kpi-card__unit">{unit}</span>}
      </div>
      {badge && <div className="kpi-card__badge">{badge}</div>}
      <p className="kpi-card__description">{description}</p>
      {footer && <p className="kpi-card__footer">{footer}</p>}
    </article>
  );
}

export { Badge };
