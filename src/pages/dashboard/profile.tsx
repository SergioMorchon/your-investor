import { Stack } from "../../common/layout";
import type * as State from "../../profile-context/state";
import * as styles from "./profile.css";

type FieldProps = {
	label: string;
	children: React.ReactNode;
};

const Field = ({ label, children }: FieldProps) => (
	<Stack space={8}>
		<span className={styles.fieldLabel}>{label}</span>
		<span className={styles.fieldContent}>{children}</span>
	</Stack>
);

type Props = {
	profile: State.Profile;
};

export const Profile = ({ profile }: Props) => (
	<Stack space={16}>
		{[
			{ label: "Nombre completo", value: profile.fullName },
			{ label: "Email", value: profile.email },
			{ label: "Email", value: profile.phoneNumber },
		].map(({ label, value }) =>
			value ? (
				<Field key={label} label={label}>
					{value}
				</Field>
			) : null
		)}
	</Stack>
);
