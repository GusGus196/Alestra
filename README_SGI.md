# SGI-Dash --- Dashboard académico de Gestión Integral de Alestra

> **Documento maestro de contexto e implementación para OpenCode.**\
> Este README reúne el contexto del proyecto, los requisitos
> funcionales, los datos documentales disponibles, las decisiones de
> arquitectura y las reglas de diseño para construir un sitio web
> estático desplegable en GitHub Pages.

------------------------------------------------------------------------

## 1. Resumen ejecutivo

El proyecto académico consiste en diseñar una propuesta de Sistema de
Gestión Integral (SGI) para Alestra, enfocada principalmente en el
proceso **ALE-CP-01: Gestión y Soporte de Servicios de Internet
Empresarial**.

El producto tiene dos componentes complementarios:

1.  **SGI-Dash:** aplicación web interactiva para consultar indicadores,
    riesgos, activos, controles de seguridad e incidentes asociados al
    SGI.
2.  **Expediente documental:** manual, políticas, inventario de activos,
    matriz de riesgos, Declaración de Aplicabilidad (SoA), objetivos e
    indicadores, cédula del proceso y procedimiento operativo.

El dashboard es una herramienta de consulta y seguimiento. **No
sustituye al SGI, al NOC, al SOC, al SIEM ni a los sistemas de tickets
de Alestra.** Su finalidad es organizar y presentar la información del
proyecto para facilitar el seguimiento y la toma de decisiones.

### Objetivo del sitio

Construir un dashboard web sencillo, claro, profesional y adaptable a
dispositivos móviles que permita:

-   Consultar el estado general del SGI.
-   Visualizar los objetivos e indicadores del proceso ALE-CP-01.
-   Consultar la matriz de riesgos y sus tratamientos.
-   Consultar activos y su clasificación.
-   Dar seguimiento visual al estado de los controles seleccionados de
    la SoA.
-   Consultar incidentes y registros de ejemplo.
-   Mostrar claramente qué datos son metas, datos de ejemplo,
    simulaciones o mediciones reales.

### Audiencia

-   Equipo académico que desarrolla el proyecto.
-   Docente y evaluadores.
-   Personas que necesiten entender el estado propuesto del SGI.
-   No está diseñado como consola operativa de producción para personal
    real de Alestra.

------------------------------------------------------------------------

## 2. Contexto organizacional y alcance

### 2.1 Organización y proceso

El caso de estudio describe a Alestra como una marca de servicios de TI,
telecomunicaciones, ciberseguridad y nube para clientes empresariales y
gubernamentales en México, dentro del grupo Axtel.

El proceso principal definido para el proyecto es:

  -----------------------------------------------------------------------
  Campo                               Definición
  ----------------------------------- -----------------------------------
  Clave                               `ALE-CP-01`

  Nombre                              Gestión y Soporte de Servicios de
                                      Internet Empresarial

  Tipo                                Proceso misional / operativo

  Objetivo                            Gestionar solicitudes e incidentes
                                      del servicio de Internet
                                      Empresarial de manera controlada,
                                      oportuna y trazable, procurando
                                      continuidad, disponibilidad y
                                      seguridad de la información
                                      asociada.

  Inicio del proceso                  Recepción de un reporte, solicitud
                                      o alerta de monitoreo.

  Fin del proceso                     Atención, verificación,
                                      comunicación al cliente y cierre
                                      documentado.

  Áreas relacionadas                  Mesa de servicio, NOC, SOC cuando
                                      aplique, monitoreo de redes,
                                      aprovisionamiento, atención al
                                      cliente y facturación.
  -----------------------------------------------------------------------

**Criterio de alcance para el dashboard:** centrar la experiencia en
Internet Empresarial / ALE-CP-01. Nube, Data Center, SOC y NOC pueden
mostrarse como áreas o interfaces relacionadas, pero no ampliar el
alcance principal sin indicarlo expresamente.

### 2.2 Entradas, actividades y salidas del proceso

**Entradas:** - Reportes de fallas de clientes empresariales. - Alertas
de sistemas de monitoreo (NMS). - Solicitudes de servicio. - Datos del
contrato y SLA. - Información técnica autorizada.

**Actividades:** 1. Recibir y registrar el reporte. 2. Validar
solicitante, servicio e información. 3. Clasificar y priorizar según
impacto, urgencia y SLA. 4. Realizar diagnóstico inicial con
herramientas autorizadas. 5. Resolver o escalar al equipo especializado.
6. Verificar el servicio y documentar resultados. 7. Comunicar el
resultado y cerrar el registro.

**Salidas:** - Ticket actualizado. - Diagnóstico y bitácora técnica. -
Acciones de atención y escalamiento. - Servicio verificado o seguimiento
pendiente. - Comunicación de cierre y registros de evidencia.

### 2.3 Partes interesadas descritas en los documentos

  -----------------------------------------------------------------------
  Parte interesada                    Necesidad / expectativa
  ----------------------------------- -----------------------------------
  Clientes empresariales              Disponibilidad del servicio y
                                      cumplimiento de SLA.

  IFT / autoridades regulatorias      Cumplimiento normativo y protección
                                      de datos.

  Consejo de Administración / Axtel   Rentabilidad, reputación y
                                      mitigación de riesgos.

  Personal NOC / SOC / TI             Procedimientos claros, herramientas
                                      estandarizadas y seguridad.

  Proveedores de infraestructura      Acuerdos operativos e interfaces
                                      seguras.
  -----------------------------------------------------------------------

