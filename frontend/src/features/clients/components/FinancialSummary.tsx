import { formatCurrency } from "@/utils";

export function FinancialSummary({
	totalOpen,
	totalPaid,
	totalPurchases,
}: {
	totalOpen: number;
	totalPaid: number;
	totalPurchases: number;
}) {
	const items = [
		{
			label: "Total em aberto",
			value: formatCurrency(totalOpen),
			valueClass: "text-brand-700",
		},
		{
			label: "Total pago",
			value: formatCurrency(totalPaid),
			valueClass: "text-emerald-600",
		},
		{
			label: "Total de compras",
			value: totalPurchases.toString(),
			valueClass: "text-foreground",
		},
	];

	return (
		<section className="rounded-xl border border-border bg-surface p-5 shadow-sm">
			<h2 className="border-b border-border pb-4 font-semibold text-foreground">Resumo financeiro</h2>

			<div className="grid grid-cols-1 gap-5 pt-5 sm:grid-cols-3 sm:divide-x sm:divide-border">
				{items.map((item) => (
					<div key={item.label} className="sm:px-4 first:sm:pl-0">
						<p className="text-xs text-muted">{item.label}</p>
						<p className={`mt-1 text-xl font-semibold ${item.valueClass}`}>{item.value}</p>
					</div>
				))}
			</div>
		</section>
	);
}
