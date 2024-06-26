/// <reference types="vitest" />
/** @type {import('vite').UserConfig} */

import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es", "cjs"],
      fileName: (format) => `${format}/index.js`,
    },
    sourcemap: true,
    outDir: "dist",
  },
  test: {
    include: ["**/*.{test,spec}.ts"],
    globals: true,
  },
  plugins: [
    dts({
      exclude: ["**/*.{test,spec}.ts"],
      outDir: "dist/types",
    }),
  ],
});
