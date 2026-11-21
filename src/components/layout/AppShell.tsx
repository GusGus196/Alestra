import { useState, type ReactNode } from "react";
import { CalendarDays, Database, Menu, X } from "lucide-react";
import { routes, type RouteKey } from "../../app/routes";
import { meta } from "../../lib/data";
import { formatDate } from "../../lib/formatters";
import { AcademicBanner } from "../common/AcademicBanner";

export function AppShell({
  route,
  onNavigate,
  children,
}: {
  route: RouteKey;
  onNavigate: (route: RouteKey) => void;
  children: ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const current = routes.find((item) => item.key === route) ?? routes[0];

  const navigate = (key: RouteKey) => {
    onNavigate(key);
    setMenuOpen(false);
  };

  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? "is-open" : ""}`} aria-label="Navegación principal">
        <div className="sidebar__brand">
          <div className="brand-mark" aria-hidden="true">
            SG<span>I</span>
          </div>
          <div>
            <strong>SGI-Dash</strong>
            <span>Gestión Integral · Alestra</span>
          </div>
          <button
            type="button"
            className="icon-button sidebar__close"
            onClick={() => setMenuOpen(false)}
            aria-label="Cerrar menú"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar__nav">
          <p className="sidebar__caption">MÓDULOS</p>
          <ul>
            {routes.map((item) => {
              const Icon = item.icon;
              const active = item.key === route;
              return (
                <li key={item.key}>
                  <a
                    href={`#/${item.key}`}
                    className={`sidebar__link ${active ? "is-active" : ""}`}
                    aria-current={active ? "page" : undefined}
                    onClick={(event) => {
                      event.preventDefault();
                      navigate(item.key);
                    }}
                  >
                    <Icon size={18} aria-hidden="true" />
                    <span>{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="sidebar__footer">
          <div className="sidebar__process">
            <span className="sidebar__process-label">Proceso</span>
            <strong>ALE-CP-01</strong>
            <span>Internet Empresarial</span>
          </div>
          <p>Versión {meta.project.version} · propuesta académica</p>
        </div>
      </aside>

      {menuOpen && (
        <button
          type="button"
          className="mobile-backdrop"
          onClick={() => setMenuOpen(false)}
          aria-label="Cerrar menú"
        />
      )}

      <div className="app-main">
        <header className="topbar">
          <div className="topbar__left">
            <button
              type="button"
              className="icon-button topbar__menu"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
            >
              <Menu size={21} />
            </button>
            <div>
              <p className="topbar__eyebrow">{meta.project.organization}</p>
              <h1>{current.label}</h1>
            </div>
          </div>
          <div className="topbar__meta">
            <span className="topbar__chip" title="Fuente de datos local">
              <Database size={14} aria-hidden="true" /> JSON local
            </span>
            <span className="topbar__chip">
              <CalendarDays size={14} aria-hidden="true" />
              Datos: {formatDate(meta.project.datasetUpdatedAt)}
            </span>
          </div>
        </header>

        <main className="page-content" id="contenido-principal">
          <AcademicBanner />
          {children}
          <footer className="site-footer">
            <p>
              SGI-Dash · Dashboard académico basado en el expediente documental
              del proceso ALE-CP-01.
            </p>
            <p>
              {current.description} · Sin credenciales ni servicios externos.
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
