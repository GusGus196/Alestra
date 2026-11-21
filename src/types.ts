export type DataNature =
  | "documented"
  | "proposed"
  | "simulated"
  | "demo"
  | "measured";

export type EvidenceStatus =
  | "documentado"
  | "propuesto"
  | "pendiente_validacion"
  | "ejemplo"
  | "simulacion_academica"
  | "medido"
  | "sin_evidencia";

export type SourceStatus =
  | "disponible"
  | "pendiente_incorporar"
  | "equivalente_documentado"
  | "no_aplica";

/** Metadatos de procedencia exigidos para todos los datasets del portal. */
export type SourceMeta = {
  sourceDocument: string;
  sourceStatus: SourceStatus;
  academicLabel?: string;
  evidenceStatus?: EvidenceStatus;
  discrepancyNote?: string;
};

export type RiskLevel = "acceptable" | "tolerable" | "high";

export type TreatmentStatus =
  | "in_progress"
  | "implemented"
  | "pending"
  | "not_specified";

export type MeasurementStatus = "not_measured" | "demo" | "measured";

export type ClassificationGroup = "Pública" | "Interna" | "Confidencial" | "No especificada";

export type Risk = SourceMeta & {
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

export type Objective = SourceMeta & {
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

export type Asset = SourceMeta & {
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

export type SoaControl = SourceMeta & {
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

export type Incident = SourceMeta & {
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

export type RiskRecord = Risk;
export type AssetRecord = Asset;
export type ControlRecord = SoaControl;

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

export type DocumentRecord = SourceMeta & {
  id: string;
  code: string;
  name: string;
  category: string;
  version: string;
  date: string;
  owner: string;
  status: string;
  classification: string;
  description: string;
  relatedProcesses: string[];
  relatedRequirements: string[];
  relatedRisks: string[];
  relatedControls: string[];
  file: string | null;
  sourceLocation: string;
  observations: string;
};

export type ProcessRecord = SourceMeta & {
  id: string;
  name: string;
  type: "Estratégico" | "Misional" | "Apoyo" | "Transversal";
  objective: string;
  owner: string;
  inputs: string[];
  activities: string[];
  outputs: string[];
  relatedAreas: string[];
  relatedRisks: string[];
  relatedKpis: string[];
  gaps: string[];
};

export type StakeholderRecord = SourceMeta & {
  id: string;
  name: string;
  need: string;
  expectation: string;
  requirement: string;
  relatedProcess: string;
  owner: string;
  evidence: string;
  gaps: string[];
};

export type RaciLetter = "R" | "A" | "C" | "I";

export type RaciRecord = SourceMeta & {
  id: string;
  activity: string;
  process: string;
  roles: Array<{ role: string; letter: RaciLetter }>;
  notes: string;
};

export type RequirementRecord = SourceMeta & {
  id: string;
  framework: string;
  clause: string;
  description: string;
  type: "Norma de sistema de gestión" | "Norma técnica" | "Marco de buenas prácticas";
  applicability: "Aplica" | "Aplica parcialmente" | "No aplica" | "Pendiente de validar";
  justification: string;
  relatedProcess: string;
  relatedRisk: string;
  relatedControl: string;
  owner: string;
  expectedEvidence: string;
  reviewStatus: "Revisado" | "Pendiente de revisión" | "Pendiente de análisis";
};

export type ProcedureStep = {
  order: number;
  name: string;
  detail: string;
  decision?: string;
};

export type ProcedureRecord = SourceMeta & {
  id: string;
  code: string;
  version: string;
  date: string;
  title: string;
  status: string;
  objective: string;
  scope: string;
  references: string[];
  definitions: Array<{ term: string; meaning: string }>;
  roles: Array<{ role: string; responsibility: string }>;
  inputs: string[];
  steps: ProcedureStep[];
  decisions: string[];
  controls: string[];
  records: string[];
  kpi: string;
  relatedRisks: string[];
  attachments: string[];
  approval: string;
  changeControl: string;
};

export type FormField = {
  key: string;
  label: string;
  type: "text" | "date" | "number" | "textarea" | "select";
  required: boolean;
  instruction: string;
  options?: string[];
};

export type FormRecord = SourceMeta & {
  id: string;
  code: string;
  name: string;
  version: string;
  date: string;
  owner: string;
  purpose: string;
  instructions: string[];
  classification: string;
  recordStatus: "Borrador" | "Ejemplo" | "Simulado" | "Registro verificado";
  fields: FormField[];
  example: Record<string, string> | null;
  simulationNotice?: string;
  relatedProcedure: string;
  relatedRisk: string;
  relatedControl: string;
  relatedKpi: string;
  approval: string;
  changeControl: string;
};

export type KpiRecord = SourceMeta & {
  id: string;
  code: string;
  name: string;
  definition: string;
  formula: string;
  numerator: string;
  denominator: string;
  target: string;
  unit: string;
  dataSource: string;
  frequency: string;
  owner: string;
  expectedEvidence: string;
  period: string;
  result: number | null;
  trend: string | null;
  dataNature: DataNature;
  statusLabel: string;
};

export type AuditRecord = SourceMeta & {
  id: string;
  type: "Auditoría interna del SGSI de Alestra" | "Auditoría de Alestra a La Finca del Barrio";
  name: string;
  status: string;
  objective: string;
  scope: string;
  criteria: string[];
  schedule: string;
  auditors: string;
  auditees: string;
  method: string;
  samples: string;
  checklist: string[];
  evidenceObserved: string[];
  results: string;
  notes: string;
};

export type FindingRecord = SourceMeta & {
  id: string;
  auditId: string;
  requirement: string;
  objectiveEvidence: string;
  description: string;
  classification: string;
  cause: string;
  owner: string;
  dueDate: string;
  status: string;
  relatedControl: string;
};

export type CorrectiveActionRecord = SourceMeta & {
  id: string;
  findingId: string;
  containment: string;
  rootCause: string;
  action: string;
  owner: string;
  dueDate: string;
  implementationEvidence: string;
  effectivenessVerification: string;
  status: string;
};

export type ImprovementActionRecord = SourceMeta & {
  id: string;
  origin: string;
  description: string;
  priority: "Alta" | "Media" | "Baja" | "Pendiente";
  owner: string;
  dueDate: string;
  relatedKpi: string;
  evidence: string;
  status: string;
};

export type AiUseCaseRecord = SourceMeta & {
  id: string;
  name: string;
  purpose: string;
  inputs: string[];
  assistedActivity: string;
  expectedOutput: string;
  humanDecisionRole: string;
  requiredCompetence: string;
  risks: string[];
  controls: string[];
  benefits: string[];
  limits: string[];
  dataHandling: string;
  externalIntegration: false;
};

export type TraceabilityRecord = SourceMeta & {
  id: string;
  requirement: string;
  process: string;
  asset: string;
  risk: string;
  control: string;
  procedure: string;
  form: string;
  kpi: string;
  auditFinding: string;
  improvementAction: string;
  gaps: string[];
};

export type ReportRecord = SourceMeta & {
  id: string;
  name: string;
  audience: string;
  purpose: string;
  outline: string[];
  cover: Array<{ field: string; value: string; status: string }>;
  file: string | null;
  status: string;
};
