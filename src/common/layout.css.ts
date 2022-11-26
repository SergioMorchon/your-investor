import { createVar, style } from "@vanilla-extract/css";
import { desktop, mobile } from "./media-queries.css";

const MOBILE_SIDE_SPACE = 16;
const DESKTOP_SIDE_SPACE = 32;

export const responsiveLayout = style({
	width: "100%",
	margin: "auto",
	"@media": {
		[mobile]: {
			width: `calc(100% - ${MOBILE_SIDE_SPACE * 2}px)`,
			marginLeft: MOBILE_SIDE_SPACE,
			marginRight: MOBILE_SIDE_SPACE,
		},
		[desktop]: {
			width: `calc(100% - ${DESKTOP_SIDE_SPACE * 2}px)`,
			marginLeft: DESKTOP_SIDE_SPACE,
			marginRight: DESKTOP_SIDE_SPACE,
		},
	},
});

const stackSpace = createVar();

export const stack = style({
	display: "flex",
	flexDirection: "column",
	height: "100%",
	gap: stackSpace,
});

const inlineSpace = createVar();

export const inline = style({
	display: "flex",
	flexDirection: "row",
	width: "100%",
	gap: inlineSpace,
});

export const vars = { stackSpace, inlineSpace };
