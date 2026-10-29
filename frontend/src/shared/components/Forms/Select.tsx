import type { ComponentProps } from "react";

interface SelectProps extends ComponentProps<"select"> {
	hasError?: boolean;
}

export function Select({ hasError = false, className = "", children, ...props }: SelectProps) {
	return (
		<select
			{...props}
			aria-invalid={hasError || undefined}
			className={[
				"h-10 w-full rounded-lg border bg-surface px-3",
				"text-sm text-foreground outline-none transition",
				"focus:ring-2",
				hasError
					? "border-danger focus:border-danger focus:ring-danger/20"
					: "border-border focus:border-brand-500 focus:ring-brand-100",
				className,
			].join(" ")}
		>
			{children}
		</select>
	);
}
