import type { DataNature, MeasurementStatus, RiskLevel, TreatmentStatus } from "../types";

export const RISK_LEVEL_LABEL: Record<RiskLevel, string> = {
  acceptable: "Aceptable",
  tolerable: "Tolerable",
  high: "Alto / Crítico",
};

export const DATA_NATURE_LABEL: Record<DataNature, string> = {
  documented: "DOCUMENTADO",
  proposed: "PROPUESTO",
  simulated: "SIMULADO",
  demo: "DEMO",
  measured: "MEDIDO",
};

export const TREATMENT_STATUS_LABEL: Record<TreatmentStatus, string> = {
  in_progress: "En Proceso",
  implemented: "Implementado",
  pending: "Pendiente",
  not_specified: "No especificado",
};

export const MEASUREMENT_STATUS_LABEL: Record<MeasurementStatus, string> = {
  not_measured: "Sin medición",
  demo: "DEMO",
  measured: "MEDIDO",
};

export function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function formatDateTime(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  }).format(date);
}

export function formatDuration(minutes: number | null): string {
  if (minutes === null) return "Sin medición";
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest === 0 ? `${hours} h` : `${hours} h ${rest} min`;
}

export function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}
