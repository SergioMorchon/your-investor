const SESSION_TOKEN_KEY = "session-token";

export const setSessionToken = (token: string | null) =>
	token
		? localStorage.setItem(SESSION_TOKEN_KEY, token)
		: localStorage.removeItem(SESSION_TOKEN_KEY);

export const getSessionToken = () => localStorage.getItem(SESSION_TOKEN_KEY);

export const clear = () => localStorage.clear();
