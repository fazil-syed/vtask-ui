import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

import path from "path";
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      strategies: "injectManifest",
      srcDir: "src",
      filename: "service-worker.js",
      scope: "/",
      injectManifest: {
        swSrc: "src/service-worker.js",
      },
    }),
  ],
  // server: {
  //   port: 4004,
  //   strictPort: true,
  // },
  resolve: {
    alias: [{ find: "@", replacement: path.resolve("./src") }],
  },
});
