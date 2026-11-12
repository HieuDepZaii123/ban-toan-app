import react from "@vitejs/plugin-react";
import { copyFileSync, existsSync } from "node:fs";
import { defineConfig, type Plugin } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import { SECURITY_HEADERS } from "./server/http/headers.ts";
import { payApi } from "./server/pay/vitePlugin.ts";

function spa404(): Plugin {
  return {
    name: "spa-404",
    apply: "build",
    writeBundle() {
      if (existsSync("dist/index.html")) copyFileSync("dist/index.html", "dist/404.html");
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    spa404(),
    payApi(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: null,
      includeAssets: ["favicon.svg", "icon-192.png", "icon-512.png"],
      manifest: {
        name: "Bàn Toán",
        short_name: "Bàn Toán",
        description: "Toán lớp 1–12: bài học có hình kéo, ví dụ từng bước và bài luyện có lời giải.",
        lang: "vi",
        start_url: "/",
        scope: "/",
        display: "standalone",
        background_color: "#e7e0d2",
        theme_color: "#0e6b5e",
        icons: [
          { src: "icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
          { src: "icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
          { src: "icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,webmanifest,woff2}"],
        // Precache the app and the KaTeX woff2 fonts (formulas must look right offline), but not the
        // multi-megabyte libraries only used for chat diagrams (mermaid, elk, cytoscape) or PDF export.
        // Those are cached at runtime the first time a learner actually uses them.
        globIgnores: [
          "**/404.html",
          "**/KaTeX_*.{woff,ttf}",
          "**/elk-*.js",
          "**/pdf-*.js",
          "**/cytoscape*.js",
          "**/mermaid*.js",
          "**/*Diagram*.js",
          "**/*diagram*.js",
          "**/swimlanes-*.js",
          "**/cose-bilkent-*.js",
          "**/chunk-[A-Z0-9][A-Z0-9][A-Z0-9][A-Z0-9][A-Z0-9][A-Z0-9][A-Z0-9][A-Z0-9]-*.js",
        ],
        navigateFallback: "index.html",
        navigateFallbackDenylist: [/^\/api\//],
        runtimeCaching: [
          {
            urlPattern: /\/assets\/.*\.js$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "on-demand-js",
              expiration: { maxEntries: 120, maxAgeSeconds: 60 * 60 * 24 * 60 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /\/assets\/KaTeX_.*\.(?:woff2|woff|ttf)$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "katex-fonts",
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
  server: { host: "127.0.0.1", port: 43123, strictPort: true },
  preview: { host: "127.0.0.1", port: 43991, strictPort: true, headers: SECURITY_HEADERS },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/katex")) return "katex";
        },
      },
    },
  },
});
