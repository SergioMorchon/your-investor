import {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useReducer,
} from "react";
import { wait } from "../utils";
import { Action, reducer, State } from "./state";

type Context = Readonly<{
	state: State;
	dispatch: React.Dispatch<Action>;
}>;

const ProfileContext = createContext<Context | null>(null);

type Props = {
	children: React.ReactNode;
};

export const ProfileContextProvider = ({ children }: Props) => {
	const [state, dispatch] = useReducer(reducer, {
		profile: null,
		isLoading: false,
		error: null,
	});

	return (
		<ProfileContext.Provider
			value={useMemo(() => ({ state, dispatch }), [state])}
		>
			{children}
		</ProfileContext.Provider>
	);
};

const useProfileContext = () => {
	const context = useContext(ProfileContext);
	if (!context) {
		throw new Error("No profile context");
	}

	return context;
};

export const useProfileState = () => useProfileContext().state;

export const useFetchProfile = () => {
	const { dispatch } = useProfileContext();
	useEffect(() => {
		const fetchData = async () => {
			dispatch({
				type: "set-is-loading",
				payload: {
					isLoading: true,
				},
			});
			try {
				await wait(1_000);
				dispatch({
					type: "set-profile",
					payload: {
						profile: {
							fullName: "Sergio Morchón Poveda",
							shortName: "Sergio",
							email: "sergio.morchon@outlook.com",
							phoneNumber: null,
						},
					},
				});
			} catch (e) {
				dispatch({
					type: "set-error",
					payload: {
						error: String(e),
					},
				});
			} finally {
				dispatch({
					type: "set-is-loading",
					payload: {
						isLoading: false,
					},
				});
			}
		};

		fetchData();
	}, [dispatch]);
};
