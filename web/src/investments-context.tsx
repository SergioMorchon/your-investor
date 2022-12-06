import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import * as InvestmentsApi from "./api/investments";

interface Context {
	readonly investments?: InvestmentsApi.Investments;
	readonly error?: string;
}

const InvestmentsContext = createContext<Context | null>(null);

type Props = {
	children: ReactNode;
};

export const InvestmentsContextProvider = ({ children }: Props) => {
	const [state, setState] = useState<Context>({});

	useEffect(() => {
		InvestmentsApi.investments({ onlyActive: true })
			.then((investments) => {
				setState({ investments });
			})
			.catch((error: Error) => setState({ error: error.message }));
	}, []);

	return (
		<InvestmentsContext.Provider value={state}>
			{children}
		</InvestmentsContext.Provider>
	);
};

export const useInvestmentsContext = () => {
	const context = useContext(InvestmentsContext);
	if (!context) {
		throw new Error("No investments context");
	}

	return context;
};
