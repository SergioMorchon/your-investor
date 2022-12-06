import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import * as UsersApi from "./api/users";

interface Context {
	readonly loggedInUserData?: UsersApi.LoggedInUserData;
	readonly clientData?: UsersApi.ClientData;
	readonly error?: string;
}

const UserContext = createContext<Context | null>(null);

type Props = {
	children: ReactNode;
};

export const UserContextProvider = ({ children }: Props) => {
	const [state, setState] = useState<Context>({});

	useEffect(() => {
		Promise.all([UsersApi.loggedInUserData(), UsersApi.clientData()])
			.then(([loggedInUserData, clientData]) => {
				setState({ loggedInUserData, clientData });
			})
			.catch((error: Error) => setState({ error: error.message }));
	}, []);

	return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("No user context");
	}

	return context;
};
