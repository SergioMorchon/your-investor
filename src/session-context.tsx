import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

type Context = {
	authorization: string | null;
	authorize: (authorization: string) => void;
	logout: () => void;
};

const SessionContext = createContext<Context | void>(undefined);

const AUTHORIZATION = "authorization";

const usePersistAuthorization = (authorization: string | null) =>
	useEffect(() => {
		if (authorization) {
			localStorage.setItem(AUTHORIZATION, authorization);
		} else {
			localStorage.removeItem(AUTHORIZATION);
		}
	}, [authorization]);

type Props = {
	children: React.ReactNode;
};

export const SessionContextProvider = ({ children }: Props) => {
	const [authorization, setAuthorization] = useState<string | null>(
		localStorage.getItem(AUTHORIZATION)
	);

	usePersistAuthorization(authorization);

	const logout = useCallback(() => {
		setAuthorization(null);
	}, []);

	return (
		<SessionContext.Provider
			value={useMemo(
				() => ({ authorization, authorize: setAuthorization, logout }),
				[authorization, logout]
			)}
		>
			{children}
		</SessionContext.Provider>
	);
};

export const useSessionContext = (): Context => {
	const context = useContext(SessionContext);
	if (!context) {
		throw new Error("No session context");
	}

	return context;
};