### 2.4 Contexto FODA resumido

**Fortalezas documentadas:** red de fibra óptica y redundancia (Axnet),
centros de datos y personal técnico NOC/SOC especializado.

**Oportunidades:** demanda de nube híbrida y ciberseguridad gestionada;
automatización e IA en monitoreo; expansión de servicios empresariales.

**Debilidades:** complejidad de integración de plataformas heredadas y
ticketing; ventanas de mantenimiento; necesidad de capacitación
continua.

**Amenazas:** ataques DDoS y malware; cortes de fibra por terceros;
regulación y penalizaciones asociadas a SLA.

> Estos elementos son el contexto del caso académico. No presentarlos
> como una auditoría independiente ni como información corporativa
> verificada externamente.

------------------------------------------------------------------------

## 3. Normas y enfoque de gestión

La referencia principal de seguridad de la información es **ISO/IEC
27001:2022**, especialmente el enfoque de gestión de riesgos, controles
del Anexo A, seguimiento y mejora.

El proyecto también menciona como marcos de contexto: - ISO 20000 /
gestión de servicios de TI. - ISO 22301 / continuidad del negocio. -
ITIL 4 / gestión de servicios e incidentes. - COBIT e ISO/IEC 38500 /
gobierno de TI.

No afirmar que Alestra está certificada por el hecho de que el proyecto
use estas referencias. El sitio debe describirse como una **propuesta
académica de diseño y seguimiento**.

### 3.1 Ciclo PHVA

El dashboard debe apoyar el ciclo de mejora continua:

  -----------------------------------------------------------------------
  Fase                    Qué representa          Qué debe mostrar el
                                                  sitio
  ----------------------- ----------------------- -----------------------
  Planificar              Contexto, alcance,      Alcance, inventario,
                          activos, riesgos,       matriz de riesgos,
                          objetivos y controles.  metas y SoA.

  Hacer                   Políticas,              Procedimientos,
                          procedimientos,         tratamientos y
                          controles, capacitación seguimiento de
                          y operación.            actividades.

  Verificar               Indicadores, monitoreo, KPIs, estado de
                          auditorías y revisión.  controles, incidentes y
                                                  evidencias.

  Actuar                  Acciones correctivas y  Acciones pendientes,
                          mejora continua.        responsables propuestos
                                                  y estado de
                                                  seguimiento.
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## 4. Requisitos funcionales del SGI-Dash

### 4.1 Navegación principal

Crear una aplicación tipo dashboard con navegación lateral (sidebar) en
escritorio y menú compacto en móvil.

Secciones:

1.  **Resumen**
2.  **Indicadores**
3.  **Riesgos**
4.  **Activos**
5.  **Controles ISO / SoA**
6.  **Incidentes**
7.  **Documentación / Acerca del proyecto**

La página inicial debe ofrecer una vista ejecutiva y enlaces claros a
los módulos.

### 4.2 Resumen ejecutivo

Mostrar tarjetas KPI y visualizaciones:

-   Objetivos de disponibilidad: `Uptime > 99.9%` (meta propuesta).
-   Objetivo de MTTR: `< 2 horas` (meta propuesta).
-   Cumplimiento de SLA: depende del SLA contractual aplicable; no
    inventar meta general.
-   CSAT: meta pendiente de definición.
-   Total de riesgos documentados: 7 riesgos R1--R7 en la matriz
    principal.
-   Riesgos por nivel: según valoración inicial de la matriz.
-   Activos inventariados: usar el inventario `ALE-SGI-ACT-01` y contar
    los registros de la hoja `Inventario_Activos` al cargar el dataset.
-   Controles seleccionados en la SoA: mostrar los controles incluidos
    en el documento SoA, sin insinuar que son los 93 controles
    completos.

Incluir un bloque visible: **"Estado del proyecto: propuesta académica;
datos de ejemplo y simulación cuando así se indique."**

### 4.3 Indicadores

Los objetivos están definidos en `ALE-SGI-OBJ-01`:

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ID          Objetivo         Indicador      Fórmula / método                                                                               Meta          Frecuencia
                                                                                                                                             propuesta     
  ----------- ---------------- -------------- ---------------------------------------------------------------------------------------------- ------------- ------------
  OBJ-01      Mantener         Uptime (%)     `[(Tiempo total del periodo − tiempo de indisponibilidad) / tiempo total del periodo] × 100`   `> 99.9%`     Mensual
              disponibilidad                                                                                                                               
              del servicio.                                                                                                                                

  OBJ-02      Reducir tiempo   MTTR (horas)   Suma de tiempos desde inicio registrado hasta restauración / número de incidentes restaurados. `< 2 horas`   Mensual
              de restauración.                                                                                                                             

  OBJ-03      Cumplir          Cumplimiento   (Casos o mediciones que cumplen SLA / total de casos o mediciones aplicables) × 100            Según SLA     Mensual
              compromisos de   SLA (%)                                                                                                       contratado    
              servicio.                                                                                                                                    

  OBJ-04      Mejorar          CSAT (%) o     Resultado de encuestas conforme al método y escala que se establezcan.                         Por definir   Trimestral
              satisfacción del escala                                                                                                                      
              cliente.         definida                                                                                                                    
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Reglas de presentación:** - Las metas no son resultados medidos. - Si
no hay medición, mostrar `Sin medición`, `Pendiente` o
`No disponible`. - No generar series temporales ficticias que parezcan
datos históricos reales. - Se pueden incluir valores de demostración,
pero etiquetarlos claramente como `DEMO` o `SIMULADO`. - Para SLA no
asignar un porcentaje universal: la meta depende del contrato
aplicable. - CSAT requiere definir escala, pregunta, muestra y meta
antes de calcularlo.

