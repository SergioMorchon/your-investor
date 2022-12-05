import { style } from "@vanilla-extract/css";

export const shell = style({
	height: "100vh",
	display: "flex",
	flexDirection: "column",
});

export const content = style({
	overflowY: "auto",
	width: "100%",
	flexGrow: 1,
});

export const navigation = style({
	display: "flex",
	gap: 8,
	margin: 16,
	justifyContent: "space-around",
});

export const nagigationItem = style({
	textDecoration: "none",
	fontSize: 16,
	fontWeight: 600,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
});

export const navigationItemIcon = style({
	fontSize: 24,
});
