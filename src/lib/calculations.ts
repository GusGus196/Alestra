import type { Asset, Risk, RiskLevel } from "../types";

/** Nivel documentado: 1–4 aceptable, 5–9 tolerable, 10–25 alto/crítico. */
export function riskLevelFromScore(score: number): RiskLevel {
  if (score <= 4) return "acceptable";
  if (score <= 9) return "tolerable";
  return "high";
}

export function inherentScore(probability: number, impact: number): number {
  return probability * impact;
}

/** Criticidad CID del inventario: máximo de C, I y A (no equivale a P×I). */
export function assetCriticality(asset: Asset): number {
  return Math.max(asset.confidentiality, asset.integrity, asset.availability);
}

export function countBy<T>(items: T[], selector: (item: T) => string): Record<string, number> {
  return items.reduce<Record<string, number>>((acc, item) => {
    const key = selector(item);
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});
}

export function countRisksByLevel(risks: Risk[]): Record<RiskLevel, number> {
  const base: Record<RiskLevel, number> = { acceptable: 0, tolerable: 0, high: 0 };
  risks.forEach((risk) => {
    base[riskLevelFromScore(risk.inherentScore)] += 1;
  });
  return base;
}

export function heatmapCounts(risks: Risk[]): Map<string, number> {
  const map = new Map<string, number>();
  risks.forEach((risk) => {
    const key = `${risk.probability}-${risk.impact}`;
    map.set(key, (map.get(key) ?? 0) + 1);
  });
  return map;
}

export function categoryData(assets: Asset[]): Array<{ name: string; total: number }> {
  const counts = countBy(assets, (asset) => asset.category);
  return Object.entries(counts)
    .map(([name, total]) => ({ name, total }))
    .sort((a, b) => b.total - a.total || a.name.localeCompare(b.name, "es"));
}

export function riskScoreData(risks: Risk[]): Array<{
  id: string;
  score: number;
  level: RiskLevel;
}> {
  return risks
    .map((risk) => ({
      id: risk.id,
      score: inherentScore(risk.probability, risk.impact),
      level: riskLevelFromScore(risk.inherentScore),
    }))
    .sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));
}
