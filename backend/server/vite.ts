import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { type Server } from "http";
import crypto from "crypto";

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const { createServer: createViteServer, createLogger } = await import("vite");
  const viteConfig = (await import("../vite.config.js")).default;
  const react = (await import("@vitejs/plugin-react")).default;
  const viteLogger = createLogger();

  const serverOptions = {
    // ... setup remains same
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    plugins: [react()],
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  
  // Only serve the SPA for non-API routes
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    
    // Skip API routes and uploads
    if (url.startsWith('/api') || url.startsWith('/uploads')) {
      return next();
    }

    try {
      const clientTemplate = path.resolve(
        process.cwd(),
        "client",
        "index.html",
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${crypto.randomUUID()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  // In production (Docker), we run from /app and index.js is in dist/
  // So dist/public is relative to process.cwd() if running 'node dist/index.js'
  const distPath = path.resolve(process.cwd(), "dist", "public");

  log(`Serving static files from: ${distPath}`);
  log(`Index file exists: ${fs.existsSync(path.resolve(distPath, "index.html"))}`);

  // Diagnostic route
  app.get("/api/diagnostic/frontend", (req, res) => {
    res.json({
      processCwd: process.cwd(),
      distPath,
      indexExists: fs.existsSync(path.resolve(distPath, "index.html")),
      nodeEnv: process.env.NODE_ENV,
      dirname: import.meta.dirname,
      publicDirContents: fs.existsSync(distPath) ? fs.readdirSync(distPath) : "directory-not-found"
    });
  });

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist (but skip API routes)
  app.use("*", (req, res, next) => {
    // Skip API routes and uploads
    if (req.originalUrl.startsWith('/api') || req.originalUrl.startsWith('/uploads')) {
      return next();
    }
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
