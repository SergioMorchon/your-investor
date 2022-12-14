import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	CheckboxInput,
	Form,
	SelectInput,
	SubmitInput,
	TextInput,
} from "./common/fields";
import { ResponsiveLayout, Stack } from "./common/layout";
import { getDeviceId, getSessionToken, setSessionToken } from "./persistence";
import * as ApiUsers from "./api/users";
import { BrandHeading } from "./common/brand-heading";

const useRedirectToDashboardWhenLoggedIn = () => {
	const navigate = useNavigate();
	const token = getSessionToken();
	useEffect(() => {
		if (token) {
			navigate("/", {
				replace: true,
			});
		}
	}, [token, navigate]);
};

type State = Readonly<{
	method: ApiUsers.LoginType;
	id: string;
	password: string;
	otp: string;
	remember: boolean;
	isLoading: boolean;
	error?: string;
}>;

export const Login = () => {
	const [loginResponse, setLoginResponse] =
		useState<ApiUsers.LoginResponse | null>(null);
	const [state, setState] = useState<State>({
		method: ApiUsers.USER,
		id: "",
		password: "",
		otp: "",
		remember: false,
		isLoading: false,
	});
	useRedirectToDashboardWhenLoggedIn();

	const handleLogin = useCallback(async () => {
		setState({ ...state, isLoading: true });
		try {
			const response = await ApiUsers.loginPsd2({
				usuario: state.id,
				deviceId: getDeviceId(),
				plataforma: "browser",
				codigoPeticionOTP: null,
				codigoOTPRecibido: "",
				cotitular: false,
				tipoLogin: state.method,
				contrasena: state.password,
			});
			setLoginResponse(response);
			setState({ ...state, isLoading: false });

			if (response.loginFinalizadoDto) {
				setSessionToken(response.loginFinalizadoDto.token);
				return;
			}

			if (!response.generarOTPPSD2ResponseDto) {
				throw new Error(response.usuariosEnum);
			}
		} catch (error: any) {
			alert(`Login error: ${error.message}`);
		} finally {
			setState({ ...state, isLoading: false });
		}
	}, [state]);

	const handleOtpLogin = useCallback(async () => {
		if (!loginResponse?.generarOTPPSD2ResponseDto) {
			return;
		}

		setState({ ...state, isLoading: true });
		try {
			const response = await ApiUsers.validateOtp({
				usuario: state.id,
				deviceId: getDeviceId(),
				plataforma: "browser",
				codigoPeticionOTP:
					loginResponse.generarOTPPSD2ResponseDto.codigoPeticionOtp,
				codigoOTPRecibido: state.otp,
				cotitular: false,
				tipoLogin: state.method,
				contrasena: state.password,
			});
			setState({ ...state, isLoading: false });

			if (response.token) {
				setSessionToken(response.token);
				return;
			}

			throw new Error(response.descripcion);
		} catch (error: any) {
			alert(`Login error: ${error.message}`);
		} finally {
			setState({ ...state, isLoading: false });
		}
	}, [loginResponse?.generarOTPPSD2ResponseDto, state]);

	return (
		<>
			<BrandHeading />
			<ResponsiveLayout>
				<h2>Iniciar sesi??n</h2>
				<p>
					??Bienvenido a YourInvestor! Introduce tus datos para entrar a tu banca
					online.
				</p>
				<Form
					onSubmit={
						loginResponse?.generarOTPPSD2ResponseDto
							? handleOtpLogin
							: handleLogin
					}
				>
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
							label="Contrase??a"
							name="password"
							value={state.password}
							disabled={state.isLoading}
							type="password"
							onChange={(password) => setState({ ...state, password })}
							required
						/>
						{loginResponse?.generarOTPPSD2ResponseDto && (
							<TextInput
								label="C??digo SMS"
								name="otp"
								value={state.otp}
								disabled={state.isLoading}
								type="number"
								onChange={(otp) => setState({ ...state, otp })}
								required
							/>
						)}
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
		</>
	);
};
