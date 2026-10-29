import type { ReactNode } from "react";

interface FormFieldProps {
	label: string;
	htmlFor: string;
	required?: boolean;
	error?: string;
	children: ReactNode;
}

export function FormField({ label, htmlFor, required = false, error, children }: FormFieldProps) {
	return (
		<div className="min-w-0 space-y-1.5">
			<label htmlFor={htmlFor} className="block text-sm font-medium text-foreground/90">
				{label}
				{required && (
					<span className="ml-1 text-danger" aria-hidden="true">
						*
					</span>
				)}
			</label>

			{children}

			{error && (
				<p className="text-xs text-danger" role="alert">
					{error}
				</p>
			)}
		</div>
	);
}
