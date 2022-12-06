import { callApi } from "../utils";

export const DNI = "DNI" as const;
export const NIE = "NIE" as const;
export const PASSPORT = "PASAPORTE" as const;
export const USER = "USUARIO" as const;

export type LoginType = typeof DNI | typeof NIE | typeof PASSPORT | typeof USER;

type UsuariosEnum = "USUARIO_EXISTE_CPERF" | "USUARIO_NO_EXISTE" | string;

export interface CompletedLogin {
	/** "0" */
	readonly codigoRespuesta: "0" | "-1" | string;
	/** "Proceso Finalizado Correctamente. " */
	readonly descripcion: string;
	readonly token: string | null;
	readonly usuario: string | null;
	/** "SERGIO" */
	readonly nomUsuario: string | null;
	/** "MORCHÓN" */
	readonly apeUsuario: string | null;
	readonly nifUsuario: string | null;
	/** "01" */
	readonly codTipoDocumento: string | null;
	readonly idUsuario: number | null;
	/** "USUARIO_EXISTE_CPERF" */
	readonly usuariosEnum: UsuariosEnum | null;
	/** "sergio.morchon@outlook.com" */
	readonly email: string | null;
	/** "2.121.7-pro" */
	readonly numVersionWeb: string | null;
	/** null */
	readonly identificadorDispositivoFavorito: any | null;
	/** false */
	readonly tieneTokenUrbanitae: boolean | null;
	/** null */
	readonly emailUrbanitae: any | null;
	/** null */
	readonly usuarioUrbanitae: any | null;
	/** "es" */
	readonly codIdioma: string | null;
}

type OtpType = "SMS" | string;

export interface OtpRequest {
	/* "0" */
	readonly codigoRespuesta: string;
	/* "PROCESO FINALIZADO CON ÉXITO" */
	readonly respuesta: string;
	/* null */
	readonly estado: null;
	/* "QPZ2PMDC" */
	readonly codigoPeticionOtp: string;
	/* "SMS" */
	readonly medioEnvioOtpEnum: OtpType;
	/* "******000 */
	readonly contactoCliente: string;
}

export interface LoginResponse {
	/** "0" */
	readonly codigoRespuesta: string | null;
	/** "Proceso Finalizado Correctamente. " */
	readonly descripcion: string | null;
	readonly nombreUsuario: string | null;
	readonly idUsuario: number | null;
	/** "USUARIO_EXISTE_CPERF" */
	readonly usuariosEnum: string;
	/** null */
	readonly codigoPeticionOTP: any | null;
	readonly loginFinalizadoDto: CompletedLogin | null;
	readonly fechaUltimoKYC: "16/04/2021" | null;
	readonly riesgoKYCMayor100: false | null;
	readonly generarOTPPSD2ResponseDto: OtpRequest | null;
}

export const loginPsd2 = (body: {
	codigoOTPRecibido: string;
	codigoPeticionOTP: string | null;
	contrasena: string;
	cotitular: boolean;
	deviceId: string;
	plataforma: string;
	tipoLogin: LoginType;
	usuario: string;
}): Promise<LoginResponse> =>
	callApi("public/usuarios/login-psd2", { body, method: "post" });

export const validateOtp = (body: {
	usuario: string;
	deviceId: string;
	plataforma: string;
	codigoPeticionOTP: string;
	codigoOTPRecibido: string;
	cotitular: boolean;
	tipoLogin: LoginType;
	contrasena: string;
}): Promise<CompletedLogin> =>
	callApi("public/usuarios/validar-otp", { body, method: "post" });

interface LogoutResponse {
	/** "0" */
	readonly codigoRespuesta: number;
	/** "Sesión cerrada correctamente" */
	readonly respuesta: string;
}

export const logout = (): Promise<LogoutResponse> =>
	callApi("protected/usuarios/logout", { method: "post" });
