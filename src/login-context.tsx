import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import * as ApiUsers from "./api/users";
import { setAuthorizationToken } from "./utils";

type Context = {
	completedLogin: ApiUsers.CompletedLogin | null;
	setCompletedLogin: (completedLogin: ApiUsers.CompletedLogin) => void;
	logout: () => void;
};

const LoginContext = createContext<Context | void>(undefined);

const COMPLETED_LOGIN_KEY = "login-response";

const usePersistLoginResponse = (
	completedLogin: ApiUsers.CompletedLogin | null
) =>
	useEffect(() => {
		if (completedLogin) {
			localStorage.setItem(COMPLETED_LOGIN_KEY, JSON.stringify(completedLogin));
		} else {
			localStorage.removeItem(COMPLETED_LOGIN_KEY);
		}
	}, [completedLogin]);

const useGetPersistedLoginState = () => {
	const persistedCompletedLogin = localStorage.getItem(COMPLETED_LOGIN_KEY);
	const stateRef = useRef<ApiUsers.CompletedLogin | null>(
		persistedCompletedLogin && JSON.parse(persistedCompletedLogin)
	);
	useEffect(() => {
		if (!persistedCompletedLogin) {
			return;
		}

		stateRef.current = JSON.parse(persistedCompletedLogin);
	}, [persistedCompletedLogin]);

	return stateRef.current;
};

type Props = {
	children: React.ReactNode;
};

export const LoginContextProvider = ({ children }: Props) => {
	const persistedLoginState = useGetPersistedLoginState();
	const [state, setState] = useState(persistedLoginState);

	usePersistLoginResponse(state);

	const logout = useCallback(async () => {
		ApiUsers.logout().then((response) => {
			alert(response.respuesta);
		});
		setState(null);
		setAuthorizationToken(null);
	}, []);

	const setCompletedLogin = useCallback(
		(completedLogin: ApiUsers.CompletedLogin) => {
			setState(completedLogin);
			setAuthorizationToken(completedLogin.token);
		},
		[]
	);

	return (
		<LoginContext.Provider
			value={useMemo(
				() => ({
					completedLogin: state,
					setCompletedLogin,
					logout,
				}),
				[state, setCompletedLogin, logout]
			)}
		>
			{children}
		</LoginContext.Provider>
	);
};

export const useLoginContext = (): Context => {
	const context = useContext(LoginContext);
	if (!context) {
		throw new Error("No login context");
	}

	return context;
};
