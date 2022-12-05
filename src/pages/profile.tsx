import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import * as Persistence from "../persistence";
import * as UsersApi from "../api/users";
import { Button } from "../common/fields";
import { PageContent } from "../common/page-content";

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
	return (
		<PageContent title="Perfil">
			<Button onPress={logout}>Desconectar</Button>
		</PageContent>
	);
};
