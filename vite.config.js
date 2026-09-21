import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Relative base so the build works under any GitHub Pages path
// (https://<user>.github.io/<repo>/) without editing config per-repo.
export default defineConfig({
  plugins: [react()],
  base: "./",
});
