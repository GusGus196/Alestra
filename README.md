# SGI-Dash — Portal documental y de evidencia de Alestra

Aplicación web estática para consultar el estado propuesto del Sistema de
Gestión Integral (SGI) del proceso **ALE-CP-01: Gestión y Soporte de Servicios
de Internet Empresarial**.

> **Este sitio es una propuesta académica.** No sustituye al SGI, al NOC, al
> SOC, al SIEM ni a los sistemas de tickets de Alestra. Las metas son
> propuestas, el registro de incidente es una simulación y los controles de la
> SoA no deben interpretarse como implementados.

Los documentos de referencia son
[`README_SGI.md`](README_SGI.md) (contexto original) y
[`README_Actualizacion_SGI_Dash_Alestra_OpenCode.md`](README_Actualizacion_SGI_Dash_Alestra_OpenCode.md)
(guía de ampliación documental).

## Módulos

La barra lateral conserva la identidad visual del dashboard y agrupa los
módulos en **Sistema, Planificar, Operar, Evaluar, Mejorar y Expediente**. Las
rutas antiguas siguen funcionando; `#/incidentes` se mantiene sin cambios.

| Ruta hash | Módulo | Contenido |
| --- | --- | --- |
| `#/resumen` | Resumen | KPI, distribución de activos, riesgo inherente, PHVA y estado del expediente |
| `#/organizacion` | Organización y procesos | Mapa de procesos, partes interesadas, FODA y RACI por rol |
| `#/requisitos` | Requisitos y aplicabilidad | 13 filas entre normas ISO, marcos de buenas prácticas y decisiones pendientes |
| `#/riesgos` | Riesgos | R1–R7, filtros, mapa de calor 5×5, procedencia y discrepancias |
| `#/activos` | Activos | Inventario filtrable, valoración CID y ficha documental |
| `#/controles` | Controles ISO / SoA | 8 controles de la SoA disponible; referencias 8.15/8.16/8.17 no confirmadas |
| `#/procedimientos` | Procedimientos | ALE-PR-01 documentado; ALE-PR-02 y ALE-PR-03 como borradores académicos |
| `#/formatos` | Formatos y registros | 6 formatos utilizables, vista previa, instrucciones, ejemplo y exportación CSV/JSON |
| `#/incidentes` | Incidentes | Registro ALE-F-01 simulado y flujo propuesto ALE-PR-01 |
| `#/indicadores` | Indicadores | OBJ-01 a OBJ-04 y PROP-05 a PROP-08; metas sin medición |
| `#/auditoria` | Auditoría y hallazgos | Plan interno y ejercicio La Finca del Barrio separados; sin resultados inventados |
| `#/mejora` | Mejora continua | Ciclo PHVA y plan de mejoras derivado de revisión documental |
| `#/ia` | IA responsable | 3 casos de uso con decisión humana, riesgos, controles, beneficios y límites |
| `#/documentacion` | Documentación | Catálogo de 21 fichas, metadatos, procedencia, políticas y pendientes |
| `#/trazabilidad` | Trazabilidad | 11 cadenas de diez eslabones con «Sin vincular» cuando falta evidencia |
| `#/reportes` | Reportes | Portadas planificadas; estado «Reporte pendiente de elaboración» |

## Estado documental y entregas pendientes

El portal distingue explícitamente `Documentado`, `Propuesto`,
`Pendiente de validación`, `Ejemplo`, `Simulación académica` y `Medido`.

- **Avance documental:** documentos con estado `Documentado` / total del
  catálogo × 100. No es un porcentaje de cumplimiento ISO.
- **Archivos:** las 21 fichas del catálogo tienen `file: null` y muestran
  «Archivo pendiente de incorporar». No hay enlaces de descarga rotos.
- **Procedimientos:** ALE-PR-01 está documentado con aprobación formal
  pendiente. ALE-PR-02 y ALE-PR-03 usan la etiqueta exacta
  `Borrador académico — pendiente de validación`.
- **Formatos:** ALE-F-01 conserva siempre
  `SIMULACIÓN ACADÉMICA — NO ES UN INCIDENTE REAL`. Los demás son borradores
  propuestos sin registros operativos reales.
- **Indicadores:** las ocho fichas tienen `result: null`. Uptime `>99.9%` y
  MTTR `<2h` son metas propuestas; SLA depende del contrato aplicable y CSAT
  está «Por definir».
- **Auditoría:** no hay auditoría ejecutada, por lo que no hay hallazgos ni
  acciones correctivas. Las mejoras mostradas no son resultados de auditoría.
- **IA responsable:** no hay APIs externas, inferencias automáticas ni datos
  reales procesados; la decisión final siempre es humana.
- **Reportes:** no existen PDF. Su estado es
  `Reporte pendiente de elaboración` y los datos de portada sensibles permanecen
  como «Pendiente de confirmar».

## Requisitos

- Node.js 20 o superior.
- npm.

## Desarrollo

```bash
npm install
npm run dev
```

