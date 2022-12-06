import { PageContent } from "../common/page-content";
import { useResumeContext } from "../resume-context";
import { formatMoney } from "../utils";

export const Cash = () => {
	const { accounts, error } = useResumeContext();

	if (error) {
		return <p>{error}</p>;
	}

	if (!accounts) {
		return <p>Cargando...</p>;
	}

	return (
		<PageContent title="Efectivo">
			<ol>
				{accounts.cuentasEfectivo.map((account) => (
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
