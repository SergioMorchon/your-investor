import { useEffect, useState } from "react";
import { ResponsiveLayout, Stack } from "../../common/layout";
import { useLoginContext } from "../../login-context";
import * as ResumeApi from "../../api/resume";

const useAccounts = () => {
	const [state, setState] = useState<ResumeApi.Accounts | null>(null);
	useEffect(() => {
		ResumeApi.accounts()
			.then(setState)
			.catch((error: Error) => console.error(error.message));
	}, []);
	return state;
};

export const Dashboard = () => {
	const { completedLogin, logout } = useLoginContext();
	const accounts = useAccounts();

	if (!completedLogin) {
		return <>Get out of here 🚪</>;
	}

	const { nomUsuario } = completedLogin;

	return (
		<ResponsiveLayout>
			<h2>Profile</h2>
			{nomUsuario}
			{accounts && (
				<Stack space={32}>
					{[
						{ title: "Cuentas corrientes", accounts: accounts.cuentasEfectivo },
						{ title: "Cuentas de valores", accounts: accounts.cuentasValores },
						{
							title: "Cuentas de pensiones",
							accounts: accounts.cuentasPensiones,
						},
					].map(({ title, accounts }) => (
						<article key={title}>
							{title}
							<ol>
								{accounts.map((account) => (
									<li key={account.idCuenta}>
										{[
											account.aliasCuenta ?? account.codigoCuenta,
											`${account.importeCuenta}€`,
										].join(": ")}
									</li>
								))}
							</ol>
						</article>
					))}
				</Stack>
			)}
			<button onClick={logout}>Desconectar</button>
		</ResponsiveLayout>
	);
};
