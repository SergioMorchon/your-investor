import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import * as ResumeApi from "./api/resume";

interface Context {
	readonly accounts?: ResumeApi.Accounts;
	readonly error?: string;
}

const ResumeContext = createContext<Context | null>(null);

type Props = {
	children: ReactNode;
};

export const ResumeContextProvider = ({ children }: Props) => {
	const [state, setState] = useState<Context>({});

	useEffect(() => {
		ResumeApi.accounts()
			.then((accounts) => {
				setState({ accounts });
			})
			.catch((error: Error) => setState({ error: error.message }));
	}, []);

	return (
		<ResumeContext.Provider value={state}>{children}</ResumeContext.Provider>
	);
};

export const useResumeContext = () => {
	const context = useContext(ResumeContext);
	if (!context) {
		throw new Error("No resume context");
	}

	return context;
};
