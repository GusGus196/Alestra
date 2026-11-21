import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const dataDir = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "data");
const load = (name) => JSON.parse(readFileSync(join(dataDir, name), "utf8"));

const dataFiles = {
  risks: "risks.json",
  assets: "assets.json",
  objectives: "objectives.json",
  controls: "controls.json",
  incidents: "incidents.json",
  documents: "documents.json",
  processes: "processes.json",
  stakeholders: "stakeholders.json",
  raci: "raci.json",
  requirements: "requirements.json",
  procedures: "procedures.json",
  forms: "forms.json",
  kpis: "kpis.json",
  audits: "audits.json",
  findings: "findings.json",
  correctiveActions: "corrective-actions.json",
  improvementActions: "improvement-actions.json",
  aiUseCases: "ai-use-cases.json",
  traceability: "traceability.json",
  reports: "reports.json",
};

const data = Object.fromEntries(
  Object.entries(dataFiles).map(([key, file]) => [key, load(file)]),
);

const {
  risks,
  assets,
  objectives,
  controls,
  incidents,
  documents,
  processes,
  stakeholders,
  raci,
  requirements,
  procedures,
  forms,
  kpis,
  audits,
  findings,
  correctiveActions,
  improvementActions,
  aiUseCases,
  traceability,
  reports,
} = data;

const meta = load("project-meta.json");

const sourceStatuses = new Set([
  "disponible",
  "pendiente_incorporar",
  "equivalente_documentado",
  "no_aplica",
]);

const evidenceStatuses = new Set([
  "documentado",
  "propuesto",
  "pendiente_validacion",
  "ejemplo",
  "simulacion_academica",
  "medido",
  "sin_evidencia",
]);

const SIMULATION_LABEL = "SIMULACIÓN ACADÉMICA — NO ES UN INCIDENTE REAL";
const DRAFT_LABEL = "Borrador académico — pendiente de validación";
const REPORT_STATUS = "Reporte pendiente de elaboración";

function assertUniqueIds(items, label) {
  const ids = items.map((item) => item.id);
  assert.equal(new Set(ids).size, ids.length, `IDs duplicados en ${label}`);
  for (const id of ids) {
    assert.ok(typeof id === "string" && id.trim().length > 0, `ID inválido en ${label}`);
  }
}

function assertSourceMeta(items, label) {
  for (const item of items) {
    assert.equal(
      typeof item.sourceDocument,
      "string",
      `sourceDocument inválido en ${label} (${item.id})`,
    );
    assert.ok(
      item.sourceDocument.trim().length > 0,
      `sourceDocument vacío en ${label} (${item.id})`,
    );
    assert.ok(
      sourceStatuses.has(item.sourceStatus),
      `sourceStatus inválido en ${label} (${item.id})`,
    );
    assert.ok(
      evidenceStatuses.has(item.evidenceStatus),
      `evidenceStatus inválido en ${label} (${item.id})`,
    );
  }
}

for (const [label, items] of Object.entries(data)) {
  assert.ok(Array.isArray(items), `${label} debe ser un arreglo`);
  assertUniqueIds(items, label);
  assertSourceMeta(items, label);
}

// ---------------------------------------------------------------- legacy core
const levelFor = (score) => (score <= 4 ? "acceptable" : score <= 9 ? "tolerable" : "high");

assert.equal(risks.length, 7, "Deben existir 7 riesgos R1–R7");
assert.deepEqual(
  risks.map((risk) => risk.id),
  ["R1", "R2", "R3", "R4", "R5", "R6", "R7"],
);
for (const risk of risks) {
  assert.equal(risk.inherentScore, risk.probability * risk.impact, `P×I incorrecto en ${risk.id}`);
  assert.equal(risk.level, levelFor(risk.inherentScore), `Nivel incorrecto en ${risk.id}`);
  assert.equal(risk.residualScore, null, `El riesgo residual no debe inventarse en ${risk.id}`);
  assert.equal(risk.treatmentStatus, "not_specified", `Estado no documentado en ${risk.id}`);
  assert.ok(risk.source && risk.dataNature === "documented", `Procedencia faltante en ${risk.id}`);
  assert.ok(risk.discrepancyNote, `Discrepancia de fuentes no documentada en ${risk.id}`);
}

