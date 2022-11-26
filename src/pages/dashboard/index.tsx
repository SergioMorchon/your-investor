import { ResponsiveLayout } from "../../common/layout";
import { useFetchProfile, useProfileState } from "../../profile-context";
import { Profile } from "./profile";

export const Dashboard = () => {
	useFetchProfile();
	const profileState = useProfileState();

	return (
		<ResponsiveLayout>
			<h2>Profile</h2>
			{profileState.isLoading && "Loading..."}
			{profileState.error}
			{profileState.profile ? <Profile profile={profileState.profile} /> : null}
		</ResponsiveLayout>
	);
};
