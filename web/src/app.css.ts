import { style } from "@vanilla-extract/css";
import { vars } from "./vars.css";

const NAVIGATION_HEIGT = 80;

export const shell = style({
	display: "flex",
	flexDirection: "column",
});

export const content = style({
	overflowY: "auto",
	overflowX: "hidden",
	width: "100%",
	flexGrow: 1,
	paddingBottom: NAVIGATION_HEIGT,
});

export const navigation = style({
	position: "fixed",
	bottom: 0,
	height: NAVIGATION_HEIGT,
	width: "100%",
	display: "flex",
	gap: 8,
	alignItems: "center",
	justifyContent: "space-around",
	backgroundColor: vars.colors.background,
});

export const nagigationItem = style({
	textDecoration: "none",
	fontSize: 16,
	fontWeight: 600,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	color: vars.colors.buttonPrimary,
	":visited": {
		color: "inherit",
	},
});

export const navigationItemIcon = style({
	fontSize: 24,
});
