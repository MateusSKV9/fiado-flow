import { formatCurrency } from "@/utils";
import { Clock3 } from "lucide-react";

const recentSales = [
	{ name: "Maria Silva", date: "27/10/2026", id: "#0048", amount: 120 },
	{ name: "João Pereira", date: "27/10/2026", id: "#0047", amount: 86 },
	{ name: "Ana Costa", date: "26/10/2026", id: "#0046", amount: 60 },
	{ name: "Carlos Oliveira", date: "26/10/2026", id: "#0045", amount: 150 },
];

export function RecentSales() {
	return (
		<article id="vendas" className="h-full min-w-0 rounded-2xl border border-border/80 bg-surface p-5 shadow-sm">
			<div className="mb-5 flex items-center justify-between gap-3">
				<div>
					<h2 className="font-semibold text-foreground">Últimas vendas</h2>

					<p className="mt-1 text-xs text-muted">Movimentações recentes</p>
				</div>

				<a
					href="#vendas"
					className="shrink-0 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
				>
					Ver todas
				</a>
			</div>

			<div className="divide-y divide-border">
				{recentSales.map((sale) => (
					<div key={sale.id} className="flex items-center gap-3 py-4 first:pt-0 last:pb-0">
						<div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sidebar text-sm font-semibold text-sidebar-foreground">
							{sale.name
								.split(" ")
								.slice(0, 2)
								.map((part) => part[0])
								.join("")}
						</div>

						<div className="min-w-0 flex-1">
							<p className="truncate text-sm font-semibold text-foreground">{sale.name}</p>

							<p className="mt-1 flex items-center gap-1 text-xs text-muted">
								<Clock3 size={12} />
								{sale.date} · {sale.id}
							</p>
						</div>

						<div className="shrink-0 text-right">
							<p className="text-sm font-semibold text-foreground">{formatCurrency(sale.amount)}</p>

							<p className="mt-1 text-xs text-warning">Em aberto</p>
						</div>
					</div>
				))}
			</div>
		</article>
	);
}
