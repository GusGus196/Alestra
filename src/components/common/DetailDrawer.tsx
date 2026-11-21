import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

export function DetailDrawer({
  open,
  onClose,
  eyebrow,
  title,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  eyebrow?: string;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.classList.add("drawer-open");
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("drawer-open");
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="drawer-layer">
      <div className="drawer-backdrop" onClick={onClose} aria-hidden="true" />
      <aside
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        <header className="drawer__header">
          <div>
            {eyebrow && <p className="drawer__eyebrow">{eyebrow}</p>}
            <h2 id="drawer-title">{title}</h2>
          </div>
          <button
            type="button"
            className="icon-button"
            onClick={onClose}
            aria-label="Cerrar detalle"
          >
            <X size={20} />
          </button>
        </header>
        <div className="drawer__body">{children}</div>
        {footer && <footer className="drawer__footer">{footer}</footer>}
      </aside>
    </div>
  );
}

export function DetailSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="detail-section">
      <h3>{title}</h3>
      <div className="detail-section__content">{children}</div>
    </section>
  );
}

export function DetailField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="detail-field">
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
