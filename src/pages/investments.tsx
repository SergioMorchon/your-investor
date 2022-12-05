import { Stack } from "../common/layout";
import { PageContent } from "../common/page-content";
import { useResumeContext } from "../resume-context";
import { formatMoney } from "../utils";

export const Investments = () => {
	const { accounts, error } = useResumeContext();

	if (error) {
		return <p>{error}</p>;
	}

	if (!accounts) {
		return <p>Cargando...</p>;
	}

	return (
		<PageContent title="Inversión">
			<Stack space={32}>
				<Stack space={16}>
					{[
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
											formatMoney(account.importeCuenta),
										].join(": ")}
									</li>
								))}
							</ol>
						</article>
					))}
				</Stack>
			</Stack>
		</PageContent>
	);
};
