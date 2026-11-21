import { Siren } from "lucide-react";

const DEFAULT_NOTICE = "SIMULACIÓN ACADÉMICA — NO ES UN INCIDENTE REAL";

export function AcademicSimulationBanner({
  notice = DEFAULT_NOTICE,
  description,
}: {
  notice?: string;
  description?: string;
}) {
  return (
    <div className="simulation-banner" role="alert">
      <Siren size={24} aria-hidden="true" />
      <div>
        <strong>{notice}</strong>
        <p>
          {description ??
            "Las cifras y eventos mostrados son ficticios y sirven solo para demostrar el uso del formato. No son registros operativos de Alestra."}
        </p>
      </div>
      <span className="simulation-banner__tag">DEMOSTRATIVO</span>
    </div>
  );
}