### 4.4 Gestión de riesgos

La matriz principal del proceso `ALE-CP-01` contiene siete riesgos. La
escala documentada es:

-   Probabilidad (P): 1 a 5.
-   Impacto (I): 1 a 5.
-   Nivel: `P × I`.
-   `1–4`: Aceptable (verde).
-   `5–9`: Tolerable (amarillo).
-   `10–25`: Alto / Crítico (rojo).

Datos iniciales documentados:

  -------------------------------------------------------------------------------------------
  ID         Riesgo                 P inicial     I inicial   P×I inicial Tratamiento /
                                                                          medida
  ---------- ------------------ ------------- ------------- ------------- -------------------
  R1         Ataque DDoS                    4             5            20 Anti-DDoS
             volumétrico que                                              automatizado, BGP
             sature la red                                                blackhole y
             periférica e                                                 Scrubbing Center
             interrumpa el                                                24/7.
             servicio.                                                    

  R2         Corte accidental               3             5            15 Segundo anillo de
             de fibra por obras                                           fibra con trazado
             civiles externas o                                           independiente y
             desastres                                                    conmutación
             naturales.                                                   automática.

  R3         Acceso no                      3             5            15 MFA, privilegio
             autorizado a                                                 mínimo, Jump
             consolas NMS con                                             Servers y registros
             elevación de                                                 SIEM.
             privilegios.                                                 

  R4         Explotación de                 4             4            16 Política de parcheo
             vulnerabilidades                                             y escaneo periódico
             por firmware                                                 de
             desactualizado.                                              vulnerabilidades.

  R5         Falla eléctrica y              2             5            10 Pruebas de plantas
             no activación de                                             y mantenimiento de
             plantas de                                                   UPS.
             respaldo.                                                    

  R6         Error humano en                3             4            12 Control de cambios,
             cambios de                                                   revisión por pares,
             configuración                                                simulación previa y
             BGP/OSPF.                                                    rollback.

  R7         Demora en                      3             4            12 Automatización de
             detección o                                                  escalamiento y
             escalamiento de                                              capacitación.
             incidentes                                                   
             críticos.                                                    
  -------------------------------------------------------------------------------------------

La matriz Excel también contiene campos de probabilidad e impacto
residual, pero algunos resultados residuales calculados aparecen vacíos.
Por tanto:

-   Mostrar el riesgo inherente calculado a partir de P e I iniciales.
-   Mostrar el estado de tratamiento documentado (`En Proceso` o
    `Implementado`) cuando se use la hoja correspondiente.
-   Mostrar el riesgo residual como `Pendiente de evaluación` si no
    existe una valoración residual completa y validada.
-   No calcular ni inventar valores residuales.
-   Permitir filtrar por ID, nivel y estado.
-   Incluir una vista de tabla y un mapa de calor 5×5.
-   Al seleccionar un riesgo, mostrar escenario, activo, vulnerabilidad,
    controles, propietario y tratamiento.

**Importante:** la matriz de contexto en DOCX y la matriz Excel tienen
variaciones en los textos de riesgo, criterios y estados. Utilizar como
dataset principal la hoja `Matriz_Riesgos_ALE-CP-01` del archivo
`Matriz de Riesgo.xlsx`, conservando la referencia de origen. Si se
requiere reconciliar versiones, marcarlo como pendiente de revisión
documental, no corregirlo silenciosamente.

### 4.5 Inventario de activos

Fuente principal: `Inventario_y_Clasificacion_de_Activos_Alestra.xlsx`,
hoja `Inventario_Activos`.

Categorías: - Información. - Software. - Hardware. - Servicios. -
Intangibles. - Componentes de red. - Personas.

Cada registro contiene: - ID del activo. - Categoría. - Nombre /
descripción. - Ubicación / entorno. - Propietario. - Clasificación. -
Valores de confidencialidad, integridad y disponibilidad. - Controles
ISO 27001 asignados.

Clasificación documental: - Pública. - Interna. - Confidencial.

La hoja de criterios incluye una escala ACID de 1 a 4 para valoración: -
1: baja / pública. - 2: normal / interna. - 3: alta / protegida. - 4:
crítica / restringida.

**UI requerida:** - Tabla con búsqueda y filtros por categoría y
clasificación. - Detalle del activo en modal o panel. - Etiquetas
visuales de clasificación. - Resumen de activos por categoría. - No
exponer información sensible real; usar únicamente datos académicos
incluidos en los archivos o versiones anonimizadas.

### 4.6 Controles de seguridad / SoA

Fuente: `Declaracion de Aplicabilidad SoA ISO27001 SGI.docx`.

