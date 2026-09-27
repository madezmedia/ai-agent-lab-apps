import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import { whop } from "@whop/cli/vite";

export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    whop({ disableTanstackDevtools: true }),
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
});
