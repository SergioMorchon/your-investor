import { callApi } from "../utils";

export interface MaintenanceStatus {
	readonly codRespuesta: string;
	readonly enMantenimeinto: boolean;
	readonly hora_fin: any | null;
	readonly hora_inicio: any | null;
	readonly mantenimientoAppAndroid: boolean;
	readonly mantenimientoAppIphone: boolean;
	readonly mantenimientoWeb: boolean;
	readonly mensaje: any | null;
	readonly plataforma: any | null;
}

export const checkMaintenance = (): Promise<MaintenanceStatus> =>
	callApi("public/mantenimientos/check-mantenimiento", { method: "get" });
