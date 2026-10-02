import {defineConfig} from "vitest/config";

export default defineConfig({
    test: {
        projects: [
            {
                test: {
                    name: "common",
                    root: "./common",
                },
            },
            {
                extends: "./frontend/vite.config.ts",
                test: {
                    name: "frontend",
                },
            },
            {
                extends: "./backend/vitest.config.ts",
                test: {
                    name: "backend",
                    root: "./backend",
                },
            },
        ],
    },
});