El documento contiene una selección de controles aplicables y
justificaciones. Entre los controles documentados:

  -----------------------------------------------------------------------
  Control ISO/IEC         Nombre                  Relación indicada
  27001:2022                                      
  ----------------------- ----------------------- -----------------------
  5.12                    Clasificación de la     Clasificar contratos,
                          información             bases de datos y
                                                  configuraciones.

  5.30                    Continuidad de las TIC  Continuidad y
                                                  disponibilidad de
                                                  servicios.

  6.3                     Concienciación en       Formación de personal
                          ciberseguridad          técnico.

  7.12                    Seguridad del cableado  Protección de fibra,
                                                  Data Center y cableado.

  8.8                     Gestión de              Escaneo y parcheo de
                          vulnerabilidades        infraestructura.

  8.12                    Prevención de fuga de   Protección de bases de
                          datos                   datos e
                                                  infraestructura.

  8.14                    Redundancia de          Redundancia de energía,
                          instalaciones TIC       enlaces y servidores.

  8.20                    Seguridad de redes y    Segmentación y
                          segregación             protección de redes.
  -----------------------------------------------------------------------

**UI requerida:** - Tabla de controles incluidos en el documento. -
Filtros por control, tema y aplicabilidad. - Mostrar nombre,
justificación y riesgo relacionado cuando la relación esté
documentada. - Estado visual solo si el expediente contiene un estado
verificable. - Si el estado no está indicado, mostrar `No especificado`
o `Pendiente de validación`. - No asumir que el documento incluye los 93
controles ni que los controles están implementados. - No mostrar un
porcentaje global de cumplimiento si no existe evidencia suficiente para
calcularlo.

### 4.7 Gestión de incidentes

Fuente: Manual SGI y procedimiento `ALE-PR-01`.

El procedimiento propuesto cubre: 1. Recepción. 2. Registro. 3.
Validación y clasificación. 4. Diagnóstico inicial. 5. Resolución o
escalamiento. 6. Atención autorizada. 7. Verificación. 8. Comunicación y
cierre. 9. Conservación y análisis.

Roles propuestos: - Mesa de servicio / recepción. - NOC / personal
técnico autorizado. - Responsable del proceso. - SOC / Seguridad, cuando
aplique.

Campos recomendados para la vista de incidentes: - Código. - Fecha y
hora. - Proceso afectado. - Tipo / descripción. - Severidad. - Riesgo
relacionado. - Estado. - Responsable / equipo. - Tiempo de resolución. -
Acción tomada. - Resultado. - Tipo de dato: real, simulado o
demostrativo.

#### Registro DDoS de ejemplo (simulación académica)

El Manual SGI incluye un registro F-01 identificado como simulación:

  -----------------------------------------------------------------------
  Campo                               Valor documentado
  ----------------------------------- -----------------------------------
  Código                              `F-01-INC-2026-089`

  Fecha y hora                        23 de octubre de 2026, 08:15

  Proceso                             ALE-CP-01, Internet Empresarial,
                                      Data Center Querétaro

  Descripción                         Ataque volumétrico Anti-DDoS de 45
                                      Gbps dirigido a infraestructura IP
                                      de clientes corporativos.

  Severidad                           Crítica; riesgo 20 (alto).

  Acción                              Activación de scrubbing Anti-DDoS
                                      en SOC y conmutación a ruta de
                                      mitigación.

  MTTR                                45 minutos.

  Resultado indicado                  Ataque mitigado al 100%, tráfico
                                      normalizado y Uptime reportado de
                                      99.95%.
  -----------------------------------------------------------------------

**Obligatorio en la interfaz:** mostrar una etiqueta muy visible
`SIMULACIÓN ACADÉMICA — NO ES UN INCIDENTE REAL`. No presentar los 45
minutos ni el Uptime 99.95% como indicadores operativos reales de
Alestra.

### 4.8 Documentación

Crear una sección de documentación que liste los documentos fuente del
proyecto y describa brevemente su función. No es necesario subir ni
publicar los archivos internos en GitHub Pages. Puede mostrar nombre,
código, versión, estado documental y descripción.

Documentos base disponibles:

  -------------------------------------------------------------------------------------------------------
  Documento                                                           Uso dentro del proyecto
  ------------------------------------------------------------------- -----------------------------------
  `2.1 Introducción.docx`                                             Contexto y descripción del proceso
                                                                      ALE-CP-01.

  `2.2 Activos.docx`                                                  Identificación de categorías de
                                                                      activos.

  `Plan de Proyecto SGI.docx`                                         Gobernanza, mapa de procesos, PHVA
                                                                      y plan del proyecto.

  `Manual SGI Alestra.docx`                                           Políticas, producto final y
                                                                      registro de incidente simulado.

  `Matriz de Contexto Organizacional y Gestion de Riesgos SGI.docx`   Contexto, partes interesadas y
                                                                      riesgos R1--R7.

  `Matriz de Riesgo.xlsx`                                             Riesgos, tratamientos, estados y
                                                                      mapa de calor.

  `Inventario_y_Clasificacion_de_Activos_Alestra.xlsx`                Inventario detallado y
                                                                      clasificación de activos.

  `Declaracion de Aplicabilidad SoA ISO27001 SGI.docx`                Controles seleccionados y
                                                                      justificaciones.

  `ALE-SGI-OBJ-01_Matriz_Objetivos_e_Indicadores.xlsx`                Objetivos, fórmulas, metas y
                                                                      seguimiento.

  `ALE-SGI-CP-01_Cedula_Proceso_Internet_Empresarial.docx`            Ficha del proceso, entradas,
                                                                      salidas, roles y PHVA.

  `ALE-PR-01_Procedimiento_Atencion_Internet_Empresarial.docx`        Procedimiento propuesto para
                                                                      solicitudes e incidentes.
  -------------------------------------------------------------------------------------------------------

