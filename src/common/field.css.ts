import { style } from "@vanilla-extract/css";

const base = style({
	border: "solid 1px #9e9e9e",
	padding: "14px 16px",
	borderRadius: 8,
	fontSize: 14,
	selectors: {
		"&:focus": {
			outline: "none",
		},
	},
});

export const textInput = base;

export const selectInput = base;

export const checkboxInput = style([
	base,
	style({
		height: 14,
		width: 14,
	}),
]);

export const button = style({
	padding: "12px 5px",
	background: "#1c6fc9",
	color: "#fff",
	borderRadius: 24,
	border: "none",
});
