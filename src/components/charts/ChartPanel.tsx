import type { ReactNode } from "react";

export function ChartPanel({
  title,
  description,
  legend,
  action,
  children,
  className = "",
}: {
  title: string;
  description?: string;
  legend?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`panel chart-panel ${className}`}>
      <header className="panel__header">
        <div>
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        {action}
      </header>
      <div className="chart-panel__body">{children}</div>
      {legend && <footer className="chart-panel__legend">{legend}</footer>}
    </section>
  );
}
