import type { ComponentProps } from "react";

export function Textarea({ className = "", ...props }: ComponentProps<"textarea">) {
	return (
		<textarea
			{...props}
			className={[
				"w-full rounded-lg border border-border bg-surface",
				"px-3 py-2.5 text-sm text-foreground",
				"outline-none transition",
				"placeholder:text-muted/70",
				"focus:border-brand-500 focus:ring-2 focus:ring-brand-100",
				className,
			].join(" ")}
		/>
	);
}