Los documentos `ALE-PR-01` y `ALE-SGI-CP-01` están identificados como
**propuestas académicas pendientes de validación**. Mantener ese
carácter en el sitio.

------------------------------------------------------------------------

## 5. Políticas de seguridad que deben reflejarse

El Manual SGI identifica políticas vinculadas con el proceso:

### 5.1 Segregación de redes e infraestructura Cloud --- control 8.20

Lineamientos documentados: - VLAN y VRF dedicadas para cada cliente
corporativo. - Consolas NMS no deben conectarse directamente a red
pública sin VPN cifrada e IPsec. - Firewalls perimetrales e inspección
entre zonas DMZ, interna y clientes.

### 5.2 Monitoreo, logs y eventos SIEM --- controles 8.16 y 8.15

Lineamientos documentados: - Dispositivos de red envían logs Syslog a
SIEM del SOC. - Registros de auditoría protegidos contra escritura
durante mínimo 12 meses. - Sincronización horaria mediante NTP
corporativo redundante (control 8.17).

### 5.3 Gestión de activos y clasificación --- control 5.12

Clasificar activos de información en: - Pública. - Interna. -
Confidencial.

El dashboard puede mostrar estos lineamientos como resumen de políticas,
no como prueba de que están operando.

------------------------------------------------------------------------

## 6. Arquitectura técnica recomendada

### 6.1 Restricción principal: GitHub Pages

El sitio debe poder desplegarse como **sitio estático** en GitHub Pages.
Por ello:

-   No usar backend obligatorio.
-   No usar base de datos de servidor.
-   No depender de API privadas para que cargue el dashboard.
-   No colocar secretos, tokens, contraseñas ni claves API en el
    frontend.
-   No simular integraciones productivas.
-   El contenido debe funcionar con archivos JSON locales incluidos en
    el repositorio.
-   Preparar la arquitectura para que una integración futura pueda
    reemplazar la fuente JSON, pero no implementarla ahora.

### 6.2 Stack recomendado

Usar un stack ligero, fácil de mantener y compatible con GitHub Pages:

-   **Vite**
-   **React**
-   **TypeScript**
-   **CSS moderno** (CSS Modules o CSS global con variables; evitar una
    configuración excesivamente compleja).
-   **Recharts** para gráficas.
-   **Lucide React** para iconos.
-   **GitHub Actions** para build y deploy a GitHub Pages.

No usar Next.js con SSR, Express, Django, Flask, Streamlit ni servicios
que requieran un servidor persistente para esta entrega estática.

### 6.3 Arquitectura lógica

``` text
Usuario
  |
  v
GitHub Pages (hosting estático)
  |
  v
Aplicación React + TypeScript
  |
  +-- Layout / Sidebar / Header
  |
  +-- Páginas
  |     +-- Resumen
  |     +-- Indicadores
  |     +-- Riesgos
  |     +-- Activos
  |     +-- Controles SoA
  |     +-- Incidentes
  |     +-- Documentación
  |
  +-- Componentes reutilizables
  |     +-- KPICard
  |     +-- StatusBadge
  |     +-- DataTable
  |     +-- RiskHeatmap
  |     +-- ChartPanel
  |     +-- DetailDrawer / Modal
  |     +-- DemoDataNotice
  |
  +-- Capa de datos local
        +-- risks.json
        +-- assets.json
        +-- objectives.json
        +-- controls.json
        +-- incidents.json
        +-- project-meta.json
```

### 6.4 Estructura de carpetas sugerida

``` text
sgi-dash/
├── public/
│   └── favicon.svg
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   └── routes.tsx
│   ├── components/
│   │   ├── layout/
│   │   ├── cards/
│   │   ├── charts/
│   │   ├── tables/
│   │   ├── badges/
│   │   └── common/
│   ├── pages/
│   │   ├── OverviewPage.tsx
│   │   ├── IndicatorsPage.tsx
│   │   ├── RisksPage.tsx
│   │   ├── AssetsPage.tsx
│   │   ├── ControlsPage.tsx
│   │   ├── IncidentsPage.tsx
│   │   └── DocumentationPage.tsx
│   ├── data/
│   │   ├── risks.json
│   │   ├── assets.json
│   │   ├── objectives.json
│   │   ├── controls.json
│   │   ├── incidents.json
│   │   └── project-meta.json
│   ├── hooks/
│   ├── lib/
│   │   ├── calculations.ts
│   │   ├── formatters.ts
│   │   └── dataStatus.ts
│   ├── styles/
│   │   ├── tokens.css
│   │   └── global.css
│   └── main.tsx
├── .github/
│   └── workflows/
│       └── deploy.yml
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

### 6.5 Modelo de datos

Usar JSON tipado en TypeScript. Ejemplos de forma:

``` ts
type DataNature = "documented" | "proposed" | "simulated" | "demo" | "measured";

