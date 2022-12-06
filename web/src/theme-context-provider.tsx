import { assignInlineVars } from "@vanilla-extract/dynamic";
import { createContext, ReactNode, useMemo } from "react";
import { useIsDarkMode } from "./theme";
import { darkColors, lightColors } from "./theme.css";
import { vars } from "./vars.css";

export interface Theme {
	colors: typeof darkColors | typeof lightColors;
}

const ThemeContext = createContext<Theme | null>(null);

type Props = {
	children: ReactNode;
};

export const ThemeContextProvider = ({ children }: Props) => {
	const isDarkMode = useIsDarkMode();
	const theme: Theme = useMemo(
		() => ({
			colors: isDarkMode ? lightColors : darkColors,
		}),
		[isDarkMode]
	);
	const themeVars = assignInlineVars(vars, { colors: theme.colors });
	return (
		<ThemeContext.Provider value={theme}>
			<style>{`:root {${themeVars}}`}</style>
			{children}
		</ThemeContext.Provider>
	);
};
