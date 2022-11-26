export const wait = (timespan: number) =>
	new Promise((resolve) => {
		setTimeout(resolve, timespan);
	});
