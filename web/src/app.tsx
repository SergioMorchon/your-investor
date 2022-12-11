import { SWRConfig } from "swr";
import { BrandHeading } from "./common/brand-heading";
import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import { Profile } from "./pages/profile";
import { Investments } from "./pages/investments";
import { Cash } from "./pages/cash";
import * as styles from "./app.css";
import { callApi } from "./utils";
import { localStorageProvider } from "./persistence";

const sections = [
	{
		path: "cash",
		element: <Cash />,
		text: "Efectivo",
		icon: "💶",
	},
	{
		path: "investments",
		element: <Investments />,
		text: "Inversión",
		icon: "📈",
	},
	{
		path: "profile",
		element: <Profile />,
		text: "Perfil",
		icon: "👤",
	},
];

export const App = () => (
	<div className={styles.shell}>
		<div className={styles.content}>
			<BrandHeading />
			<SWRConfig
				value={{
					provider: localStorageProvider,
					fetcher: callApi,
					dedupingInterval: Infinity,
				}}
			>
				<Routes>
					{sections.map(({ path, element }) => (
						<Route key={path} path={path} element={element} />
					))}
					<Route
						path="/"
						element={<Navigate to={sections[0].path} replace />}
					/>
				</Routes>
			</SWRConfig>
		</div>
		<nav className={styles.navigation}>
			{sections.map(({ path, text, icon }) => (
				<NavLink key={text} className={styles.nagigationItem} to={path}>
					<div className={styles.navigationItemIcon}>{icon}</div>
					{text}
				</NavLink>
			))}
		</nav>
	</div>
);