assert.equal(objectives.length, 4, "Deben existir 4 objetivos OBJ-01 a OBJ-04");
for (const objective of objectives) {
  assert.equal(objective.latestValue, null, `No debe haber medición inventada en ${objective.id}`);
  assert.equal(objective.measurementStatus, "not_measured");
  assert.equal(objective.dataNature, "proposed");
}

assert.ok(assets.length > 0, "El inventario no puede estar vacío");
for (const asset of assets) {
  assert.ok(["Pública", "Interna", "Confidencial", "No especificada"].includes(asset.classificationGroup));
  for (const value of [asset.confidentiality, asset.integrity, asset.availability]) {
    assert.ok(Number.isInteger(value) && value >= 1 && value <= 4, `CID inválido en ${asset.id}`);
  }
  assert.ok(Array.isArray(asset.controls), `Controles inválidos en ${asset.id}`);
}

assert.equal(controls.length, 8, "La SoA incluye 8 controles seleccionados");
for (const control of controls) {
  assert.equal(control.status, "not_specified", `Sin estado verificable en ${control.id}`);
  assert.equal(control.applies, true);
}

assert.equal(incidents.length, 1, "Solo el registro simulado del Manual SGI");
assert.equal(incidents[0].dataNature, "simulated");
assert.equal(incidents[0].simulationNotice, SIMULATION_LABEL);
assert.equal(incidents[0].mttrMinutes, 45);

assert.ok(meta.documents.length >= 10);
assert.ok(meta.pendingItems.length >= 6);
assert.equal(meta.project.process.id, "ALE-CP-01");

// -------------------------------------------------------- organizational data
assert.ok(processes.length >= 5, "Debe existir el mapa de procesos");
assert.ok(stakeholders.length >= 5, "Deben existir las partes interesadas");
assert.ok(raci.length >= 10, "Debe existir la matriz RACI propuesta");

for (const process of processes) {
  for (const field of ["inputs", "activities", "outputs", "relatedRisks", "relatedKpis", "gaps"]) {
    assert.ok(Array.isArray(process[field]), `${field} inválido en ${process.id}`);
  }
}

for (const row of raci) {
  const accountable = row.roles.filter((role) => role.letter === "A");
  assert.equal(accountable.length, 1, `Debe existir una sola A en ${row.id}`);
  for (const role of row.roles) {
    assert.ok(["R", "A", "C", "I"].includes(role.letter), `Letra RACI inválida en ${row.id}`);
  }
}

// ---------------------------------------------------------------- requirements
assert.ok(requirements.length >= 13, "La matriz de requisitos debe estar poblada");
for (const requirement of requirements) {
  assert.ok(
    ["Aplica", "Aplica parcialmente", "No aplica", "Pendiente de validar"].includes(
      requirement.applicability,
    ),
    `Aplicabilidad inválida en ${requirement.id}`,
  );
  assert.ok(
    ["Revisado", "Pendiente de revisión", "Pendiente de análisis"].includes(
      requirement.reviewStatus,
    ),
    `Estado de revisión inválido en ${requirement.id}`,
  );
  assert.ok(requirement.justification, `Justificación faltante en ${requirement.id}`);
}

// ------------------------------------------------------------------ documents
assert.ok(documents.length >= 10, "El catálogo documental debe estar poblado");
assert.equal(new Set(documents.map((doc) => doc.code)).size, documents.length);
for (const document of documents) {
  assert.equal(document.file, null, `No se deben publicar enlaces rotos en ${document.id}`);
  for (const field of [
    "relatedProcesses",
    "relatedRequirements",
    "relatedRisks",
    "relatedControls",
  ]) {
    assert.ok(Array.isArray(document[field]), `${field} inválido en ${document.id}`);
  }
  assert.ok(document.sourceLocation, `Ubicación fuente faltante en ${document.id}`);
}

