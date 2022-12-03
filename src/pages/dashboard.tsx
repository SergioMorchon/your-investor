import { useEffect, useState } from "react";
import { ResponsiveLayout, Stack } from "../common/layout";
import { useLoginContext } from "../login-context";
import * as ResumeApi from "../api/resume";
import { Button } from "../common/fields";
import { BrandHeading } from "../common/brand-heading";

const useAccounts = () => {
	const [state, setState] = useState<ResumeApi.Accounts | null>(null);
	useEffect(() => {
		ResumeApi.accounts()
			.then(setState)
			.catch((error: Error) => alert(error.message));
	}, []);
	return state;
};

export const Dashboard = () => {
	const { completedLogin, logout } = useLoginContext();
	const accounts = useAccounts();

	if (!completedLogin) {
		return <>Get out of here 🚪</>;
	}

	const { nomUsuario, numVersionWeb } = completedLogin;

	return (
		<>
			<BrandHeading />
			Versión {numVersionWeb}
			<ResponsiveLayout>
				<h2>Dashboard</h2>
				<h3>{nomUsuario}</h3>
				<Stack space={32}>
					{accounts && (
						<Stack space={16}>
							{[
								{
									title: "Cuentas corrientes",
									accounts: accounts.cuentasEfectivo,
								},
								{
									title: "Cuentas de valores",
									accounts: accounts.cuentasValores,
								},
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
					<Button onPress={logout}>Desconectar</Button>
				</Stack>
			</ResponsiveLayout>
		</>
	);
};
