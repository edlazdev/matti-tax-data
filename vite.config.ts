import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/store": path.resolve(__dirname, "./src/store"),
      "@/config": path.resolve(__dirname, "./src/config"),
      "@/assets": path.resolve(__dirname, "./src/assets"),
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/interfaces": path.resolve(__dirname, "./src/interfaces"),
      "@/utils": path.resolve(__dirname, "./src/utils"),
      "@/api": path.resolve(__dirname, "./src/api"),
      "@/context": path.resolve(__dirname, "./src/context"),
      "@/services": path.resolve(__dirname, "./src/api/services"),
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/utils/_variables.scss" as *;`,
      },
    },
  }
});
