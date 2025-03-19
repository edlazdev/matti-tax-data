
import path from 'path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@store': path.resolve(__dirname, './src/store'),
      '@config': path.resolve(__dirname, './src/config'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/themes/_variables.scss" as *;`
      }
    }
  },
  build: {
    lib: {
      entry: "src/index.tsx",
      name: "TaxDataWidget",
      fileName: "tax-data-widget",
      formats: ["umd"]
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM"
        }
      }
    }
  }
})
