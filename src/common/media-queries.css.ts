const DESKTOP_WIDTH = 600;
const DESKTOP_HEIGHT = 800;

export const mobile =
	`only screen and (max-width: ${DESKTOP_WIDTH - 1}px), ` +
	`(max-height: ${DESKTOP_HEIGHT - 1}px)`;

export const desktop =
	`only screen and (min-width: ${DESKTOP_WIDTH}px), ` +
	`(min-height: ${DESKTOP_HEIGHT}px)`;
