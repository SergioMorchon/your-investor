export const wait = (timespan: number) =>
	new Promise((resolve) => {
		setTimeout(resolve, timespan);
	});

let token: string | null = null;

export const setAuthorizationToken = (authorizationToken: string | null) => {
	token = authorizationToken;
};

export const callApi = (
	path: string,
	{
		body = {},
	}: {
		body?: any;
	} = {}
): Promise<any> =>
	fetch(`http://localhost:3001/myinvestor-server/rest/${path}`, {
		body: JSON.stringify(body),
		method: "post",
		headers: {
			accept: "application/json",
			...(token && {
				authorization: `: Basic ${token}:`,
			}),
		},
	}).then((response) => {
		if (response.status && response.status >= 200 && response.status < 300) {
			return response.json();
		}

		throw new Error(response.statusText);
	});
