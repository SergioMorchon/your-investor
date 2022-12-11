import useSWR from "swr";

export type AccountType = "EFECTIVO" | "VALORES" | "PENSIONES" | string;

export interface CashAccount {
	readonly aliasCuenta: null;
	readonly uuidCuenta: null;
	readonly codigoCuentaExterna: string;
	readonly ibanCuenta: string;
	readonly ibanOrigen: null;
	readonly tipoCuentaEnum: AccountType;
	readonly importeCuenta: number;
	readonly activa: boolean;
	readonly tieneCotitular: boolean;
	readonly mensajeEnum: null;
	readonly idCuenta: number;
	readonly codigoCuenta: string;
	readonly titulares: null;
	readonly tipoAperturaCuentaEnum: null;
	readonly idCuentaEfectivo: null;
	readonly estadoCuentaEnum: null;
	readonly idCuentaValores: null;
	readonly tarjetasAsociadas: null;
	readonly retencionesSaldoCuenta: null;
	readonly importeTotalTransferenciasPeriodicasMayorSaldoCuenta: boolean;
	readonly importeInversionAlcanzado: null;
	readonly hechasTodasInversiones: null;
}

export interface SecurityAccount {
	readonly aliasCuenta: null;
	readonly uuidCuenta: null;
	readonly codigoCuentaExterna: string;
	readonly ibanCuenta: string;
	readonly ibanOrigen: null;
	readonly tipoCuentaEnum: AccountType;
	readonly importeCuenta: number;
	readonly activa: boolean;
	readonly tieneCotitular: boolean;
	readonly mensajeEnum: null;
	readonly idCuenta: number;
	readonly codigoCuenta: string;
	readonly titulares: null;
	readonly tipoAperturaCuentaEnum: null;
	readonly idCuentaEfectivo: null;
	readonly estadoCuentaEnum: null;
	readonly inversionesCuentaValores: null;
	readonly beneficio: null;
	readonly totalInvertido: null;
	readonly valorMercado: null;
	readonly rentabilidadTotal: null;
	readonly beneficioFondos: null;
	readonly totalInvertidoFondos: null;
	readonly valorMercadoFondos: null;
	readonly rentabilidadTotalFondos: null;
	readonly beneficioAcciones: null;
	readonly totalInvertidoAcciones: null;
	readonly valorMercadoAcciones: null;
	readonly rentabilidadTotalAcciones: null;
	readonly traspasosEnTramite: null;
	readonly saldoCuentaEfectivo: number;
	readonly retencionesSaldoCuenta: null;
	readonly importeInversionAlcanzado: null;
	readonly hechasTodasInversiones: null;
	readonly tieneQueHacerAportacion: null;
	readonly inversionPlusvalias: null;
	readonly plusvalias: null;
	readonly rentabilidadPlusvalias: null;
	readonly inversionAcumulada: null;
	readonly plusvaliasAcumuladas: null;
	readonly codigoCuentaEfectivoExternaAsociada: null;
	readonly codigoCuentaEfectivoAsociada: null;
	readonly ibanCuentaEfectivoAsociada: string;
	readonly tienenFondosPlusvalias: boolean;
	readonly nombreCartera: null;
	readonly imageCartera: null;
	readonly tipoPerfilIndexadasEnum: null;
	readonly idRenta: null;
}

export interface RetirementAccount {
	readonly aliasCuenta: null;
	readonly uuidCuenta: null;
	readonly codigoCuentaExterna: null;
	readonly ibanCuenta: null;
	readonly ibanOrigen: null;
	readonly tipoCuentaEnum: AccountType;
	readonly importeCuenta: number;
	readonly activa: null;
	readonly tieneCotitular: null;
	readonly mensajeEnum: null;
	readonly idCuenta: number;
	readonly codigoCuenta: string;
	readonly titulares: null;
	readonly tipoAperturaCuentaEnum: null;
	readonly idCuentaEfectivo: null;
	readonly estadoCuentaEnum: null;
	readonly numPlanes: number;
	readonly numPlanesValorados: number;
	readonly numPlanesConOrdenesPendientes: number;
	readonly listPlanesSinValorarNiOrdenes: null;
}

export interface Accounts {
	readonly cuentasEfectivo: readonly CashAccount[];
	readonly cuentasValores: readonly SecurityAccount[];
	readonly cuentasPensiones: readonly RetirementAccount[];
}

export const useAccounts = () =>
	useSWR<Accounts, Error>({ path: "protected/resume/cuentas", method: "get" });
