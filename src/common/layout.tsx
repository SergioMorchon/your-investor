import { assignInlineVars } from "@vanilla-extract/dynamic";
import * as styles from "./layout.css";

type ResponsiveLayoutProps = {
	children: React.ReactNode;
};

export const ResponsiveLayout = ({ children }: ResponsiveLayoutProps) => (
	<div className={styles.responsiveLayout}>{children}</div>
);

type StackProps = {
	space: number;
	children: React.ReactNode;
};

export const Stack = ({ space, children }: StackProps) => (
	<div
		className={styles.stack}
		style={assignInlineVars({
			[styles.vars.stackSpace]: `${space}px`,
		})}
	>
		{children}
	</div>
);

type InlineProps = {
	space: number;
	children: React.ReactNode;
};

export const Inline = ({ space, children }: InlineProps) => (
	<div
		className={styles.inline}
		style={assignInlineVars({
			[styles.vars.inlineSpace]: `${space}px`,
		})}
	>
		{children}
	</div>
);
