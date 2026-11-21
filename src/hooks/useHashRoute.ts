import { useCallback, useEffect, useState } from "react";
import { DEFAULT_ROUTE, isRouteKey, type RouteKey } from "../app/routes";

function readHash(): RouteKey {
  const raw = window.location.hash.replace(/^#\/?/, "").split("/")[0];
  return isRouteKey(raw) ? raw : DEFAULT_ROUTE;
}

/** Navegación por hash: compatible con GitHub Pages sin rewrites del servidor. */
export function useHashRoute() {
  const [route, setRoute] = useState<RouteKey>(readHash);

  useEffect(() => {
    const onChange = () => setRoute(readHash());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [route]);

  const navigate = useCallback((next: RouteKey) => {
    window.location.hash = `/${next}`;
    setRoute(next);
  }, []);

  return { route, navigate };
}
