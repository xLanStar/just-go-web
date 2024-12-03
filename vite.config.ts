import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: "**/*.svg",
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://voidcloud.net",
        changeOrigin: true,
      },
      "/uploads": {
        target: "http://voidcloud.net",
        changeOrigin: true,
      },
    },
  },
});
