import { Link } from "react-router-dom";
import type { ComponentProps, ReactNode } from "react";

type LinkVariant = "primary" | "secondary" | "outline" | "ghost" | "brand";
type LinkSize = "sm" | "md" | "lg";

// Estende as props nativas do Link do react-router-dom para maior flexibilidade
export interface LinkStyledProps extends ComponentProps<typeof Link> {
	variant?: LinkVariant;
	size?: LinkSize;
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
}

const variants: Record<LinkVariant, string> = {
	primary: "bg-brand-600 text-brand-foreground hover:bg-brand-700 shadow-sm border border-transparent",
	secondary: "bg-surface-muted text-foreground hover:bg-border border border-transparent",
	outline: "border border-border bg-surface text-foreground hover:bg-surface-muted",
	ghost: "border border-transparent text-muted hover:bg-surface-muted hover:text-foreground",
	brand: "border border-brand-100 bg-brand-50 text-brand-700 hover:bg-brand-100",
};

const sizes: Record<LinkSize, string> = {
	sm: "h-9 px-3 text-xs",
	md: "h-10 px-4 text-sm",
	lg: "h-11 px-5 text-sm",
};

export function LinkStyled({
	to,
	variant = "primary",
	size = "md",
	className = "",
	leftIcon,
	rightIcon,
	children,
	...props
}: LinkStyledProps) {
	return (
		<Link
			to={to}
			className={[
				"inline-flex items-center justify-center gap-2 rounded-lg",
				"font-semibold transition-colors",
				"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600",
				variants[variant],
				sizes[size],
				className,
			].join(" ")}
			{...props}
		>
			{leftIcon}
			{children}
			{rightIcon}
		</Link>
	);
}
