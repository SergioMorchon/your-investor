import { Navigate } from "react-router-dom";
import { getSessionToken } from "./persistence";

type Props = {
	children: React.ReactElement;
};

export const PrivateContent = ({ children }: Props) =>
	getSessionToken() ? children : <Navigate to="/login" replace />;
