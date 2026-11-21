import type { ReactNode } from "react";
import {
  DATA_NATURE_LABEL,
  MEASUREMENT_STATUS_LABEL,
  RISK_LEVEL_LABEL,
  TREATMENT_STATUS_LABEL,
} from "../../lib/formatters";
import type {
  DataNature,
  MeasurementStatus,
  RiskLevel,
  TreatmentStatus,
} from "../../types";

type Tone = "neutral" | "blue" | "green" | "amber" | "red" | "violet";

export function Badge({
  children,
  tone = "neutral",
  icon,
  title,
}: {
  children: ReactNode;
  tone?: Tone;
  icon?: ReactNode;
  title?: string;
}) {
  return (
    <span className={`badge badge--${tone}`} title={title}>
      {icon}
      {children}
    </span>
  );
}

const riskTone: Record<RiskLevel, Tone> = {
  acceptable: "green",
  tolerable: "amber",
  high: "red",
};

export function RiskLevelBadge({ level }: { level: RiskLevel }) {
  return <Badge tone={riskTone[level]}>{RISK_LEVEL_LABEL[level]}</Badge>;
}

const natureTone: Record<DataNature, Tone> = {
  documented: "blue",
  proposed: "violet",
  simulated: "red",
  demo: "amber",
  measured: "green",
};

export function DataNatureBadge({ nature }: { nature: DataNature }) {
  return (
    <Badge tone={natureTone[nature]} title="Procedencia del dato">
      {DATA_NATURE_LABEL[nature]}
    </Badge>
  );
}

export function TreatmentBadge({ status }: { status: TreatmentStatus }) {
  const tone: Tone =
    status === "implemented"
      ? "green"
      : status === "in_progress"
        ? "amber"
        : status === "pending"
          ? "violet"
          : "neutral";
  return <Badge tone={tone}>{TREATMENT_STATUS_LABEL[status]}</Badge>;
}

export function MeasurementBadge({ status }: { status: MeasurementStatus }) {
  return (
    <Badge tone={status === "not_measured" ? "neutral" : "blue"}>
      {MEASUREMENT_STATUS_LABEL[status]}
    </Badge>
  );
}