La aplicación usa navegación por hash y `base: '/Alestra/'`, por lo que
funciona en GitHub Pages sin rewrites del servidor.

## Verificación

```bash
npm run check:data   # integridad, procedencia y reglas de evidencia
npm run check:routes # renderiza las 16 rutas y verifica etiquetas clave
npm run typecheck    # TypeScript sin errores
npm run build        # compila el sitio estático en dist/
npm run preview      # sirve dist/ localmente
```

La validación de datos comprueba, entre otros puntos: IDs únicos, metadatos de
procedencia, una sola `A` por fila RACI, los ocho KPIs sin resultados, los tres
procedimientos, los seis formatos con ejemplo lleno en ALE-F-01, los tres casos
de IA sin integración externa, hallazgos/acciones correctivas vacíos, ausencia
de PDF y uso de «Sin vincular» en la trazabilidad.

## Despliegue en GitHub Pages

1. El sitio se publica en `https://GusGus196.github.io/Alestra/`.
   Si cambia el nombre del repositorio, actualizar `base` en `vite.config.ts`.
2. El workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
   ejecuta validación de datos, build y publicación de `dist/` en cada push a
   `main`.
3. En GitHub: **Settings → Pages → Build and deployment → Source: GitHub
   Actions**.
4. No se suben `src/`, `node_modules/` ni `docs/`; el artefacto publicado es
   únicamente `dist/`.

## Estructura

```text
src/
├── app/            # App y configuración de las 16 rutas y grupos de navegación
├── components/
│   ├── charts/     # gráficas Recharts y mapa de calor
│   ├── common/     # badges, etiquetas de evidencia, banners y drawer
│   ├── documents/  # tarjetas y ficha del catálogo documental
│   ├── layout/     # AppShell con navegación colapsable
│   ├── tables/     # DataTable y FilterBar
│   └── tracing/    # cadena visual de trazabilidad
├── data/           # 21 datasets JSON derivados del expediente
├── hooks/          # navegación por hash
├── lib/            # cálculos, formateo y capa dataProvider
├── pages/          # 16 módulos
└── styles/         # tokens, estilos globales, responsive e impresión
scripts/
├── validate-data.mjs
└── smoke-routes.mjs
```

## Procedencia de los datos

Los archivos originales están en `docs/` y se usan solo como material fuente;
**no se publican en `dist/` ni se enlazan desde el sitio**. Los JSON generados
conservan `sourceDocument`, `sourceStatus`, `evidenceStatus`, `academicLabel` y
`discrepancyNote` cuando aplica.

| Tema | Fuente principal |
| --- | --- |
| Objetivos e indicadores | `ALE-SGI-OBJ-01_Matriz_Objetivos_e_Indicadores.xlsx` (`Objetivos_SGI`) |
| Riesgos | Matriz DOCX del SGI + `ALE-Matriz_de_Contexto...xlsx` (`DCI-MCGR-01 Matriz de Riesgos`) |
| Activos | `ALE-SGI-ACT-01_Inventario_Activos_Alestra_v02.xlsx` (`Inventario_Activos`) |
| Controles | `ALE-Declaracion de Aplicabilidad SoA ISO27001 SGI-01.docx` |
| Incidentes y políticas | `ALE-Manual SGI Alestra-01.docx` |
| Flujo de atención | `ALE-PR-01_Procedimiento_Atencion_Internet_Empresarial.docx` |
| Procedimientos y formatos propuestos | Guía de actualización y matrices derivadas |
| Auditoría, informes y expediente | Guía de actualización; documentos citados pendientes de incorporar |

### Reglas que se respetan

- Riesgo inherente = `P × I`; niveles 1–4 aceptable, 5–9 tolerable,
  10–25 alto/crítico.
- Riesgo residual: **Pendiente de evaluación**; estado de tratamiento:
  **No especificado**.
- Las matrices DOCX y XLSX de riesgos conservan su procedencia: no se combinan
  valores silenciosamente.
- Solo los 8 controles de la tabla SoA disponible figuran en `controls.json`.
  8.15, 8.16 y 8.17 aparecen como referencias no confirmadas en políticas y
  matrices.
- Uptime `> 99.9%` y MTTR `< 2 h`: metas propuestas, no mediciones.
- SLA: sin porcentaje universal; CSAT: por definir.
- El registro F-01-INC-2026-089 se muestra siempre como
  `SIMULACIÓN ACADÉMICA — NO ES UN INCIDENTE REAL`.
- El total de activos se cuenta desde el JSON importado (23 registros).
- No se generan series temporales, resultados de auditoría, hallazgos, acciones
  correctivas ni archivos PDF ficticios.
- La exportación CSV/JSON de formatos ocurre en el navegador con `Blob`; no se
  envían datos a servidores.

## Privacidad

El repositorio público contiene únicamente datos del caso académico. No se
incluyen clientes reales, direcciones IP, credenciales, tokens, topologías
internas, contratos ni registros operativos verificados.
