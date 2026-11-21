import type { ReactNode } from "react";

export function PageIntro({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <header className="page-intro">
      <div>
        {eyebrow && <p className="page-intro__eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {actions && <div className="page-intro__actions">{actions}</div>}
    </header>
  );
}