type Risk = {
  id: string;
  title: string;
  description: string;
  asset: string;
  probability: number;
  impact: number;
  inherentScore: number;
  level: "acceptable" | "tolerable" | "high";
  treatment: string;
  owner: string;
  treatmentStatus: "in_progress" | "implemented" | "pending";
  residualProbability?: number | null;
  residualImpact?: number | null;
  residualScore?: number | null;
  dataNature: DataNature;
  source: string;
};

type Objective = {
  id: string;
  title: string;
  indicator: string;
  formula: string;
  target: string;
  frequency: string;
  owner: string;
  latestValue?: number | null;
  unit?: string;
  measurementStatus: "not_measured" | "demo" | "measured";
  dataNature: DataNature;
  source: string;
};

type Asset = {
  id: string;
  category: string;
  name: string;
  environment: string;
  owner: string;
  classification: "Pública" | "Interna" | "Confidencial";
  confidentiality: number;
  integrity: number;
  availability: number;
  controls: string[];
  dataNature: DataNature;
  source: string;
};

type Incident = {
  id: string;
  date: string;
  process: string;
  description: string;
  severity: string;
  status: string;
  mttrMinutes?: number | null;
  action: string;
  outcome: string;
  dataNature: "simulated" | "demo" | "measured";
  source: string;
};
```

Los tipos se pueden adaptar, pero siempre conservar `dataNature` y
`source` para que cada dato tenga procedencia y contexto.

### 6.6 Reglas de cálculo

-   Riesgo inherente: `P × I`.
-   Nivel de riesgo: 1--4 aceptable; 5--9 tolerable; 10--25
    alto/crítico.
-   Uptime: usar la fórmula definida en `ALE-SGI-OBJ-01`.
-   MTTR: promedio del tiempo desde inicio registrado hasta
    restauración, dividido entre incidentes restaurados.
-   SLA: calcular solo si se cuenta con datos y compromiso contractual
    aplicable.
-   CSAT: no calcular hasta que exista escala, método y respuestas.
-   Riesgo residual: no calcular si P residual e I residual no están
    validados.
-   Totales de activos: contar registros del JSON importado, no
    hardcodear totales derivados de hojas con celdas vacías.

------------------------------------------------------------------------

## 7. Diseño visual y experiencia de usuario

### 7.1 Dirección visual

Diseñar una interfaz de aspecto **corporativo, tecnológico, sobrio y
limpio**, inspirada en dashboards de gestión de servicios y seguridad,
sin imitar de forma exacta una marca o portal corporativo.

Paleta sugerida: - Azul marino / azul profundo para navegación y
encabezados. - Azul medio para acciones principales. - Fondo gris muy
claro o casi blanco. - Tarjetas blancas con bordes sutiles. - Verde para
aceptable / correcto. - Ámbar para tolerable / atención. - Rojo para
alto / crítico. - Gris para no medido / no especificado.

Usar variables CSS para colores, espacios, radios, sombras y tipografía.

### 7.2 Layout

**Escritorio:** - Sidebar fija de ancho moderado. - Header superior con
nombre del módulo, fecha de actualización del dataset y etiqueta de
entorno. - Área central con ancho máximo cómodo. - Grid de tarjetas de
KPI. - Gráficas y tablas debajo.

**Móvil:** - Sidebar se convierte en menú desplegable. - Tarjetas en una
columna o dos según ancho. - Tablas con scroll horizontal o vista
compacta. - No permitir que los gráficos desborden el viewport.

### 7.3 Componentes visuales

-   Tarjetas KPI con título, valor/meta, descripción y etiqueta de
    estado.
-   Badges para `Alto`, `Tolerable`, `Aceptable`, `Pendiente`,
    `Simulado`, `Propuesto`.
-   Gráfica de barras para distribución de riesgos.
-   Heatmap 5×5 para P×I.
-   Gráfica de objetivos, solo cuando haya valores de medición válidos.
-   Tabla filtrable para activos.
-   Tabla de controles SoA.
-   Timeline o lista de incidentes.
-   Panel lateral/modal para detalles.
-   Banner persistente que indique que se trata de una propuesta
    académica.

### 7.4 Reglas UX

-   Priorizar lectura rápida y jerarquía visual.
-   Evitar saturar la pantalla con gráficas decorativas.
-   Cada gráfica debe tener título, leyenda y explicación breve.
-   Cada tabla debe permitir búsqueda o filtros cuando haya varios
    registros.
-   Agregar estados vacíos claros: `Sin datos`, `Pendiente de medición`,
    `No especificado`.
-   Mostrar la fuente de los datos en las vistas de detalle.
-   Mantener contraste accesible y navegación por teclado.
-   No depender solo del color para comunicar estados; acompañar con
    texto o icono.
-   Evitar animaciones excesivas.
-   No añadir formularios de edición complejos: esta versión es
    principalmente de consulta.

------------------------------------------------------------------------

## 8. Seguridad, privacidad y límites

El sitio se publicará en un repositorio y posiblemente será accesible
públicamente. Por tanto:

1.  No incluir datos personales de clientes o empleados.
2.  No incluir contratos, direcciones IP reales, topologías internas,
    credenciales, secretos, logs reales ni información confidencial.
3.  Usar únicamente datos del caso académico que puedan publicarse o
    datos ficticios claramente etiquetados.
4.  No incluir tokens de API ni claves de servicios externos.
5.  No implementar autenticación falsa. GitHub Pages es hosting estático
    y el frontend no puede proteger secretos.
6.  No exponer enlaces a documentos internos si no están autorizados
    para publicación.
7.  No presentar el dashboard como un sistema conectado a
    infraestructura real.
8.  No afirmar que el SGI está implementado, auditado o certificado.

### Etiquetas de procedencia obligatorias

Usar etiquetas coherentes:

-   `DOCUMENTADO`: aparece en un documento del proyecto.
-   `PROPUESTO`: meta, procedimiento, control o diseño propuesto.
-   `SIMULADO`: escenario académico simulado.
-   `DEMO`: valor sintético agregado solo para mostrar una gráfica.
-   `MEDIDO`: valor respaldado por registros reales verificables.

No usar `MEDIDO` en esta versión salvo que el equipo aporte evidencia
real y autorizada.

------------------------------------------------------------------------

## 9. Integraciones: qué sí y qué no hacer ahora

Los documentos mencionan integración con: - NMS como Zabbix / PRTG. -
Jira Service Management / sistema de tickets. - SIEM / SOC. -
Automatización e Inteligencia Artificial.

Sin embargo, el despliegue pedido es GitHub Pages y no se han
proporcionado credenciales, APIs ni endpoints autorizados.

**Para esta entrega:** - Crear interfaces visuales de datos usando JSON
local. - Mostrar en la sección "Integraciones" (o en documentación) que
NMS, ticketing y SIEM son fuentes contempladas en la arquitectura
conceptual. - No hacer peticiones a APIs reales. - No inventar
resultados de integración. - Dejar una capa `dataProvider` o funciones
de lectura separadas para facilitar una integración futura. - No crear
un backend como parte de esta entrega.

------------------------------------------------------------------------

## 10. Despliegue en GitHub Pages

### 10.1 Requisitos

-   Repositorio GitHub.
-   Vite configurado con `base` compatible con el nombre del
    repositorio.
-   Workflow GitHub Actions que instale dependencias, ejecute build y
    publique `dist/`.
-   En Settings → Pages seleccionar GitHub Actions como fuente de
    despliegue.

### 10.2 Consideraciones de rutas

Para evitar errores al publicar en una URL del tipo
`https://usuario.github.io/nombre-repo/`:

