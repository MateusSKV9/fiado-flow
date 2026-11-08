import fastify from "fastify";

export function buildApp() {
	const app = fastify({
		logger: true,
	});

	app.get("/health", async () => {
		return {
			status: "ok",
		};
	});

	return app;
}
