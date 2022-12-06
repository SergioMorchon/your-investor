import { ReactNode } from "react";
import { ResponsiveLayout } from "./layout";
import * as styles from "./page-content.css";

type Props = {
	title: string;
	children: ReactNode;
};

export const PageContent = ({ title, children }: Props) => (
	<ResponsiveLayout>
		<h2 className={styles.header}>{title}</h2>
		{children}
	</ResponsiveLayout>
);
