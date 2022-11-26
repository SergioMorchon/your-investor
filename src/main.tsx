import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./pages/login";
import { SessionContextProvider } from "./session-context";
import { dashboard, login } from "./paths";
import { Dashboard } from "./pages/dashboard";
import { PrivateContent } from "./private-page";
import { ProfileContextProvider } from "./profile-context";

const router = createBrowserRouter([
	{
		path: dashboard,
		element: (
			<PrivateContent>
				<Dashboard />
			</PrivateContent>
		),
	},
	{
		path: login,
		element: <Login />,
	},
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<SessionContextProvider>
			<ProfileContextProvider>
				<RouterProvider router={router} />
			</ProfileContextProvider>
		</SessionContextProvider>
	</React.StrictMode>
);
