import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), vanillaExtractPlugin()],
	server: {
		proxy: {
			"/api": {
				target: "https://app.myinvestor.es/myinvestor-server/rest",
				changeOrigin: true,
				secure: true,
				rewrite: (path) => path.replace(/^\/api/, ""),
				configure: (proxy, _options) => {
					proxy.on("start", (req, res) => {
						console.log("Request");
					});
					proxy.on("end", (req, res) => {
						console.log("Response");
						console.table({ headers: res.getHeaders() });
					});
					proxy.on("error", (err, _req, _res) => {
						console.log("proxy error", err);
					});
					proxy.on("proxyReq", (proxyReq, req, _res) => {
						console.log("Sending Request to the Target:", req.method, req.url);
					});
					proxy.on("proxyRes", (proxyRes, req, _res) => {
						console.log(
							"Received Response from the Target:",
							proxyRes.statusCode,
							req.url
						);
					});
				},
			},
		},
	},
});
