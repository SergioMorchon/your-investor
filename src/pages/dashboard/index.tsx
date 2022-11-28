import { ResponsiveLayout } from "../../common/layout";
import { useFetchProfile, useProfileState } from "../../profile-context";
import { useSessionContext } from "../../session-context";
import { Profile } from "./profile";

export const Dashboard = () => {
	useFetchProfile();
	const profileState = useProfileState();
	const { logout } = useSessionContext();

	return (
		<ResponsiveLayout>
			<h2>Profile</h2>
			{profileState.isLoading && "Loading..."}
			{profileState.error}
			{profileState.profile ? <Profile profile={profileState.profile} /> : null}
			<button onClick={logout}>Desconectar</button>
		</ResponsiveLayout>
	);
};
