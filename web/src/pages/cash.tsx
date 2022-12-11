import { useAccounts } from "../api/resume";
import { PageContent } from "../common/page-content";
import { formatMoney } from "../utils";

export const Cash = () => {
	const accountsState = useAccounts();

	if (accountsState.error) {
		console.error(accountsState.error);
		return <p>{accountsState.error.message}</p>;
	}

	if (!accountsState.data) {
		return <p>Cargando...</p>;
	}

	return (
		<PageContent title="Efectivo">
			<ol>
				{accountsState.data.cuentasEfectivo.map((account) => (
					<li key={account.idCuenta}>
						{[
							account.aliasCuenta ?? account.codigoCuenta,
							formatMoney(account.importeCuenta),
						].join(": ")}
					</li>
				))}
			</ol>
		</PageContent>
	);
};