-   Configurar `base: "/nombre-repo/"` en `vite.config.ts` o derivarlo
    de una variable de entorno.
-   Usar navegación basada en hash (`HashRouter`) o navegación que
    funcione correctamente en hosting estático.
-   Evitar rutas que requieran rewrites del servidor.
-   Comprobar que imágenes, iconos y JSON cargan desde la ruta base.

### 10.3 Criterios de aceptación del despliegue

-   `npm run build` termina sin errores.
-   El sitio carga desde GitHub Pages.
-   Todas las secciones funcionan al navegar.
-   No hay errores de rutas o recursos 404.
-   El diseño funciona en escritorio y móvil.
-   El dashboard funciona sin credenciales ni servicios externos.
-   El banner de datos académicos/demo está visible.
-   Ningún secreto aparece en el bundle ni en el repositorio.

------------------------------------------------------------------------

## 11. Requisitos de calidad y pruebas

OpenCode debe comprobar:

### Funcionalidad

-   Navegación entre todas las vistas.
-   Filtros de riesgos, activos y controles.
-   Detalle de un riesgo y un activo.
-   Cálculo correcto de `P × I`.
-   Clasificación correcta de los niveles de riesgo.
-   Estados vacíos cuando faltan datos.
-   Etiqueta de simulación para el incidente DDoS.

### Datos

-   Los siete riesgos R1--R7 se muestran con P e I iniciales correctos.
-   Uptime y MTTR aparecen como metas propuestas, no como resultados
    medidos.
-   SLA no tiene meta universal inventada.
-   CSAT aparece como pendiente de definición.
-   Riesgo residual se muestra pendiente si no hay valores validados.
-   Los controles SoA se limitan a los incluidos en el documento fuente.
-   El número de activos se obtiene del dataset, no de un total
    inventado.

### Calidad técnica

-   TypeScript sin errores.
-   Componentes reutilizables.
-   Diseño responsive.
-   Accesibilidad básica.
-   Sin dependencias de backend.
-   Sin errores de consola.
-   Build reproducible.

------------------------------------------------------------------------

## 12. Discrepancias y asuntos pendientes del expediente

OpenCode debe respetar estos puntos y no intentar resolverlos inventando
datos:

1.  **Riesgo residual:** en la matriz Excel existen columnas de P
    residual e I residual, pero no todos los resultados están
    completados. Mostrar pendiente.
2.  **Indicadores:** Uptime \>99.9% y MTTR \<2h son metas propuestas, no
    resultados medidos. SLA depende del contrato. CSAT está por definir.
3.  **Incidente DDoS:** el registro F-01-INC-2026-089 es una simulación
    académica. Mantener la etiqueta en todas las vistas donde aparezca.
4.  **Estado de controles:** el SoA presenta controles aplicables y
    justificaciones, pero no debe suponerse que todos están
    implementados.
5.  **Alcance:** la propuesta se centra en ALE-CP-01. Nube, Data Center,
    SOC y NOC son interfaces o áreas relacionadas según el documento.
