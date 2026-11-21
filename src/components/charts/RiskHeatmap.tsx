import { heatmapCounts, riskLevelFromScore } from "../../lib/calculations";
import { RISK_LEVEL_LABEL } from "../../lib/formatters";
import type { Risk, RiskLevel } from "../../types";

const SHORT_LABEL: Record<RiskLevel, string> = {
  acceptable: "Aceptable",
  tolerable: "Tolerable",
  high: "Alto",
};

export function RiskHeatmap({
  risks,
  onCellClick,
  activeCell,
}: {
  risks: Risk[];
  onCellClick?: (probability: number, impact: number) => void;
  activeCell?: string | null;
}) {
  const counts = heatmapCounts(risks);
  const impacts = [5, 4, 3, 2, 1];

  return (
    <div className="heatmap" role="group" aria-label="Mapa de calor de riesgo inherente">
      <table>
        <caption className="sr-only">
          Mapa de calor 5 por 5. Filas: impacto de 5 a 1. Columnas: probabilidad de 1 a 5.
        </caption>
        <thead>
          <tr>
            <th scope="col" className="heatmap__corner">
              I ↓ / P →
            </th>
            {[1, 2, 3, 4, 5].map((p) => (
              <th scope="col" key={p}>
                P{p}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {impacts.map((impact) => (
            <tr key={impact}>
              <th scope="row">I{impact}</th>
              {[1, 2, 3, 4, 5].map((probability) => {
                const score = probability * impact;
                const level = riskLevelFromScore(score);
                const key = `${probability}-${impact}`;
                const count = counts.get(key) ?? 0;
                return (
                  <td key={key}>
                    <button
                      type="button"
                      className={`heatmap__cell heatmap__cell--${level} ${
                        activeCell === key ? "is-active" : ""
                      }`}
                      onClick={() => onCellClick?.(probability, impact)}
                      disabled={!onCellClick}
                      title={`P${probability} × I${impact} = ${score} · ${RISK_LEVEL_LABEL[level]} · ${count} riesgo(s)`}
                      aria-label={`Probabilidad ${probability}, impacto ${impact}, riesgo ${score}, ${RISK_LEVEL_LABEL[level]}, ${count} riesgos`}
                    >
                      <span className="heatmap__score">{score}</span>
                      <span className="heatmap__level">{SHORT_LABEL[level]}</span>
                      {count > 0 && <span className="heatmap__count">{count}</span>}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
