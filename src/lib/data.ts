import assetsRaw from "../data/assets.json";
import controlsRaw from "../data/controls.json";
import incidentsRaw from "../data/incidents.json";
import metaRaw from "../data/project-meta.json";
import objectivesRaw from "../data/objectives.json";
import risksRaw from "../data/risks.json";
import type {
  Asset,
  Incident,
  Objective,
  ProjectMeta,
  Risk,
  SoaControl,
} from "../types";

/**
 * Capa de lectura de datos. Hoy consume archivos JSON locales incluidos en el
 * repositorio. Una futura integración con NMS, tickets o SIEM puede sustituir
 * esta capa sin cambiar los componentes de presentación.
 */
export const dataProvider = {
  assets: assetsRaw as unknown as Asset[],
  controls: controlsRaw as unknown as SoaControl[],
  incidents: incidentsRaw as unknown as Incident[],
  meta: metaRaw as unknown as ProjectMeta,
  objectives: objectivesRaw as unknown as Objective[],
  risks: risksRaw as unknown as Risk[],
};

export const {
  assets,
  controls,
  incidents,
  meta,
  objectives,
  risks,
} = dataProvider;
