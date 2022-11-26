export interface Profile {
	readonly shortName: string;
	readonly fullName: string;
	readonly email: string;
	readonly phoneNumber: string | null;
}

export type State = Readonly<{
	profile: Profile | null;
	isLoading: boolean;
	error: string | null;
}>;

type Act<Type extends string, Payload extends object> = Readonly<{
	type: Type;
	payload: Payload;
}>;

export type Action =
	| Act<
			"set-is-loading",
			{
				isLoading: boolean;
			}
	  >
	| Act<
			"set-error",
			{
				error: string;
			}
	  >
	| Act<
			"set-profile",
			{
				profile: Profile;
			}
	  >;

export const reducer = (state: State, { type, payload }: Action): State => {
	switch (type) {
		case "set-is-loading": {
			return {
				...state,
				isLoading: payload.isLoading,
			};
		}
		case "set-error": {
			return {
				...state,
				error: payload.error,
			};
		}
		case "set-profile": {
			return {
				...state,
				profile: payload.profile,
			};
		}
	}
};
