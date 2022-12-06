import express from "express";
import favicon from "serve-favicon";
import { join, resolve } from "node:path";

const app = express();

const PORT = process.env.PORT ?? 8080;

const wwwPath = resolve(process.argv[2] ?? "www");

app.use(favicon(join(wwwPath, "favicon.png")));
app.use(express.static(wwwPath));
app.use("*", (_, res) => {
	res.sendFile(join(wwwPath, "index.html"));
});

app.listen(PORT);
console.log(`Listening on port ${PORT}`);
