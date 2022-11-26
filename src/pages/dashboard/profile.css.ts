import { style } from "@vanilla-extract/css";

const fieldBase = style({
	fontSize: 16,
});

export const fieldLabel = style([
	fieldBase,
	style({
		color: "black",
	}),
]);

export const fieldContent = style([
	fieldLabel,
	style({
		fontWeight: 600,
	}),
]);
