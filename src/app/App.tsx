import { AppShell } from "../components/layout/AppShell";
import { useHashRoute } from "../hooks/useHashRoute";
import { AssetsPage } from "../pages/AssetsPage";
import { ControlsPage } from "../pages/ControlsPage";
import { DocumentationPage } from "../pages/DocumentationPage";
import { IncidentsPage } from "../pages/IncidentsPage";
import { IndicatorsPage } from "../pages/IndicatorsPage";
import { OverviewPage } from "../pages/OverviewPage";
import { RisksPage } from "../pages/RisksPage";

export function App() {
  const { route, navigate } = useHashRoute();

  return (
    <AppShell route={route} onNavigate={navigate}>
      {route === "resumen" && <OverviewPage onNavigate={navigate} />}
      {route === "indicadores" && <IndicatorsPage />}
      {route === "riesgos" && <RisksPage />}
      {route === "activos" && <AssetsPage />}
      {route === "controles" && <ControlsPage />}
      {route === "incidentes" && <IncidentsPage onNavigate={navigate} />}
      {route === "documentacion" && <DocumentationPage />}
    </AppShell>
  );
}
