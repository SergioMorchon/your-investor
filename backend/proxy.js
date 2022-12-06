import axios from "axios";
import express from "express";
import cors from "cors";

const defaultheaders = {
	"Accept-Encoding": "compress",
	dnt: "1",
	"content-type": "application/json",
	"sec-ch-ua":
		'"Microsoft Edge";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
	"sec-ch-ua-mobile": "?1",
	"sec-ch-ua-platform": '"Android"',
	"sec-fetch-dest": "empty",
	"sec-fetch-mode": "cors",
	"sec-fetch-site": "same-origin",
	"x-http-method-override": "POST",
	"x-origin-b2b": "https://app.myinvestor.es/",
};

const app = express();
// Needed for fetch preflight OPTIONS when GET with headers
app.options("*", cors());

app.all("*", async (request, response) => {
	response.setHeader("Access-Control-Allow-Origin", "*");
	const url = `https://app.myinvestor.es/${request.path}`;
	const headers = {
		...defaultheaders,
		authorization: request.headers.authorization ?? undefined,
	};
	const chunks = [];
	// TODO use express.json()
	request.on("data", (chunk) => {
		chunks.push(chunk);
	});

	request.on("end", async () => {
		try {
			const body = chunks.join("");
			const { data } = await axios.request({
				url,
				data: body,
				method: request.method,
				headers,
				insecureHTTPParser: true,
			});

			response.json(data);
		} catch (e) {
			console.error(e.code);
			response.statusCode = e?.response?.status ?? 500;
			response.statusMessage = e?.response?.statusText ?? "Error";
			response.send();
		}
	});
});

const port = 3_001;

app.listen(port);
console.log(`Listening on port ${port}`);
