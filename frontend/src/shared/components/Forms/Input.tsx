import type { ComponentProps } from "react";

interface InputProps extends ComponentProps<"input"> {
	hasError?: boolean;
}

export function Input({ hasError = false, className = "", ...props }: InputProps) {
	return (
		<input
			{...props}
			aria-invalid={hasError || undefined}
			className={[
				"h-10 w-full rounded-lg border bg-surface px-3",
				"text-sm text-foreground outline-none transition",
				"placeholder:text-muted/70",
				"focus:ring-2",
				hasError
					? "border-danger focus:border-danger focus:ring-danger/20"
					: "border-border focus:border-brand-500 focus:ring-brand-100",
				className,
			].join(" ")}
		/>
	);
}
