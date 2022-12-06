import { callApi } from "../utils";

interface InvestmentDto {
	readonly idCuenta: number;
	readonly tipoProductoEnumInversion: string;
	readonly codigoTipoProducto: string;
	readonly codigoMercado: string;
	readonly isin: string;
	readonly idFondo: number;
	readonly nombreInversion: string;
	readonly importeInicial: number;
	readonly inversionInicial: number;
	readonly importe: number;
	readonly valorMercado: number;
	readonly importeInversionPlusvalias: number;
	readonly importePlusvalia: number;
	readonly rentabilidadPlusvalias: number;
	readonly beneficio: number;
	readonly rentabilidadTotal: number;
	readonly rentabilidadTotalYTD: number;
	readonly participaciones: number;
	readonly participacionesDisponibles: number;
	readonly costeMedio: number;
	readonly valorLiquidativo: number;
	readonly valorLiquidativoDivisaOrigen: number;
	readonly divisaValorLiquidativo: string;
	readonly rentabilidadYTDFondo: number;
	readonly rentabilidadYearUnoFondo: number;
	readonly rentabilidadYearTresFondo: number;
	readonly rentabilidadYearCincoFondo: number;
	readonly categoriaMyInvestor: string;
	readonly urlFichaFondo: string;
	readonly activosAcciones: null;
	readonly activosObligaciones: null;
	readonly activosEfectivo: null;
	readonly activosOtro: null;
	readonly rentabilidadYearUno: null;
	readonly rentabilidadYearTres: null;
	readonly fechaActualizacionRentabilidad: string;
	readonly posicionesTipoSaldo: null;
	readonly tieneErrorPlusvalias: boolean;
	readonly codigoTipoActivo: "III" | string;
	readonly tipoProductoBrokerEnum: null;
	readonly impMinSubsSucesivas: string;
}

export interface Investment {
	readonly aliasCuenta: string;
	readonly uuidCuenta: string;
	readonly codigoCuentaExterna: string;
	readonly ibanCuenta: null;
	readonly ibanOrigen: null;
	readonly tipoCuentaEnum: "VALORES" | string;
	readonly importeCuenta: number;
	readonly activa: boolean;
	readonly tieneCotitular: boolean;
	readonly mensajeEnum: null;
	readonly idCuenta: number;
	readonly codigoCuenta: string;
	readonly titulares: null;
	readonly tipoAperturaCuentaEnum: "UN_TITULAR" | string;
	readonly idCuentaEfectivo: number;
	readonly estadoCuentaEnum: null;
	readonly inversionesCuentaValores: {
		readonly FONDOS_INDEXADOS: {
			readonly numProductos: number;
			readonly importeTotal: number;
			readonly inversionesDtoList: readonly InvestmentDto[];
		} | null;
	} | null;
	readonly beneficio: number;
	readonly totalInvertido: number;
	readonly valorMercado: number;
	readonly rentabilidadTotal: number;
	readonly beneficioFondos: number;
	readonly totalInvertidoFondos: number;
	readonly valorMercadoFondos: number;
	readonly rentabilidadTotalFondos: number;
	readonly beneficioAcciones: number;
	readonly totalInvertidoAcciones: number;
	readonly valorMercadoAcciones: number;
	readonly rentabilidadTotalAcciones: number;
	readonly traspasosEnTramite: null;
	readonly saldoCuentaEfectivo: number;
	readonly retencionesSaldoCuenta: number;
	readonly importeInversionAlcanzado: null;
	readonly hechasTodasInversiones: null;
	readonly tieneQueHacerAportacion: null;
	readonly inversionPlusvalias: number;
	readonly plusvalias: number;
	readonly rentabilidadPlusvalias: number;
	readonly inversionAcumulada: null;
	readonly plusvaliasAcumuladas: null;
	readonly codigoCuentaEfectivoExternaAsociada: string;
	readonly codigoCuentaEfectivoAsociada: string;
	readonly ibanCuentaEfectivoAsociada: string;
	readonly tienenFondosPlusvalias: true;
	readonly nombreCartera: null;
	readonly imageCartera: null;
	readonly tipoPerfilIndexadasEnum: null;
	readonly idRenta: null;
}

export type Investments = readonly Investment[];

export const investments = (params?: {
	onlyWallets?: boolean;
	onlyActive?: boolean;
}): Promise<Investments> =>
	callApi(
		`protected/inversiones?soloCarteras=${
			params?.onlyWallets ?? false
		}&soloActivas=${params?.onlyActive ?? false}`,
		{
			method: "get",
		}
	);
