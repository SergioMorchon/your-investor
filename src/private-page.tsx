import { Navigate } from "react-router-dom";
import { login } from "./paths";
import { useSessionContext } from "./session-context";

type Props = {
	children: React.ReactElement;
};

export const PrivateContent = ({ children }: Props) =>
	useSessionContext().authorization ? (
		children
	) : (
		<Navigate to={login} replace />
	);
