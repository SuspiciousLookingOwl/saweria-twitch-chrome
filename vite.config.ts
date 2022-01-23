import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

const production = process.env.NODE_ENV === "production";

export default defineConfig({
	plugins: [solidPlugin()],
	build: {
		target: "esnext",
		polyfillDynamicImport: false,
		assetsDir: "public",
		emptyOutDir: production,
	},
});
