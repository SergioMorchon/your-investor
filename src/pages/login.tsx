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
import { useLoginContext } from "../login-context";
import * as ApiUsers from "../api/users";

const useRedirectToDashboardWhenLoggedIn = () => {
	const navigate = useNavigate();
	const { completedLogin: loginResponse } = useLoginContext();
	useEffect(() => {
		if (loginResponse) {
			navigate(dashboard, {
				replace: true,
			});
		}
	}, [loginResponse, navigate]);
};

type State = {
	method: ApiUsers.LoginType;
	id: string;
	password: string;
	remember: boolean;
	isLoading: boolean;
	error?: string;
};

export const Login = () => {
	const { setCompletedLogin: setLoginResponse } = useLoginContext();
	const [state, setState] = useState<State>({
		method: ApiUsers.USER,
		id: "",
		password: "",
		remember: false,
		isLoading: false,
	});

	useRedirectToDashboardWhenLoggedIn();

	const onSubmit = useCallback(async () => {
		setState({ ...state, isLoading: true });
		try {
			const loginResponse = await ApiUsers.loginPsd2({
				usuario: state.id,
				deviceId: "🥓",
				plataforma: "browser",
				codigoPeticionOTP: null,
				codigoOTPRecibido: "",
				cotitular: false,
				tipoLogin: state.method,
				contrasena: state.password,
			});
			if (!loginResponse.loginFinalizadoDto) {
				throw new Error(loginResponse.usuariosEnum);
			}

			setLoginResponse(loginResponse.loginFinalizadoDto);
		} catch (error: any) {
			alert(`Login error: ${error.message}`);
			setState({ ...state, isLoading: false });
		}
	}, [setLoginResponse, state]);

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
						options={[
							ApiUsers.DNI,
							ApiUsers.NIE,
							ApiUsers.PASSPORT,
							ApiUsers.USER,
						].map((method) => ({
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
