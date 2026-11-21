export type DataNature =
  | "documented"
  | "proposed"
  | "simulated"
  | "demo"
  | "measured";

export type RiskLevel = "acceptable" | "tolerable" | "high";

export type TreatmentStatus =
  | "in_progress"
  | "implemented"
  | "pending"
  | "not_specified";

export type MeasurementStatus = "not_measured" | "demo" | "measured";

export type ClassificationGroup = "Pública" | "Interna" | "Confidencial" | "No especificada";

export type Risk = {
  id: string;
  title: string;
  scenario: string;
  asset: string;
  vulnerability: string;
  affectedAttributes: string[];
  probability: number;
  impact: number;
  inherentScore: number;
  level: RiskLevel;
  classification: string;
  isoControls: string[];
  existingControls: string[];
  additionalControls: string;
  treatment: string;
  treatmentPlan: string;
  owner: string;
  stakeholders: string;
  needs: string;
  treatmentStatus: TreatmentStatus;
  residualProbability: number | null;
  residualImpact: number | null;
  residualScore: number | null;
  dataNature: DataNature;
  source: string;
};

export type Objective = {
  id: string;
  title: string;
  indicator: string;
  formula: string;
  target: string;
  frequency: string;
  owner: string;
  evidence: string;
  relatedRisk: string;
  notes: string;
  latestValue: number | null;
  unit: string | null;
  measurementStatus: MeasurementStatus;
  dataNature: DataNature;
  source: string;
};

export type Asset = {
  id: string;
  category: string;
  name: string;
  environment: string;
  owner: string;
  classification: string;
  classificationGroup: ClassificationGroup;
  confidentiality: number;
  integrity: number;
  availability: number;
  controls: string[];
  dataNature: DataNature;
  source: string;
};

export type SoaControl = {
  id: string;
  name: string;
  applies: boolean;
  justification: string;
  isoNote: string;
  theme: string;
  relatedRisks: string[];
  status: TreatmentStatus;
  dataNature: DataNature;
  source: string;
};

export type Incident = {
  id: string;
  date: string;
  process: string;
  description: string;
  severity: string;
  riskId: string;
  status: string;
  mttrMinutes: number | null;
  action: string;
  outcome: string;
  reportedUptime: string;
  dataNature: DataNature;
  simulationNotice: string;
  source: string;
};

export type ProcessInfo = {
  id: string;
  name: string;
  type: string;
  objective: string;
  start: string;
  end: string;
  inputs: string[];
  outputs: string[];
  relatedAreas: string[];
};

export type ProjectMeta = {
  project: {
    name: string;
    fullName: string;
    organization: string;
    version: string;
    datasetUpdatedAt: string;
    academicNotice: string;
    scope: string;
    process: ProcessInfo;
  };
  dataPolicy: string[];
  riskScale: {
    probability: string;
    impact: string;
    levels: Array<{ range: string; label: string; key: RiskLevel }>;
  };
  sourcePriority: Array<{ topic: string; source: string }>;
  documents: Array<{
    code: string;
    name: string;
    file: string;
    version: string;
    status: string;
    use: string;
  }>;
  stakeholders: Array<{ name: string; need: string }>;
  foda: Array<{ category: string; type: string; items: string[] }>;
  policies: Array<{
    name: string;
    controls: string[];
    objective: string;
    lines: string[];
  }>;
  phva: Array<{
    phase: string;
    label: string;
    description: string;
    modules: string[];
  }>;
  procedure: {
    steps: string[];
    roles: Array<{ role: string; responsibility: string }>;
    source: string;
  };
  integrations: string[];
  pendingItems: string[];
  dataNote: string;
};
