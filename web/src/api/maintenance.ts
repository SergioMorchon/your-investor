import { callApi } from "../utils";

export interface MaintenanceStatus {
	codRespuesta: string;
	enMantenimeinto: boolean;
	hora_fin: any | null;
	hora_inicio: any | null;
	mantenimientoAppAndroid: boolean;
	mantenimientoAppIphone: boolean;
	mantenimientoWeb: boolean;
	mensaje: any | null;
	plataforma: any | null;
}

export const checkMaintenance = (): Promise<MaintenanceStatus> =>
	callApi("public/mantenimientos/check-mantenimiento", { method: "get" });
