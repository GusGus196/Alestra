import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const dataDir = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "data");
const load = (name) => JSON.parse(readFileSync(join(dataDir, name), "utf8"));

const risks = load("risks.json");
const assets = load("assets.json");
const objectives = load("objectives.json");
const controls = load("controls.json");
const incidents = load("incidents.json");
const meta = load("project-meta.json");

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
}

assert.equal(objectives.length, 4, "Deben existir 4 objetivos OBJ-01 a OBJ-04");
for (const objective of objectives) {
  assert.equal(objective.latestValue, null, `No debe haber medición inventada en ${objective.id}`);
  assert.equal(objective.measurementStatus, "not_measured");
  assert.equal(objective.dataNature, "proposed");
}

assert.ok(assets.length > 0, "El inventario no puede estar vacío");
assert.equal(new Set(assets.map((asset) => asset.id)).size, assets.length, "IDs de activos duplicados");
for (const asset of assets) {
  assert.ok(["Pública", "Interna", "Confidencial", "No especificada"].includes(asset.classificationGroup));
  for (const value of [asset.confidentiality, asset.integrity, asset.availability]) {
    assert.ok(Number.isInteger(value) && value >= 1 && value <= 4, `CID inválido en ${asset.id}`);
  }
  assert.ok(Array.isArray(asset.controls), `Controles inválidos en ${asset.id}`);
}

assert.equal(controls.length, 8, "La SoA incluye 8 controles seleccionados");
assert.equal(new Set(controls.map((control) => control.id)).size, controls.length);
for (const control of controls) {
  assert.equal(control.status, "not_specified", `Sin estado verificable en ${control.id}`);
  assert.equal(control.applies, true);
}

assert.equal(incidents.length, 1, "Solo el registro simulado del Manual SGI");
assert.equal(incidents[0].dataNature, "simulated");
assert.match(incidents[0].simulationNotice, /NO ES UN INCIDENTE REAL/);
assert.equal(incidents[0].mttrMinutes, 45);

assert.ok(meta.documents.length >= 10);
assert.ok(meta.pendingItems.length >= 6);
assert.ok(meta.project.process.id === "ALE-CP-01");

console.log(
  `Datasets válidos · ${risks.length} riesgos · ${assets.length} activos · ${objectives.length} objetivos · ${controls.length} controles · ${incidents.length} incidente simulado`,
);
