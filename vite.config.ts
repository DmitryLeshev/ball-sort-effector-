import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import path from "path";

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: [
      {
        find: "app",
        replacement: path.resolve(__dirname, "./src/app"),
      },
      {
        find: "shared",
        replacement: path.resolve(__dirname, "./src/shared"),
      },
      {
        find: "entities",
        replacement: path.resolve(__dirname, "./src/entities"),
      },
      {
        find: "processes",
        replacement: path.resolve(__dirname, "./src/processes"),
      },
      {
        find: "features",
        replacement: path.resolve(__dirname, "./src/features"),
      },
      {
        find: "widgets",
        replacement: path.resolve(__dirname, "./src/widgets"),
      },
      {
        find: "pages",
        replacement: path.resolve(__dirname, "./src/pages"),
      },
    ],
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify(NODE_ENV),
  },
  server: {
    port: Number(PORT) || 4000,
    strictPort: true,
    host: true,
  },
});
