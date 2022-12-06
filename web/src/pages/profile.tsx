import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import * as Persistence from "../persistence";
import * as UsersApi from "../api/users";
import { Button } from "../common/fields";
import { PageContent } from "../common/page-content";
import { useUserContext } from "../user-context";

const useLogout = () => {
	const navigate = useNavigate();
	return useCallback(() => {
		UsersApi.logout();
		Persistence.clear();
		navigate(0);
	}, [navigate]);
};

export const Profile = () => {
	const logout = useLogout();
	const { loggedInUserData, clientData, error } = useUserContext();

	if (!error && !loggedInUserData) {
		return <p>Cargando...</p>;
	}

	return (
		<PageContent title="Perfil">
			{error}
			{!loggedInUserData && !error && "Cargando..."}
			{loggedInUserData && clientData && (
				<dl>
					<dt>Email</dt>
					<dd>{clientData.datosPersonalesDto.email}</dd>
					<dt>Teléfono de contacto</dt>
					<dd>
						{[
							clientData.datosPersonalesDto.prefijoTelefono,
							clientData.datosPersonalesDto.telefonoContacto,
						].join(" ")}
					</dd>
					<dt>Nombre completo</dt>
					<dd>
						{[
							clientData.datosPersonalesDto.nombre,
							clientData.datosPersonalesDto.primerApellido,
							clientData.datosPersonalesDto.segundoApellido,
						].join(" ")}
					</dd>
					<dt>Fecha de nacimiento</dt>
					<dd>{clientData.datosPersonalesDto.fechaNacimiento}</dd>
					<dt>Lugar de nacimiento</dt>
					<dd>{clientData.datosPersonalesDto.lugarNacimiento}</dd>
					<dt>Versión</dt>
					<dd>{loggedInUserData.numVersionWeb}</dd>
				</dl>
			)}
			<Button onPress={logout}>Desconectar</Button>
		</PageContent>
	);
};
