import { createThemeContract } from "@vanilla-extract/css";

export const vars = createThemeContract({
	colors: {
		background: "",
		text: {
			primary: "",
		},
		button: {
			primary: {
				background: "",
				text: "",
			},
		},
	},
});
