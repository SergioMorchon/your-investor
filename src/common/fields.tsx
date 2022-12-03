import { Inline, Stack } from "./layout";
import * as styles from "./field.css";

type InputProps<Value extends string | boolean = string> = {
	label: string;
	name?: string;
	value: Value;
	disabled?: boolean;
	required?: boolean;
	onChange: (value: Value) => void;
};

type TextInputProps = InputProps & {
	type?: "text" | "password" | "number";
	password?: boolean;
};

export const TextInput = ({
	label,
	type,
	onChange,
	...props
}: TextInputProps) => (
	<label>
		<Stack space={8}>
			{label}
			<input
				className={styles.textInput}
				type={type}
				onChange={(e) => onChange(e.target.value)}
				{...props}
			/>
		</Stack>
	</label>
);

type SelectInputProps<Value extends string> = InputProps<Value> & {
	options: ReadonlyArray<
		Readonly<{
			text: string;
			value: Value;
		}>
	>;
};

export const SelectInput = <Value extends string>({
	label,
	options,
	onChange,
	...props
}: SelectInputProps<Value>) => (
	<label>
		<Stack space={8}>
			{label}
			<select
				className={styles.selectInput}
				onChange={(e) => onChange(e.target.value as Value)}
				{...props}
			>
				{options.map(({ text, value }) => (
					<option key={value}>{text}</option>
				))}
			</select>
		</Stack>
	</label>
);

type CheckboxInputProps = InputProps<boolean>;

export const CheckboxInput = ({
	label,
	onChange,
	value,
	...props
}: CheckboxInputProps) => (
	<label>
		<Inline space={8}>
			<input
				className={styles.checkboxInput}
				type="checkbox"
				checked={value}
				onChange={(e) => onChange(e.target.checked)}
				{...props}
			/>
			{label}
		</Inline>
	</label>
);

type SubmitInputProps = {
	children: string;
	disabled?: boolean;
};

export const SubmitInput = ({ children, disabled }: SubmitInputProps) => (
	<input
		className={styles.button}
		type="submit"
		disabled={disabled}
		value={children}
	/>
);

type ButtonProps = {
	children: string;
	disabled?: boolean;
	onPress: () => void;
};

export const Button = ({ onPress, children, disabled }: ButtonProps) => (
	<button className={styles.button} onClick={onPress} disabled={disabled}>
		{children}
	</button>
);

type FormProps = {
	children: React.ReactNode;
	onSubmit: () => Promise<void>;
};

export const Form = ({ children, onSubmit }: FormProps) => (
	<form
		onSubmit={(e) => {
			e.preventDefault();
			onSubmit();
		}}
	>
		{children}
	</form>
);
