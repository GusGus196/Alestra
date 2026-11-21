import {
  Activity,
  ArrowRight,
  Boxes,
  Building2,
  CircleAlert,
  ClipboardCheck,
  ClipboardList,
  FileCheck2,
  FileStack,
  Gauge,
  Layers3,
  ListChecks,
  Route as RouteIcon,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import {
  Bar,
  BarChart,
  Cell,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { KPICard } from "../components/cards/KPICard";
import { Badge, DataNatureBadge } from "../components/common/Badge";
import { PageIntro } from "../components/common/PageIntro";
import { ChartPanel } from "../components/charts/ChartPanel";
import { CHART_AXIS, CHART_BLUE, CHART_GRID, LEVEL_COLORS } from "../components/charts/palette";
import {
  assets,
  audits,
  controls,
  correctiveActions,
  documents,
  findings,
  forms,
  improvementActions,
  kpis,
  meta,
  procedures,
  risks,
} from "../lib/data";
import { categoryData, countRisksByLevel, riskScoreData } from "../lib/calculations";
import type { RouteKey } from "../app/routes";

export function OverviewPage({ onNavigate }: { onNavigate: (route: RouteKey) => void }) {
  const levelCounts = countRisksByLevel(risks);
  const assetCategories = categoryData(assets);
  const riskScores = riskScoreData(risks);

  const documentedFiles = documents.filter((item) => item.evidenceStatus === "documentado").length;
  const pendingFiles = documents.filter((item) => item.file === null).length;
  const advancePercent = documents.length
    ? Math.round((documentedFiles / documents.length) * 100)
    : 0;
  const documentedProcedures = procedures.filter((item) => item.evidenceStatus === "documentado").length;
  const simulatedForms = forms.filter((item) => item.simulationNotice).length;
  const proposedKpis = kpis.filter((item) => item.code.startsWith("PROP-")).length;

  const quickLinks: Array<{
    route: RouteKey;
    title: string;
    text: string;
    icon: typeof ShieldAlert;
  }> = [
    {
      route: "riesgos",
      title: "Riesgos R1–R7",
      text: "P × I, mapa de calor y tratamientos documentados.",
      icon: ShieldAlert,
    },
    {
      route: "indicadores",
      title: "OBJ-01 a OBJ-04",
      text: "Uptime, MTTR, SLA y CSAT como metas propuestas.",
      icon: Gauge,
    },
    {
      route: "activos",
      title: `Inventario (${assets.length})`,
      text: "Categorías, clasificación y valoración CID.",
      icon: Boxes,
    },
    {
      route: "controles",
      title: `SoA (${controls.length})`,
      text: "Controles incluidos en la declaración fuente.",
      icon: ShieldCheck,
    },
    {
      route: "organizacion",
      title: "Organización y procesos",
      text: "Partes interesadas, mapa de procesos y RACI por rol.",
      icon: Building2,
    },
    {
      route: "requisitos",
      title: "Requisitos y aplicabilidad",
      text: "Normas, marcos y decisiones pendientes de análisis.",
      icon: ListChecks,
    },
    {
      route: "procedimientos",
      title: `Procedimientos (${procedures.length})`,
      text: `${documentedProcedures} documentado y ${procedures.length - documentedProcedures} borradores académicos.`,
      icon: ClipboardCheck,
    },
    {
      route: "formatos",
      title: `Formatos (${forms.length})`,
      text: `${simulatedForms} ejemplo simulado; exportación CSV y JSON.`,
      icon: FileStack,
    },
    {
      route: "auditoria",
      title: "Auditoría y hallazgos",
      text: "Plan separado del ejercicio La Finca del Barrio; sin resultados.",
      icon: ClipboardList,
    },
    {
      route: "trazabilidad",
      title: "Trazabilidad",
      text: "Diez eslabones con «Sin vincular» cuando falta evidencia.",
      icon: RouteIcon,
    },
    {
      route: "reportes",
      title: "Reportes",
      text: "Portadas planificadas; PDF pendientes de elaboración.",
      icon: FileCheck2,
    },
  ];

  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="Vista ejecutiva · ALE-CP-01"
        title="Resumen del SGI"
        description="Estado propuesto del Sistema de Gestión Integral para el proceso de Internet Empresarial. Las metas mostradas son objetivos de diseño, no resultados operativos."
        actions={<DataNatureBadge nature="proposed" />}
      />

      <div className="notice notice--academic">
        <CircleAlert size={18} aria-hidden="true" />
        <div>
          <strong>Estado del proyecto:</strong> propuesta académica; datos de
          ejemplo y simulación cuando así se indique.
        </div>
      </div>

      <section aria-labelledby="kpi-metas">
        <div className="section-heading">
          <h3 id="kpi-metas">Objetivos e indicadores</h3>
          <button type="button" className="text-link" onClick={() => onNavigate("indicadores")}>
            Ver indicadores <ArrowRight size={15} />
          </button>
        </div>
        <div className="kpi-grid">
          <KPICard
            label="Uptime"
            value="> 99.9"
            unit="%"
            description="Meta propuesta de disponibilidad mensual (OBJ-01)."
            badge={<Badge tone="violet">PROPUESTO · NO MEDIDO</Badge>}
            icon={<Activity size={19} />}
          />
          <KPICard
            label="MTTR"
            value="< 2"
            unit="horas"
            description="Meta propuesta de tiempo de restauración (OBJ-02)."
            badge={<Badge tone="violet">PROPUESTO · NO MEDIDO</Badge>}
            icon={<Gauge size={19} />}
            tone="amber"
          />
          <KPICard
            label="Cumplimiento SLA"
            value="Según contrato"
            description="No se asigna un porcentaje universal; depende del SLA aplicable (OBJ-03)."
            badge={<Badge tone="neutral">SIN META UNIVERSAL</Badge>}
            icon={<ClipboardList size={19} />}
            tone="neutral"
          />
          <KPICard
            label="CSAT"
            value="Por definir"
            description="Requiere escala, pregunta, muestra y meta antes de medirse (OBJ-04)."
            badge={<Badge tone="neutral">PENDIENTE</Badge>}
            icon={<Layers3 size={19} />}
            tone="neutral"
          />
        </div>
      </section>

      <section aria-labelledby="kpi-expediente">
        <div className="section-heading">
          <h3 id="kpi-expediente">Expediente documental</h3>
          <span className="section-heading__hint">Totales calculados desde los datasets locales</span>
        </div>
        <div className="kpi-grid">
          <KPICard
            label="Riesgos documentados"
            value={risks.length}
            description="Riesgos R1–R7 de la matriz del proceso."
            badge={<DataNatureBadge nature="documented" />}
            icon={<ShieldAlert size={19} />}
            tone="red"
          />
          <KPICard
            label="Riesgos alto / crítico"
            value={levelCounts.high}
            description="Valoración inherente P × I en nivel 10–25."
            badge={<Badge tone="red">NIVEL ALTO</Badge>}
            icon={<CircleAlert size={19} />}
            tone="red"
          />
          <KPICard
            label="Activos inventariados"
            value={assets.length}
            description="Registros de la hoja Inventario_Activos."
            badge={<DataNatureBadge nature="documented" />}
            icon={<Boxes size={19} />}
            tone="green"
          />
          <KPICard
            label="Controles SoA"
            value={controls.length}
            description="Controles incluidos en el documento fuente (no los 93)."
            badge={<DataNatureBadge nature="documented" />}
            icon={<ShieldCheck size={19} />}
            tone="blue"
          />
        </div>
      </section>

      <section aria-labelledby="estado-expediente">
        <div className="section-heading">
          <h3 id="estado-expediente">Estado del expediente documental</h3>
          <span className="section-heading__hint">
            Avance = documentos con estado «Documentado» / total del catálogo × 100
          </span>
        </div>
        <div className="mini-stat-grid">
          <div className="mini-stat">
            <span>Avance documental</span>
            <strong>{advancePercent}%</strong>
            <p className="mini-stat__note">
              {documentedFiles}/{documents.length} documentos. No es un porcentaje de cumplimiento ISO.
            </p>
          </div>
          <div className="mini-stat"><span>Documentos catalogados</span><strong>{documents.length}</strong></div>
          <div className="mini-stat"><span>Archivos pendientes de incorporar</span><strong>{pendingFiles}</strong></div>
          <div className="mini-stat"><span>Indicadores / propuestos</span><strong>{kpis.length} / {proposedKpis}</strong></div>
          <div className="mini-stat"><span>Auditorías ejecutadas</span><strong>0 de {audits.length}</strong></div>
          <div className="mini-stat"><span>Hallazgos / acciones correctivas</span><strong>{findings.length} / {correctiveActions.length}</strong></div>
          <div className="mini-stat"><span>Acciones de mejora</span><strong>{improvementActions.length}</strong></div>
          <div className="mini-stat"><span>Formatos utilizables</span><strong>{forms.length}</strong></div>
        </div>
      </section>

      <div className="two-column">
        <ChartPanel
          title="Activos por categoría"
          description="Distribución del inventario cargado desde el dataset."
          legend="Fuente: ALE-SGI-ACT-01, hoja Inventario_Activos."
        >
          <div className="chart-box">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={assetCategories} margin={{ top: 8, right: 12, left: 0, bottom: 4 }}>
                <CartesianGrid stroke={CHART_GRID} vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fill: CHART_AXIS, fontSize: 11 }}
                  interval={0}
                  angle={-18}
                  textAnchor="end"
                  height={60}
                />
                <YAxis allowDecimals={false} tick={{ fill: CHART_AXIS, fontSize: 11 }} />
                <Tooltip cursor={{ fill: "#eff6ff" }} />
                <Bar dataKey="total" name="Activos" fill={CHART_BLUE} radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartPanel>

        <ChartPanel
          title="Riesgo inherente por ID (P × I)"
          description="Valoración inicial documentada; no incluye valores residuales."
          legend="Rojo = 10–25 alto/crítico. Fuente: matriz de riesgos del expediente."
        >
          <div className="chart-box">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={riskScores}
                layout="vertical"
                margin={{ top: 8, right: 24, left: 0, bottom: 4 }}
              >
                <CartesianGrid stroke={CHART_GRID} horizontal={false} />
                <XAxis type="number" domain={[0, 25]} tick={{ fill: CHART_AXIS, fontSize: 11 }} />
                <YAxis
                  type="category"
                  dataKey="id"
                  width={32}
                  tick={{ fill: CHART_AXIS, fontSize: 11 }}
                />
                <Tooltip cursor={{ fill: "#eff6ff" }} />
                <Bar dataKey="score" name="P × I" radius={[0, 5, 5, 0]}>
                  {riskScores.map((entry) => (
                    <Cell key={entry.id} fill={LEVEL_COLORS[entry.level]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartPanel>
      </div>

      <section aria-labelledby="phva-title" className="panel">
        <div className="panel__header">
          <div>
            <h2 id="phva-title">Ciclo PHVA</h2>
            <p>El dashboard apoya las cuatro fases de mejora continua del proyecto.</p>
          </div>
        </div>
        <div className="phva-grid">
          {meta.phva.map((phase, index) => (
            <article className="phva-card" key={phase.phase}>
              <span className="phva-card__number">0{index + 1}</span>
              <h3>{phase.phase}</h3>
              <p>{phase.description}</p>
              <span className="phva-card__label">{phase.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="accesos-title">
        <div className="section-heading">
          <h3 id="accesos-title">Accesos rápidos</h3>
        </div>
        <div className="quick-grid">
          {quickLinks.map((item) => {
            const Icon = item.icon;
            return (
              <button
                type="button"
                className="quick-card"
                key={item.route}
                onClick={() => onNavigate(item.route)}
              >
                <span className="quick-card__icon">
                  <Icon size={20} />
                </span>
                <strong>{item.title}</strong>
                <span>{item.text}</span>
                <ArrowRight size={16} className="quick-card__arrow" aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </section>

      <div className="notice notice--muted">
        <CircleAlert size={18} aria-hidden="true" />
        <div>
          <strong>Lectura importante:</strong> el riesgo residual está pendiente de
          evaluación, el registro DDoS es una simulación académica y los controles
          de la SoA no deben interpretarse como implementados.
        </div>
      </div>
    </div>
  );
}
