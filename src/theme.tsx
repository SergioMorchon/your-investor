import { useLayoutEffect, useState } from "react";

export const useIsDarkMode = (): boolean => {
	const [isDarkMode, setIsDarkMode] = useState(false);

	useLayoutEffect(() => {
		if (!window.matchMedia) {
			return;
		}

		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const listener = () => {
			setIsDarkMode(mediaQuery.matches);
		};

		mediaQuery.addEventListener("change", listener);
		listener();

		return () => mediaQuery.removeEventListener("change", listener);
	}, []);

	return isDarkMode;
};
