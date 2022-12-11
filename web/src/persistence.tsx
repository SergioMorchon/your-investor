const SESSION_TOKEN_KEY = "session-token";
const DEVICE_ID_KEY = "device-id";
const CACHE_KEY = "cache";

export const setSessionToken = (token: string | null) =>
	token
		? localStorage.setItem(SESSION_TOKEN_KEY, token)
		: localStorage.removeItem(SESSION_TOKEN_KEY);

export const getSessionToken = () => localStorage.getItem(SESSION_TOKEN_KEY);

const uuidTemplate = "10000000-1000-4000-8000-100000000000";

const uuidv4 = () =>
	uuidTemplate.replace(/[018]/g, (c) =>
		(
			Number(c) ^
			(crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(c) / 4)))
		).toString(16)
	);

export const getDeviceId = () => {
	const deviceId = localStorage.getItem(DEVICE_ID_KEY);
	if (!deviceId) {
		const newDeviceId = uuidv4();
		localStorage.setItem(DEVICE_ID_KEY, newDeviceId);
		return newDeviceId;
	}

	return deviceId;
};

export const localStorageProvider = () => {
	const map = new Map();
	try {
		JSON.parse(localStorage.getItem(CACHE_KEY) || "[]").forEach(
			([key, value]: [string, any]) => map.set(key, value)
		);
	} catch (e) {
		console.error("Error while loading previous cache", e);
	}

	window.addEventListener("beforeunload", () => {
		localStorage.setItem(CACHE_KEY, JSON.stringify(Array.from(map.entries())));
	});

	return map;
};
