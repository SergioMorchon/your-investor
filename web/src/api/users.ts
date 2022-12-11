import useSWR from "swr";
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
	readonly riesgoKYCMayor100: boolean | null;
	readonly generarOTPPSD2ResponseDto: OtpRequest | null;
}

export const loginPsd2 = (
	body: Readonly<{
		codigoOTPRecibido: string;
		codigoPeticionOTP: string | null;
		contrasena: string;
		cotitular: boolean;
		deviceId: string;
		plataforma: string;
		tipoLogin: LoginType;
		usuario: string;
	}>
): Promise<LoginResponse> =>
	callApi({ path: "public/usuarios/login-psd2", method: "post", body });

export const validateOtp = (
	body: Readonly<{
		usuario: string;
		deviceId: string;
		plataforma: string;
		codigoPeticionOTP: string;
		codigoOTPRecibido: string;
		cotitular: boolean;
		tipoLogin: LoginType;
		contrasena: string;
	}>
): Promise<CompletedLogin> =>
	callApi({ path: "public/usuarios/validar-otp", method: "post", body });

interface LogoutResponse {
	/** "0" */
	readonly codigoRespuesta: number;
	/** "Sesión cerrada correctamente" */
	readonly respuesta: string;
}

export const logout = (): Promise<LogoutResponse> =>
	callApi({ path: "protected/usuarios/logout", method: "post" });

export interface LoggedInUserData {
	readonly codigoRespuesta: null;
	readonly descripcion: null;
	readonly token: null;
	readonly usuario: string;
	readonly nomUsuario: string;
	readonly apeUsuario: string;
	readonly nifUsuario: string;
	readonly codTipoDocumento: "01" | string;
	readonly idUsuario: number;
	readonly usuariosEnum: null;
	readonly email: string;
	readonly numVersionWeb: string;
	readonly identificadorDispositivoFavorito: null;
	readonly tieneTokenUrbanitae: boolean;
	readonly emailUrbanitae: null;
	readonly usuarioUrbanitae: null;
	readonly codIdioma: "es" | string;
}

export const useLoggedInUserData = () =>
	useSWR<LoggedInUserData, Error>({
		path: "protected/usuarios/datos-usuario-logeado",
		method: "get",
	});

interface PersonalDataDto {
	readonly type: "DatosPersonalesDto" | string;
	readonly email: string;
	readonly emailTitular: null;
	readonly emailCo: null;
	readonly codigoPromocion: null;
	readonly tlfMovil: null;
	readonly dniNif: string;
	readonly codigoTipoDocumento: "01" | string;
	readonly fechaCaducidadDocumento: string;
	readonly vigenciaPermanente: boolean;
	readonly nombre: string;
	readonly primerApellido: string;
	readonly segundoApellido: string;
	readonly hombre: boolean;
	readonly mujer: boolean;
	readonly sexo: "H" | string;
	readonly codigoSexo: "H" | string;
	readonly fechaNacimiento: string;
	readonly paisNacimiento: string;
	readonly codigoPaisNacimiento: "011" | string;
	readonly telefonoContacto: string;
	readonly telefonoAdicionalContacto: null;
	readonly prefijoTelefono: string;
	readonly confirmacionEmail: null;
	readonly lugarNacimiento: string;
	readonly telefonaAdicionalContacto: null;
}

interface TaxationAddress {
	readonly pais: string;
	readonly codigoPais: string;
	readonly provincia: string;
	readonly codigoProvincia: string;
	readonly localidad: string;
	readonly tipoVia: string;
	readonly codigoTipoVia: string;
	readonly direccion: string;
	readonly numero: string;
	readonly pisoPuerta: string;
	readonly cp: string;
	readonly labelProvincia: string;
	readonly labelTipoVia: string;
}

interface TaxationData {
	readonly type: "DatosFiscalesDto";
	readonly email: null;
	readonly emailTitular: null;
	readonly emailCo: null;
	readonly codigoPromocion: null;
	readonly tlfMovil: null;
	readonly paisNacionalidad: string;
	readonly codigoPaisNacionalidad: "011" | string;
	readonly estadoCivil: string;
	readonly codigoEstadoCivil: "S" | string;
	readonly tipoActividad: string;
	readonly codigoTipoActividad: string;
	readonly nombreSector: string;
	readonly codigoSector: string;
	readonly profesion: string;
	readonly codigoProfesion: string;
	readonly direccionFiscalDto: TaxationAddress;
	readonly sector: string;
}

interface PostalAddress {
	readonly pais: string;
	readonly codigoPais: string;
	readonly provincia: string;
	readonly codigoProvincia: string;
	readonly localidad: string;
	readonly tipoVia: string;
	readonly codigoTipoVia: string;
	readonly direccion: string;
	readonly numero: string;
	readonly pisoPuerta: string;
	readonly cp: string;
	readonly labelProvincia: string;
	readonly labelTipoVia: string;
}

interface KnowYourClientForm {
	readonly type: "FormularioKYCDto";
	readonly email: null;
	readonly emailTitular: null;
	readonly emailCo: null;
	readonly codigoPromocion: null;
	readonly tlfMovil: null;
	readonly tipoActividad: string;
	readonly codigoTipoActividad: string;
	readonly rangosVentasCuentaPropia: null;
	readonly empresaEmpleadora: string;
	readonly funcionEmpresa: string;
	readonly estimacionIngresosRango: string;
	readonly sinActividad: string;
	readonly responsabilidadaPublica: boolean;
	readonly rentasTrabajo: boolean;
	readonly inferior300k: null;
	readonly importeAproximadoInversionInicial: number;
	readonly residenciaFiscalSpain: boolean;
	readonly idSectorKyc: number;
	readonly idActividadKyc: number;
	readonly nomSectorKyc: string;
	readonly nomActividadKyc: string;
	readonly tipoActividadAnterior: null;
	readonly nombreComercialEmpresa: null;
	readonly usPerson: boolean;
}

interface ContactData {
	readonly type: string;
	readonly email: string;
	readonly emailTitular: string;
	readonly emailCo: null;
	readonly codigoPromocion: null;
	readonly tlfMovil: string;
	readonly prefijoTelefono: string;
	readonly recibirInfoGrupo: boolean;
}

interface PrivacyTerms {
	readonly type: "LegalPoliticaPrivacidadDto";
	readonly email: null;
	readonly emailTitular: null;
	readonly emailCo: null;
	readonly codigoPromocion: null;
	readonly tlfMovil: null;
	readonly solicitarDatosTesoreria: boolean;
}

export interface ClientData {
	readonly datosPersonalesDto: PersonalDataDto;
	datosFiscalesDto: TaxationData;
	direccionCorrespondencia: PostalAddress;
	formularioKYCDto: KnowYourClientForm;
	datosContactoDto: ContactData;
	ibanCuentaOrigenFondo: string;
	legalPoliticaPrivacidadDto: PrivacyTerms;
	codRespuesta: "0" | string;
	respuesta: null;
	datosCompletos: boolean;
}

export const useClientData = () =>
	useSWR<ClientData, Error>({
		path: "protected/usuarios/datos-cliente",
		method: "get",
	});
