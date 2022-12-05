import { globalStyle } from "@vanilla-extract/css";
import { vars } from "./vars.css";

globalStyle("html, body", {
	margin: 0,
	background: vars.colors.background,
	color: vars.colors.textPrimary,
});