// --------------------------------------------------------- procedures / forms
assert.equal(procedures.length, 3, "Deben existir tres procedimientos");
assert.deepEqual(
  procedures.map((item) => item.code),
  ["ALE-PR-01", "ALE-PR-02", "ALE-PR-03"],
);
assert.equal(procedures[0].evidenceStatus, "documentado");
assert.equal(procedures[1].status, DRAFT_LABEL);
assert.equal(procedures[2].status, DRAFT_LABEL);
assert.equal(procedures[1].academicLabel, DRAFT_LABEL);
assert.equal(procedures[2].academicLabel, DRAFT_LABEL);
for (const procedure of procedures) {
  assert.ok(procedure.steps.length > 0, `Secuencia vacía en ${procedure.id}`);
  assert.deepEqual(
    procedure.steps.map((step) => step.order),
    procedure.steps.map((_, index) => index + 1),
    `Secuencia incorrecta en ${procedure.id}`,
  );
  assert.ok(procedure.decisions.length > 0, `Decisiones humanas faltantes en ${procedure.id}`);
}

assert.ok(forms.length >= 5, "Deben existir al menos cinco formatos utilizables");
assert.equal(new Set(forms.map((form) => form.code)).size, forms.length);
for (const form of forms) {
  assert.ok(form.fields.length > 0, `Campos vacíos en ${form.id}`);
  const keys = form.fields.map((field) => field.key);
  assert.equal(new Set(keys).size, keys.length, `Campos duplicados en ${form.id}`);
  for (const field of form.fields) {
    assert.ok(
      ["text", "date", "number", "textarea", "select"].includes(field.type),
      `Tipo de campo inválido en ${form.id}`,
    );
    assert.equal(typeof field.required, "boolean", `Requerimiento inválido en ${form.id}`);
    if (field.type === "select") {
      assert.ok(Array.isArray(field.options) && field.options.length > 0, `Opciones faltantes en ${form.id}`);
    }
  }
  assert.ok(form.instructions.length > 0, `Instrucciones faltantes en ${form.id}`);
}
const simulatedForm = forms.find((form) => form.code === "ALE-F-01");
assert.ok(simulatedForm, "Debe existir el formato ALE-F-01");
assert.equal(simulatedForm.simulationNotice, SIMULATION_LABEL);
assert.equal(simulatedForm.academicLabel, SIMULATION_LABEL);
assert.equal(simulatedForm.recordStatus, "Simulado");
assert.ok(simulatedForm.example, "ALE-F-01 debe incluir un ejemplo lleno");
assert.deepEqual(
  Object.keys(simulatedForm.example).sort(),
  simulatedForm.fields.map((field) => field.key).sort(),
  "El ejemplo de ALE-F-01 debe cubrir todos sus campos",
);

// ------------------------------------------------------------------- KPI / SGI
assert.equal(kpis.length, 8, "Deben existir ocho indicadores");
assert.deepEqual(
  kpis.map((kpi) => kpi.code),
  ["OBJ-01", "OBJ-02", "OBJ-03", "OBJ-04", "PROP-05", "PROP-06", "PROP-07", "PROP-08"],
);
for (const kpi of kpis) {
  assert.equal(kpi.result, null, `No debe haber resultado medido en ${kpi.id}`);
  assert.equal(kpi.trend, null, `No debe haber tendencia inventada en ${kpi.id}`);
  assert.notEqual(kpi.evidenceStatus, "medido", `${kpi.id} no está medido`);
  assert.ok(kpi.formula && kpi.dataSource && kpi.expectedEvidence, `Ficha incompleta en ${kpi.id}`);
}

