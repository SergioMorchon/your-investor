import { getSessionToken } from "./persistence";

export const wait = (timespan: number) =>
	new Promise((resolve) => {
		setTimeout(resolve, timespan);
	});

export const callApi = async (
	path: string,
	{
		body,
		method,
	}: {
		body?: any;
		method: "get" | "post";
	}
): Promise<any> => {
	const token = getSessionToken();
	const response = await fetch(
		`http://${location.hostname}:3001/myinvestor-server/rest/${path}`,
		{
			body: body ? JSON.stringify(body) : null,
			method,
			headers: {
				accept: "application/json",
				...(token && {
					authorization: `: Basic ${token}:`,
				}),
			},
		}
	);

	if (response.status && response.status >= 200 && response.status < 300) {
		return response.json();
	}

	throw new Error(response.statusText);
};

export const formatMoney = (amount: number) =>
	new Intl.NumberFormat("es-ES", {
		style: "currency",
		useGrouping: true,
		currency: "EUR",
	}).format(amount);
