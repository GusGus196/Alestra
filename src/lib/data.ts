import aiUseCasesRaw from "../data/ai-use-cases.json";
import assetsRaw from "../data/assets.json";
import auditsRaw from "../data/audits.json";
import controlsRaw from "../data/controls.json";
import correctiveActionsRaw from "../data/corrective-actions.json";
import documentsRaw from "../data/documents.json";
import findingsRaw from "../data/findings.json";
import formsRaw from "../data/forms.json";
import incidentsRaw from "../data/incidents.json";
import improvementActionsRaw from "../data/improvement-actions.json";
import kpisRaw from "../data/kpis.json";
import metaRaw from "../data/project-meta.json";
import objectivesRaw from "../data/objectives.json";
import proceduresRaw from "../data/procedures.json";
import processesRaw from "../data/processes.json";
import raciRaw from "../data/raci.json";
import reportsRaw from "../data/reports.json";
import requirementsRaw from "../data/requirements.json";
import risksRaw from "../data/risks.json";
import stakeholdersRaw from "../data/stakeholders.json";
import traceabilityRaw from "../data/traceability.json";
import type {
  AiUseCaseRecord,
  Asset,
  AuditRecord,
  CorrectiveActionRecord,
  DocumentRecord,
  FindingRecord,
  FormRecord,
  ImprovementActionRecord,
  Incident,
  KpiRecord,
  Objective,
  ProcedureRecord,
  ProcessRecord,
  ProjectMeta,
  RaciRecord,
  ReportRecord,
  RequirementRecord,
  Risk,
  SoaControl,
  StakeholderRecord,
  TraceabilityRecord,
} from "../types";

/**
 * Capa de lectura de datos. Hoy consume archivos JSON locales incluidos en el
 * repositorio. Una futura integración con NMS, tickets o SIEM puede sustituir
 * esta capa sin cambiar los componentes de presentación.
 */
export const dataProvider = {
  aiUseCases: aiUseCasesRaw as AiUseCaseRecord[],
  assets: assetsRaw as Asset[],
  audits: auditsRaw as AuditRecord[],
  controls: controlsRaw as SoaControl[],
  correctiveActions: correctiveActionsRaw as CorrectiveActionRecord[],
  documents: documentsRaw as DocumentRecord[],
  findings: findingsRaw as FindingRecord[],
  forms: formsRaw as FormRecord[],
  incidents: incidentsRaw as Incident[],
  improvementActions: improvementActionsRaw as ImprovementActionRecord[],
  kpis: kpisRaw as KpiRecord[],
  meta: metaRaw as ProjectMeta,
  objectives: objectivesRaw as Objective[],
  procedures: proceduresRaw as ProcedureRecord[],
  processes: processesRaw as ProcessRecord[],
  raci: raciRaw as RaciRecord[],
  reports: reportsRaw as ReportRecord[],
  requirements: requirementsRaw as RequirementRecord[],
  risks: risksRaw as Risk[],
  stakeholders: stakeholdersRaw as StakeholderRecord[],
  traceability: traceabilityRaw as TraceabilityRecord[],
};

export const {
  aiUseCases,
  assets,
  audits,
  controls,
  correctiveActions,
  documents,
  findings,
  forms,
  incidents,
  improvementActions,
  kpis,
  meta,
  objectives,
  procedures,
  processes,
  raci,
  reports,
  requirements,
  risks,
  stakeholders,
  traceability,
} = dataProvider;
