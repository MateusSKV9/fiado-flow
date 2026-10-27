import type { LucideIcon } from "lucide-react";

type SummaryCardProps = {
	title: string;
	value: string;
	description: string;
	icon: LucideIcon;
	color: "blue" | "green" | "red";
};

const colors = {
	blue: "bg-brand-50 text-brand-600",
	green: "bg-success-bg text-success",
	red: "bg-danger-bg text-danger",
} as const;

export function SummaryCard({ title, value, description, icon: Icon, color }: SummaryCardProps) {
	return (
		<article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:shadow-md">
			<div className="flex items-center justify-between gap-3">
				<p className="text-sm font-medium text-slate-500">{title}</p>
				<span className={`flex size-10 items-center justify-center rounded-xl ${colors[color]}`}>
					<Icon size={20} />
				</span>
			</div>

			<p className="mt-4 text-2xl font-bold tracking-tight text-slate-800">{value}</p>

			<p className="mt-2 text-xs text-slate-500">{description}</p>
		</article>
	);
}