6.  **Aprobaciones:** `ALE-PR-01` y la cédula de proceso están
    identificados como propuestas académicas pendientes de validación.
7.  **Integraciones:** NMS, Jira, SIEM y automatización IA son parte de
    la propuesta conceptual; no hay evidencia en este repositorio de
    conexiones API operativas.
8.  **Versiones de matrices:** algunos documentos presentan diferencias
    de redacción o valoración. Usar la fuente principal indicada para
    cada módulo y hacer visible la procedencia.

------------------------------------------------------------------------

## 13. Fuentes documentales y prioridad de uso

Cuando dos archivos difieran, utilizar la siguiente prioridad por tema y
no combinar valores silenciosamente:

  --------------------------------------------------------------------------------------------------
  Tema                                Fuente principal
  ----------------------------------- --------------------------------------------------------------
  Objetivo y alcance del proceso      `2.1 Introducción.docx` y
                                      `ALE-SGI-CP-01_Cedula_Proceso_Internet_Empresarial.docx`

  Objetivos e indicadores             `ALE-SGI-OBJ-01_Matriz_Objetivos_e_Indicadores.xlsx`

  Riesgos                             Hoja `Matriz_Riesgos_ALE-CP-01` de `Matriz de Riesgo.xlsx`

  Activos                             Hoja `Inventario_Activos` de
                                      `Inventario_y_Clasificacion_de_Activos_Alestra.xlsx`

  Controles y justificaciones         `Declaracion de Aplicabilidad SoA ISO27001 SGI.docx`

  Políticas y registro DDoS simulado  `Manual SGI Alestra.docx`

  Flujo de atención de incidentes     `ALE-PR-01_Procedimiento_Atencion_Internet_Empresarial.docx`

  PHVA, gobernanza y mapa de procesos `Plan de Proyecto SGI.docx`
  --------------------------------------------------------------------------------------------------

El README no sustituye los archivos fuente. Si OpenCode tiene acceso a
ellos en el workspace, debe consultarlos para verificar los campos
completos antes de generar los JSON.

------------------------------------------------------------------------

## 14. Instrucciones directas para OpenCode

Construye el sitio completo siguiendo este README. Trabaja en el
repositorio actual y prioriza una primera versión funcional y
visualmente pulida.

### Orden de implementación

1.  Inspecciona el repositorio y conserva cualquier configuración útil
    existente.
2.  Configura Vite + React + TypeScript para GitHub Pages.
3.  Crea los modelos TypeScript y datasets JSON con datos derivados de
    las fuentes indicadas.
4.  Construye layout, sidebar, header y componentes comunes.
5.  Implementa Resumen.
6.  Implementa Indicadores.
7.  Implementa Riesgos con tabla, filtros y heatmap.
8.  Implementa Activos.
9.  Implementa Controles / SoA.
10. Implementa Incidentes con el caso DDoS marcado como simulación.
11. Implementa Documentación / Acerca del proyecto.
12. Añade workflow de GitHub Actions.
13. Ejecuta build, corrige errores y verifica rutas de GitHub Pages.

### Resultado esperado

Un dashboard web estático, profesional, responsive y fácil de entender,
con datos locales basados en el expediente académico de Alestra. Debe
comunicar el estado del SGI sin inventar mediciones, aprobaciones,
evidencias ni integraciones reales.

**No construir solo una landing page.** El entregable debe ser una
aplicación navegable con módulos funcionales de consulta, filtros,
gráficas y detalles.

**No sobreingenierizar:** priorizar claridad, facilidad de mantenimiento
y compatibilidad con GitHub Pages frente a una arquitectura empresarial
compleja.

------------------------------------------------------------------------

## 15. Glosario

  -----------------------------------------------------------------------
  Término                             Significado
  ----------------------------------- -----------------------------------
  SGI                                 Sistema de Gestión Integral, nombre
                                      utilizado para el proyecto general.

  SGSI                                Sistema de Gestión de Seguridad de
                                      la Información, sistema al que se
                                      refieren los requisitos de ISO/IEC
                                      27001.

  SGI-Dash                            Dashboard web propuesto para
                                      consultar y dar seguimiento al SGI.

  ALE-CP-01                           Gestión y Soporte de Servicios de
                                      Internet Empresarial.

  NOC                                 Centro de Operaciones de Red.

  SOC                                 Centro de Operaciones de Seguridad.

  NMS                                 Sistema de monitoreo y gestión de
                                      red.

  SIEM                                Plataforma de gestión de eventos e
                                      información de seguridad.

  SLA                                 Acuerdo de Nivel de Servicio.

  Uptime                              Disponibilidad del servicio.

  MTTR                                Tiempo medio de restauración o
                                      resolución, conforme al método
                                      definido.

  CSAT                                Indicador de satisfacción del
                                      cliente.

  SoA                                 Declaración de Aplicabilidad de
                                      controles de seguridad.

  PHVA / PDCA                         Planificar, Hacer, Verificar y
                                      Actuar.

  ACID                                En el inventario del proyecto:
                                      valoración de confidencialidad,
                                      integridad y disponibilidad;
                                      respetar la terminología de cada
                                      hoja fuente.
  -----------------------------------------------------------------------

------------------------------------------------------------------------

**Fin del documento maestro.**
