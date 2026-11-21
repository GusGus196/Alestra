import {
  Building2,
  ClipboardCheck,
  ClipboardList,
  FileCheck2,
  FileStack,
  FileText,
  Gauge,
  GitBranch,
  LayoutDashboard,
  ListChecks,
  Route as RouteIcon,
  ScrollText,
  ShieldAlert,
  ShieldCheck,
  Siren,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type RouteKey =
  | "resumen"
  | "organizacion"
  | "requisitos"
  | "riesgos"
  | "activos"
  | "controles"
  | "procedimientos"
  | "formatos"
  | "incidentes"
  | "indicadores"
  | "auditoria"
  | "mejora"
  | "ia"
  | "documentacion"
  | "trazabilidad"
  | "reportes";

export type RouteDefinition = {
  key: RouteKey;
  label: string;
  shortLabel: string;
  description: string;
  icon: LucideIcon;
};

export type NavigationGroup = {
  label: string;
  routes: RouteDefinition[];
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
    key: "organizacion",
    label: "Organización y procesos",
    shortLabel: "Organización",
    description: "Contexto, partes interesadas, gobernanza, mapa de procesos y RACI.",
    icon: Building2,
  },
  {
    key: "requisitos",
    label: "Requisitos y aplicabilidad",
    shortLabel: "Requisitos",
    description: "Matriz general de normas, marcos y aplicabilidad.",
    icon: ListChecks,
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
    key: "procedimientos",
    label: "Procedimientos",
    shortLabel: "Procedimientos",
    description: "Catálogo y fichas de los tres procedimientos del portal.",
    icon: ClipboardCheck,
  },
  {
    key: "formatos",
    label: "Formatos y registros",
    shortLabel: "Formatos",
    description: "Formatos utilizables, vista previa, instrucciones y exportación.",
    icon: FileStack,
  },
  {
    key: "incidentes",
    label: "Incidentes",
    shortLabel: "Incidentes",
    description: "Registro de ejemplo y flujo de atención propuesto (módulo conservado).",
    icon: Siren,
  },
  {
    key: "indicadores",
    label: "Indicadores",
    shortLabel: "Indicadores",
    description: "Ocho indicadores: cuatro base y cuatro propuestos.",
    icon: Gauge,
  },
  {
    key: "auditoria",
    label: "Auditoría y hallazgos",
    shortLabel: "Auditoría",
    description: "Plan, checklist, hallazgos y acciones correctivas.",
    icon: ClipboardList,
  },
  {
    key: "mejora",
    label: "Mejora continua",
    shortLabel: "Mejora",
    description: "Ciclo PHVA y plan de acciones de mejora.",
    icon: GitBranch,
  },
  {
    key: "ia",
    label: "IA responsable",
    shortLabel: "IA",
    description: "Tres propuestas de uso con decisión humana y controles.",
    icon: Sparkles,
  },
  {
    key: "documentacion",
    label: "Documentación",
    shortLabel: "Documentación",
    description: "Catálogo documental, fuentes, procedencia y pendientes.",
    icon: FileText,
  },
  {
    key: "trazabilidad",
    label: "Trazabilidad",
    shortLabel: "Trazabilidad",
    description: "Relaciones entre requisitos, riesgos, controles, registros y mejora.",
    icon: RouteIcon,
  },
  {
    key: "reportes",
    label: "Reportes",
    shortLabel: "Reportes",
    description: "Reportes ejecutivo y técnico: estado y portadas pendientes.",
    icon: FileCheck2,
  },
];

export const navigationGroups: NavigationGroup[] = [
  {
    label: "Sistema",
    routes: routes.filter((route) => ["resumen", "organizacion"].includes(route.key)),
  },
  {
    label: "Planificar",
    routes: routes.filter((route) =>
      ["requisitos", "riesgos", "activos", "controles"].includes(route.key),
    ),
  },
  {
    label: "Operar",
    routes: routes.filter((route) =>
      ["procedimientos", "formatos", "incidentes"].includes(route.key),
    ),
  },
  {
    label: "Evaluar",
    routes: routes.filter((route) => ["indicadores", "auditoria"].includes(route.key)),
  },
  {
    label: "Mejorar",
    routes: routes.filter((route) => ["mejora", "ia"].includes(route.key)),
  },
  {
    label: "Expediente",
    routes: routes.filter((route) =>
      ["documentacion", "trazabilidad", "reportes"].includes(route.key),
    ),
  },
];

export const DEFAULT_ROUTE: RouteKey = "resumen";

export function isRouteKey(value: string): value is RouteKey {
  return routes.some((route) => route.key === value);
}
