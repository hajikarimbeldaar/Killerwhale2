import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

// Node-compatible __dirname for ESM
const __dirname = dirname(fileURLToPath(import.meta.url));

// Production-safe, synchronous Vite config (no static imports of 'vite')
export default {
  resolve: {
    alias: {
      "@": resolve(__dirname, "client", "src"),
      "@shared": resolve(__dirname, "shared"),
      "@assets": resolve(__dirname, "attached_assets"),
    },
  },
  root: resolve(__dirname, "client"),
  build: {
    outDir: resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
};
