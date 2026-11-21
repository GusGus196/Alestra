import {
  FileText,
  Gauge,
  LayoutDashboard,
  ScrollText,
  ShieldAlert,
  ShieldCheck,
  Siren,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type RouteKey =
  | "resumen"
  | "indicadores"
  | "riesgos"
  | "activos"
  | "controles"
  | "incidentes"
  | "documentacion";

export type RouteDefinition = {
  key: RouteKey;
  label: string;
  shortLabel: string;
  description: string;
  icon: LucideIcon;
};

export const routes: RouteDefinition[] = [
  {
    key: "resumen",
    label: "Resumen",
    shortLabel: "Resumen",
    description: "Vista ejecutiva del estado propuesto del SGI.",
    icon: LayoutDashboard,
  },
  {
    key: "indicadores",
    label: "Indicadores",
    shortLabel: "Indicadores",
    description: "Objetivos, fórmulas y metas propuestas de ALE-CP-01.",
    icon: Gauge,
  },
  {
    key: "riesgos",
    label: "Riesgos",
    shortLabel: "Riesgos",
    description: "Matriz inherente, mapa de calor y tratamientos.",
    icon: ShieldAlert,
  },
  {
    key: "activos",
    label: "Activos",
    shortLabel: "Activos",
    description: "Inventario, clasificación y valoración CID.",
    icon: ScrollText,
  },
  {
    key: "controles",
    label: "Controles ISO / SoA",
    shortLabel: "Controles",
    description: "Controles seleccionados en la Declaración de Aplicabilidad.",
    icon: ShieldCheck,
  },
  {
    key: "incidentes",
    label: "Incidentes",
    shortLabel: "Incidentes",
    description: "Registros de ejemplo y flujo de atención propuesto.",
    icon: Siren,
  },
  {
    key: "documentacion",
    label: "Documentación",
    shortLabel: "Documentación",
    description: "Fuentes, procedencia, políticas y asuntos pendientes.",
    icon: FileText,
  },
];

export const DEFAULT_ROUTE: RouteKey = "resumen";

export function isRouteKey(value: string): value is RouteKey {
  return routes.some((route) => route.key === value);
}
