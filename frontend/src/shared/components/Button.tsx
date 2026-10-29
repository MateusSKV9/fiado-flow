import type { ComponentProps, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "brand";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ComponentProps<"button"> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
}

const variants: Record<ButtonVariant, string> = {
	primary: "bg-brand-600 text-brand-foreground hover:bg-brand-700 shadow-sm",
	secondary: "bg-surface-muted text-foreground hover:bg-border",
	outline: "border-border bg-surface text-foreground hover:bg-surface-muted",
	ghost: "border-transparent text-muted hover:bg-surface-muted hover:text-foreground",
	// Nova variante utilizando exatamente as tuas variáveis do @theme
	brand: "border-brand-100 bg-brand-50 text-brand-700 hover:bg-brand-100",
};

const sizes: Record<ButtonSize, string> = {
	sm: "h-9 px-3 text-xs",
	md: "h-10 px-4 text-sm",
	lg: "h-11 px-5 text-sm",
};

export function Button({
	variant = "primary",
	size = "md",
	leftIcon,
	rightIcon,
	className = "",
	type = "button",
	children,
	...props
}: ButtonProps) {
	return (
		<button
			type={type}
			className={[
				"inline-flex items-center justify-center gap-2 rounded-lg border",
				"font-semibold transition-colors",
				"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600",
				"disabled:pointer-events-none disabled:opacity-50",
				variants[variant],
				sizes[size],
				className,
			].join(" ")}
			{...props}
		>
			{leftIcon}
			{children}
			{rightIcon}
		</button>
	);
}
