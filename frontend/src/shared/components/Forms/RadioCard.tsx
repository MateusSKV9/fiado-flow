interface RadioOption<T extends string> {
	label: string;
	value: T;
}

interface RadioCardProps<T extends string> {
	option: RadioOption<T>;
	selectedValue: T;
	onChange: (value: T) => void;
	name: string;
}

export function RadioCard<T extends string>({ option, selectedValue, onChange, name }: RadioCardProps<T>) {
	const isSelected = selectedValue === option.value;

	return (
		<label
			className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3.5 transition-all ${
				isSelected
					? "border-brand-600 bg-brand-50/50 text-foreground shadow-xs ring-1 ring-brand-600"
					: "border-border bg-surface hover:bg-surface-muted text-muted"
			}`}
		>
			<input
				type="radio"
				name={name}
				value={option.value}
				checked={isSelected}
				onChange={() => onChange(option.value)}
				className="sr-only"
			/>
			<span
				className={`flex h-4 w-4 items-center justify-center rounded-full border ${
					isSelected ? "border-brand-600 bg-brand-600 text-brand-foreground" : "border-border bg-surface"
				}`}
			>
				{isSelected && <span className="h-2 w-2 rounded-full bg-white" />}
			</span>
			<span className={`text-sm font-medium ${isSelected ? "text-brand-600 font-semibold" : ""}`}>{option.label}</span>
		</label>
	);
}
