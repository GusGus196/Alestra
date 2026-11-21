import { AppShell } from "../components/layout/AppShell";
import { useHashRoute } from "../hooks/useHashRoute";
import { AiPage } from "../pages/AiPage";
import { AssetsPage } from "../pages/AssetsPage";
import { AuditPage } from "../pages/AuditPage";
import { ControlsPage } from "../pages/ControlsPage";
import { DocumentationPage } from "../pages/DocumentationPage";
import { FormsPage } from "../pages/FormsPage";
import { ImprovementPage } from "../pages/ImprovementPage";
import { IncidentsPage } from "../pages/IncidentsPage";
import { IndicatorsPage } from "../pages/IndicatorsPage";
import { OrganizationPage } from "../pages/OrganizationPage";
import { OverviewPage } from "../pages/OverviewPage";
import { ProceduresPage } from "../pages/ProceduresPage";
import { ReportsPage } from "../pages/ReportsPage";
import { RequirementsPage } from "../pages/RequirementsPage";
import { RisksPage } from "../pages/RisksPage";
import { TraceabilityPage } from "../pages/TraceabilityPage";

export function App() {
  const { route, navigate } = useHashRoute();

  return (
    <AppShell route={route} onNavigate={navigate}>
      {route === "resumen" && <OverviewPage onNavigate={navigate} />}
      {route === "organizacion" && <OrganizationPage />}
      {route === "requisitos" && <RequirementsPage />}
      {route === "riesgos" && <RisksPage />}
      {route === "activos" && <AssetsPage />}
      {route === "controles" && <ControlsPage />}
      {route === "procedimientos" && <ProceduresPage onNavigate={navigate} />}
      {route === "formatos" && <FormsPage />}
      {route === "incidentes" && <IncidentsPage onNavigate={navigate} />}
      {route === "indicadores" && <IndicatorsPage />}
      {route === "auditoria" && <AuditPage onNavigate={navigate} />}
      {route === "mejora" && <ImprovementPage onNavigate={navigate} />}
      {route === "ia" && <AiPage />}
      {route === "documentacion" && <DocumentationPage />}
      {route === "trazabilidad" && <TraceabilityPage />}
      {route === "reportes" && <ReportsPage />}
    </AppShell>
  );
}
