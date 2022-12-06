import ReactDOM from "react-dom/client";
import "./main.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./login";
import { App } from "./app";
import { PrivateContent } from "./private-page";
import { ThemeContextProvider } from "./theme-context-provider";

const router = createBrowserRouter([
	{
		index: true,
		path: "/*",
		element: (
			<PrivateContent>
				<App />
			</PrivateContent>
		),
	},
	{
		path: "/login",
		element: <Login />,
	},
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<ThemeContextProvider>
		<RouterProvider router={router} />
	</ThemeContextProvider>
);
