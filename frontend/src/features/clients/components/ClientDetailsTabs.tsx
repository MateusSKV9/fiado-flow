import { useState } from "react";
import { CreditCard, CalendarDays, History } from "lucide-react";
import { formatCurrency, formatDate } from "@/utils";
import type { Sale } from "@/features/sales";
import type { Payment } from "@/features/payments";
import { StatusBadge } from "./StatusBadge";

type Tab = "sales" | "payments" | "history";

export function ClientDetailsTabs({ sales, payments }: { sales: Sale[]; payments: Payment[] }) {
	const [activeTab, setActiveTab] = useState<Tab>("sales");

	const tabs = [
		{ id: "sales" as const, label: "Vendas", icon: CreditCard },
		{ id: "payments" as const, label: "Pagamentos", icon: CalendarDays },
		{ id: "history" as const, label: "Histórico", icon: History },
	];

	const sortedSales = [...sales].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	const sortedPayments = [...payments].sort((a, b) => b.date.localeCompare(a.date));

	return (
		<section className="space-y-4">
			<div className="flex gap-2 overflow-x-auto border-b border-border">
				{tabs.map((tab) => {
					const Icon = tab.icon;
					const isActive = activeTab === tab.id;

					return (
						<button
							key={tab.id}
							type="button"
							onClick={() => setActiveTab(tab.id)}
							className={`flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition ${
								isActive ? "border-brand-600 text-brand-700" : "border-transparent text-muted hover:text-foreground"
							}`}
						>
							<Icon size={16} />
							{tab.label}
						</button>
					);
				})}
			</div>

			<div className="overflow-x-auto rounded-xl border border-border bg-surface shadow-sm">
				{activeTab === "sales" && (
					<table className="w-full min-w-150 text-left text-sm">
						<thead className="border-b border-border bg-background text-xs text-muted">
							<tr>
								<th className="px-5 py-3 font-medium">Data</th>
								<th className="px-5 py-3 font-medium">Descrição</th>
								<th className="px-5 py-3 font-medium">Valor</th>
								<th className="px-5 py-3 font-medium">Status</th>
							</tr>
						</thead>

						<tbody className="divide-y divide-border">
							{sortedSales.map((sale) => (
								<tr key={sale.id} className="hover:bg-background/70">
									<td className="px-5 py-3">{formatDate(sale.date)}</td>
									<td className="px-5 py-3">Venda #{sale.number}</td>
									<td className="px-5 py-3 font-medium">{formatCurrency(sale.total)}</td>
									<td className="px-5 py-3">
										<StatusBadge status={sale.status} />
									</td>
								</tr>
							))}

							{sortedSales.length === 0 && (
								<tr>
									<td colSpan={4} className="px-5 py-10 text-center text-muted">
										Nenhuma venda encontrada para este cliente.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				)}

				{activeTab === "payments" && (
					<table className="w-full min-w-150 text-left text-sm">
						<thead className="border-b border-border bg-background text-xs text-muted">
							<tr>
								<th className="px-5 py-3 font-medium">Data</th>
								<th className="px-5 py-3 font-medium">Descrição</th>
								<th className="px-5 py-3 font-medium">Valor</th>
								<th className="px-5 py-3 font-medium">Status</th>
							</tr>
						</thead>

						<tbody className="divide-y divide-border">
							{sortedPayments.map((payment) => (
								<tr key={payment.id} className="hover:bg-background/70">
									<td className="px-5 py-3">{formatDate(payment.date)}</td>
									<td className="px-5 py-3">{payment.method || "Pagamento recebido"}</td>
									<td className="px-5 py-3 font-medium">{formatCurrency(Number(payment.amount))}</td>
									<td className="px-5 py-3">
										<StatusBadge status={payment.status ? "Cancelado" : "Pago"} />
									</td>
								</tr>
							))}

							{sortedPayments.length === 0 && (
								<tr>
									<td colSpan={4} className="px-5 py-10 text-center text-muted">
										Nenhum pagamento encontrado para este cliente.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				)}

				{activeTab === "history" && (
					<div className="divide-y divide-border">
						{[
							...sortedSales.map((sale) => ({
								id: `sale-${sale.id}`,
								date: sale.date,
								description: `Venda #${sale.number} realizada`,
								value: sale.total,
							})),
							...sortedPayments.map((payment) => ({
								id: `payment-${payment.id}`,
								date: payment.date,
								description: "Pagamento registrado",
								value: Number(payment.amount),
							})),
						]
							.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
							.map((event) => (
								<div key={event.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
									<div>
										<p className="text-sm font-medium text-foreground">{event.description}</p>
										<p className="mt-1 text-xs text-muted">{formatDate(event.date)}</p>
									</div>

									<span className="text-sm font-semibold text-foreground">{formatCurrency(event.value)}</span>
								</div>
							))}
					</div>
				)}
			</div>
		</section>
	);
}