// --------------------------------------------------------------- audit trail
assert.equal(audits.length, 2, "Deben distinguirse las dos auditorías");
assert.deepEqual(
  audits.map((audit) => audit.type),
  [
    "Auditoría interna del SGSI de Alestra",
    "Auditoría de Alestra a La Finca del Barrio",
  ],
);
for (const audit of audits) {
  assert.deepEqual(audit.evidenceObserved, [], `No se inventan evidencias en ${audit.id}`);
  assert.match(audit.results, /Sin resultados|No disponible/, `Resultado no documentado en ${audit.id}`);
}
assert.deepEqual(findings, [], "No hay hallazgos sin auditoría ejecutada");
assert.deepEqual(correctiveActions, [], "No hay acciones correctivas sin hallazgos");
assert.ok(improvementActions.length > 0, "Deben listarse las mejoras pendientes");
for (const action of improvementActions) {
  assert.ok(
    ["Alta", "Media", "Baja", "Pendiente"].includes(action.priority),
    `Prioridad inválida en ${action.id}`,
  );
}

assert.equal(aiUseCases.length, 3, "Deben existir tres casos de uso de IA responsable");
for (const useCase of aiUseCases) {
  assert.equal(useCase.externalIntegration, false, `Integración externa no permitida en ${useCase.id}`);
  for (const field of ["humanDecisionRole", "requiredCompetence", "dataHandling"]) {
    assert.ok(useCase[field], `${field} faltante en ${useCase.id}`);
  }
  for (const field of ["inputs", "risks", "controls", "benefits", "limits"]) {
    assert.ok(Array.isArray(useCase[field]) && useCase[field].length > 0, `${field} vacío en ${useCase.id}`);
  }
}

// ------------------------------------------------------------ trace / reports
const traceStages = [
  "requirement",
  "process",
  "asset",
  "risk",
  "control",
  "procedure",
  "form",
  "kpi",
  "auditFinding",
  "improvementAction",
];
assert.ok(traceability.length > 0, "La matriz de trazabilidad debe estar poblada");
for (const row of traceability) {
  for (const stage of traceStages) {
    assert.equal(typeof row[stage], "string", `${stage} inválido en ${row.id}`);
    assert.ok(row[stage].trim().length > 0, `${stage} vacío en ${row.id}`);
  }
  assert.ok(Array.isArray(row.gaps), `Brechas inválidas en ${row.id}`);
}
assert.ok(
  traceability.some((row) => traceStages.some((stage) => row[stage] === "Sin vincular")),
  "Debe conservarse «Sin vincular» en los eslabones ausentes",
);
assert.ok(
  traceability.some((row) => row.gaps.some((gap) => gap.toLowerCase().includes("auditor"))),
  "Debe documentarse la ausencia de hallazgos de auditoría",
);

assert.equal(reports.length, 2, "Deben planificarse dos reportes");
for (const report of reports) {
  assert.equal(report.status, REPORT_STATUS);
  assert.equal(report.file, null, `No se deben inventar PDF en ${report.id}`);
  assert.ok(report.outline.length > 0, `Contenido planificado vacío en ${report.id}`);
  for (const sensitive of ["Domicilio", "Teléfono", "Correo", "Sitio web", "Fecha de entrega"]) {
    const field = report.cover.find((item) => item.field === sensitive);
    assert.ok(field, `Campo ${sensitive} faltante en ${report.id}`);
    assert.equal(field.value, "Pendiente de confirmar", `Dato inventado en ${report.id}: ${sensitive}`);
  }
}

console.log(
  `Datasets válidos · ${risks.length} riesgos · ${assets.length} activos · ${controls.length} controles · ${documents.length} fichas · ${processes.length} procesos · ${requirements.length} requisitos · ${procedures.length} procedimientos · ${forms.length} formatos · ${kpis.length} indicadores · ${audits.length} auditorías · ${aiUseCases.length} casos IA · ${traceability.length} cadenas`,
);
