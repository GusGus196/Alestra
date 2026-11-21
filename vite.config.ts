import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// El repositorio se publica en https://<usuario>.github.io/Alestra/
// Si el nombre del repositorio cambia, actualizar también este valor.
const base = "/Alestra/";

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          const path = id.replace(/\\/g, "/");
          if (
            path.includes("/node_modules/recharts/") ||
            path.includes("/node_modules/victory-vendor/")
          ) {
            return "charts";
          }
          if (path.includes("/node_modules/d3-")) return "d3";
          if (/\/node_modules\/(react|react-dom|scheduler)\//.test(path)) {
            return "react";
          }
          return undefined;
        },
      },
    },
  },
});
