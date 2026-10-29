import type { ComponentProps, ReactNode } from "react";

interface FormProps extends ComponentProps<"form"> {
	children: ReactNode;
}

export function Form({ className = "", children, ...props }: FormProps) {
	return (
		<form className={["space-y-5", className].join(" ")} {...props}>
			{children}
		</form>
	);
}
