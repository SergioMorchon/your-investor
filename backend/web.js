import express from "express";
import favicon from "serve-favicon";
import { dirname, join, normalize } from "node:path";

const app = express();

const PORT = 8080;

const currentDirectory = dirname(
	new URL(import.meta.url).pathname.replace(/^\//, "")
);

const distDirectory = normalize(join(currentDirectory, "..", "dist"));

app.use(favicon(join(distDirectory, "favicon.png")));
app.use(express.static(distDirectory));
app.use("*", (_, res) => {
	res.sendFile(join(distDirectory, "index.html"));
});

app.listen(PORT);
console.log(`Listening on port ${PORT}`);
