import { Stack } from "../common/layout";
import { PageContent } from "../common/page-content";
import { useInvestmentsContext } from "../investments-context";
import { useResumeContext } from "../resume-context";
import { formatMoney, formatPercentage } from "../utils";

export const Investments = () => {
	const { accounts, error: resumeError } = useResumeContext();
	const { investments, error: investmentsError } = useInvestmentsContext();

	if (resumeError || investmentsError) {
		return <p>{resumeError ?? investmentsError}</p>;
	}

	if (!accounts && !investments) {
		return <p>Cargando...</p>;
	}

	return (
		<PageContent title="Inversión">
			<Stack space={32}>
				<Stack space={16}>
					{investments && (
						<article>
							Inversión
							<ol>
								{investments.map(
									(
										{
											aliasCuenta,
											codigoCuenta,
											valorMercado,
											beneficio,
											rentabilidadTotal,
											totalInvertido,
											inversionesCuentaValores,
										},
										index
									) => (
										<li key={`${aliasCuenta}-${index}`}>
											{aliasCuenta} - {codigoCuenta}
											<dl>
												<dt>Valor de mercado</dt>
												<dd>{formatMoney(valorMercado)}</dd>
												<dt>Beneficio</dt>
												<dd>{formatMoney(beneficio)}</dd>
												<dt>Rentabilidad</dt>
												<dd>{formatPercentage(rentabilidadTotal / 100)}</dd>
												<dt>Inversión inicial</dt>
												<dd>{formatMoney(totalInvertido)}</dd>
												{inversionesCuentaValores?.FONDOS_INDEXADOS && (
													<>
														<dt>Fondos indexados</dt>
														<dd>
															<ol>
																{inversionesCuentaValores.FONDOS_INDEXADOS.inversionesDtoList.map(
																	(indexedInvestment) => (
																		<li key={indexedInvestment.isin}>
																			<dt>ISIN</dt>
																			<dd>{indexedInvestment.isin}</dd>
																			<dt>Nombre</dt>
																			<dd>
																				{indexedInvestment.nombreInversion}
																			</dd>
																			<dt>Inversión</dt>
																			<dd>
																				{formatMoney(
																					indexedInvestment.importeInicial
																				)}
																			</dd>
																			<dt>Valor de mercado</dt>
																			<dd>
																				{formatMoney(indexedInvestment.importe)}{" "}
																				(
																				{
																					indexedInvestment.fechaActualizacionRentabilidad
																				}
																				)
																			</dd>
																			<dt>Rentabilidad</dt>
																			<dd>
																				{formatPercentage(
																					indexedInvestment.rentabilidadTotal /
																						100
																				)}
																			</dd>
																		</li>
																	)
																)}
															</ol>
														</dd>
													</>
												)}
											</dl>
										</li>
									)
								)}
							</ol>
						</article>
					)}
					{accounts && accounts.cuentasPensiones.length > 0 && (
						<article>
							Cuentas de pensiones
							<ol>
								{accounts.cuentasPensiones.map((account) => (
									<li key={account.idCuenta}>
										{[
											account.aliasCuenta ?? account.codigoCuenta,
											formatMoney(account.importeCuenta),
										].join(": ")}
									</li>
								))}
							</ol>
						</article>
					)}
				</Stack>
			</Stack>
		</PageContent>
	);
};
