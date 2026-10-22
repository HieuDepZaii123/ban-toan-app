import react from "@vitejs/plugin-react";
import { copyFileSync, existsSync } from "node:fs";
import { defineConfig, type Plugin } from "vite";
import { VitePWA } from "vite-plugin-pwa";

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
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: null,
      includeAssets: ["favicon.svg", "icon-192.png", "icon-512.png"],
      manifest: {
        name: "Bàn Toán",
        short_name: "Bàn Toán",
        description: "Bàn làm việc toán THPT: kéo tham số, nhìn hình đổi, rồi luyện.",
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
        globPatterns: ["**/*.{js,css,html,svg,png,webmanifest}"],
        globIgnores: ["**/404.html"],
        navigateFallback: "index.html",
        runtimeCaching: [
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
  preview: { host: "127.0.0.1", port: 43991, strictPort: true },
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
