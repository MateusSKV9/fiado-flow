import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLElement> {
	padding?: "sm" | "md" | "lg";
}

const paddings = {
	sm: "p-4",
	md: "p-5",
	lg: "p-6 md:p-8",
};

export function Section({ padding = "md", className = "", children, ...props }: CardProps) {
	return (
		<section
			className={["rounded-xl border border-border bg-surface shadow-sm", paddings[padding], className].join(" ")}
			{...props}
		>
			{children}
		</section>
	);
}
