import assert from "node:assert/strict";
import React from "react";
import { renderToString } from "react-dom/server";
import { createServer } from "vite";

const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "error",
});

const noop = () => undefined;

globalThis.window = {
  location: { hash: "#/resumen" },
  addEventListener: noop,
  removeEventListener: noop,
  scrollTo: noop,
  matchMedia: () => ({ matches: false, addListener: noop, removeListener: noop }),
};
globalThis.document = {
  body: { classList: { add: noop, remove: noop } },
  createElement: () => ({ click: noop, remove: noop, set href(value) {}, set download(value) {} }),
};

const { App } = await server.ssrLoadModule("/src/app/App.tsx");
const { routes } = await server.ssrLoadModule("/src/app/routes.ts");

const expected = {
  resumen: "Avance documental",
  organizacion: "Matriz RACI propuesta",
  requisitos: "Matriz de requisitos",
  riesgos: "Pendiente de evaluación",
  activos: "Inventario",
  controles: "Declaración de Aplicabilidad",
  procedimientos: "Borrador académico — pendiente de validación",
  formatos: "SIMULACIÓN ACADÉMICA — NO ES UN INCIDENTE REAL",
  incidentes: "SIMULACIÓN ACADÉMICA — NO ES UN INCIDENTE REAL",
  indicadores: "PROP-08",
  auditoria: "La Finca del Barrio",
  mejora: "Plan de mejoras",
  ia: "SIN API EXTERNA",
  documentacion: "Archivo pendiente de incorporar",
  trazabilidad: "Sin vincular",
  reportes: "Reporte pendiente de elaboración",
};

assert.equal(routes.length, 16, "Deben existir 16 rutas");

for (const route of routes) {
  window.location.hash = `#/${route.key}`;
  const html = renderToString(React.createElement(App));
  assert.ok(html.length > 1000, `Render vacío en #/${route.key}`);
  assert.ok(html.includes(expected[route.key]), `Falta contenido clave en #/${route.key}`);
  console.log(`#/${route.key} · OK · ${html.length} chars`);
}

await server.close();
