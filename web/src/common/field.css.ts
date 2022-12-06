import { style } from "@vanilla-extract/css";
import { vars } from "../vars.css";

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
	":disabled": {
		backgroundColor: vars.colors.controlDisabledBackground,
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
	padding: "8px 16px",
	background: vars.colors.buttonPrimaryBackground,
	color: vars.colors.buttonPrimary,
	borderRadius: 24,
	border: "none",
	cursor: "pointer",

	":disabled": {
		backgroundColor: vars.colors.controlDisabledBackground,
	},
});
