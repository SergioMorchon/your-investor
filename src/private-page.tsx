import { Navigate } from "react-router-dom";
import { login } from "./paths";
import { useLoginContext } from "./login-context";

type Props = {
	children: React.ReactElement;
};

export const PrivateContent = ({ children }: Props) =>
	useLoginContext().completedLogin ? children : <Navigate to={login} replace />;
