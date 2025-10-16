import { mergeConfig } from "vitest/config";
import baseConfig from "./vite.config";

export default mergeConfig(baseConfig, {
  test: {
    setupFiles: ["./vitest-setup.ts"],
    environment: "jsdom",
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx}"],
      all: true,
      reporter: ["text", "json", "html"],
    },
  },
});
