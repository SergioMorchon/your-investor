import { createContext, useContext, useMemo, useState } from "react";

type Context = {
	authorization: string | null;
	authorize: (authorization: string) => void;
};

const SessionContext = createContext<Context | void>(undefined);

type Props = {
	children: React.ReactNode;
};

export const SessionContextProvider = ({ children }: Props) => {
	const [authorization, setAuthorization] = useState<string | null>(null);

	return (
		<SessionContext.Provider
			value={useMemo(
				() => ({ authorization, authorize: setAuthorization }),
				[authorization]
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
