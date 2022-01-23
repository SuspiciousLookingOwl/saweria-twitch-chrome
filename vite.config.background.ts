import { defineConfig } from "vite";

// this is only used to build background.js file
export default defineConfig({
	build: {
		target: "esnext",
		polyfillDynamicImport: false,
		emptyOutDir: false,
		rollupOptions: {
			input: "src/background/background.ts",
			output: {
				entryFileNames: "[name].js",
				format: "module",
				dir: "dist",
			},
		},
	},
});
