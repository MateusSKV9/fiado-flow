import { buildApp } from "./app.js";

const app = buildApp();

const port = Number(process.env.PORT ?? 3333);

async function start() {
	try {
		await app.listen({
			port,
			host: "0.0.0.0",
		});
	} catch (error) {
		app.log.error(error);
		process.exit(1);
	}
}

start();
