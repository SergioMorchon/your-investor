import { ResponsiveLayout } from "../../common/layout";
import { useLoginContext } from "../../login-context";

export const Dashboard = () => {
	const { completedLogin, logout } = useLoginContext();

	if (!completedLogin) {
		return "Get out of here 🚪";
	}

	const { nomUsuario } = completedLogin;

	return (
		<ResponsiveLayout>
			<h2>Profile</h2>
			{nomUsuario}
			<button onClick={logout}>Desconectar</button>
		</ResponsiveLayout>
	);
};
