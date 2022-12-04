import { useCallback, useEffect, useState } from "react";
import { ResponsiveLayout, Stack } from "../common/layout";
import * as Persistence from "../persistence";
import * as ResumeApi from "../api/resume";
import * as UsersApi from "../api/users";
import { Button } from "../common/fields";
import { BrandHeading } from "../common/brand-heading";
import { useNavigate } from "react-router-dom";
import { login } from "../paths";

const useAccounts = () => {
	const [state, setState] = useState<ResumeApi.Accounts | null>(null);
	useEffect(() => {
		ResumeApi.accounts()
			.then(setState)
			.catch((error: Error) => alert(error.message));
	}, []);
	return state;
};

const useLogout = () => {
	const navigate = useNavigate();
	return useCallback(() => {
		UsersApi.logout();
		Persistence.clear();
		navigate(login, {
			replace: true,
		});
	}, [navigate]);
};

export const Dashboard = () => {
	const accounts = useAccounts();
	const logout = useLogout();

	return (
		<>
			<BrandHeading />
			<ResponsiveLayout>
				<h2>Dashboard</h2>
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
