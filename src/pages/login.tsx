import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	CheckboxInput,
	Form,
	SelectInput,
	SubmitInput,
	TextInput,
} from "../common/fields";
import { ResponsiveLayout, Stack } from "../common/layout";
import { dashboard } from "../paths";
import { useSessionContext } from "../session-context";
import { wait } from "../utils";

const DNI = "dni" as const;
const NIF = "nif" as const;
const PASSPORT = "passport" as const;
const USER = "user" as const;

type LoginMethod = typeof DNI | typeof NIF | typeof PASSPORT | typeof USER;

const useRedirectToDashboardWhenLoggedIn = () => {
	const navigate = useNavigate();
	const { authorization } = useSessionContext();
	useEffect(() => {
		if (authorization) {
			navigate(dashboard, {
				replace: true,
			});
		}
	}, [authorization, navigate]);
};

type State = {
	method: LoginMethod;
	id: string;
	password: string;
	remember: boolean;
	isLoading: boolean;
	error?: string;
};

export const Login = () => {
	const { authorize } = useSessionContext();
	const [state, setState] = useState<State>({
		method: DNI,
		id: "",
		password: "",
		remember: false,
		isLoading: false,
	});

	useRedirectToDashboardWhenLoggedIn();

	const onSubmit = useCallback(async () => {
		setState({ ...state, isLoading: true });
		await wait(1_000);
		authorize("authorization bearer token");
	}, [authorize, state]);

	return (
		<ResponsiveLayout>
			<h2>Iniciar sesión</h2>
			<p>
				¡Bienvenido a YourInvestor! Introduyce tus datos para entrar a tu banca
				online.
			</p>
			<Form onSubmit={onSubmit}>
				<Stack space={16}>
					<SelectInput
						label="Usuario"
						name="user"
						value={state.method}
						disabled={state.isLoading}
						options={[DNI, NIF, PASSPORT, USER].map((method) => ({
							value: method,
							text: method,
						}))}
						onChange={(method) => setState({ ...state, method })}
						required
					/>
					<TextInput
						label="ID"
						name="id"
						value={state.id}
						disabled={state.isLoading}
						onChange={(id) => setState({ ...state, id })}
						required
					/>
					<TextInput
						label="Contraseña"
						name="password"
						value={state.password}
						disabled={state.isLoading}
						type="password"
						onChange={(password) => setState({ ...state, password })}
						required
					/>
					<CheckboxInput
						label="Recordar usuario"
						value={state.remember}
						disabled={state.isLoading}
						onChange={(remember) => setState({ ...state, remember })}
					/>
					<SubmitInput disabled={state.isLoading}>
						Verificar y entrar
					</SubmitInput>
				</Stack>
			</Form>
		</ResponsiveLayout>
	);
};
