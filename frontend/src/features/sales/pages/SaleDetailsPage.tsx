import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Package, CreditCard } from "lucide-react";
import { mockPayments, mockSales } from "@/mocks";
import { Card } from "@/shared";
import { formatCurrency, formatDate } from "@/utils";

export default function SaleDetailsPage() {
	const { id } = useParams<{ id: string }>();

	const sale = mockSales.find((item) => String(item.id) === id);

	if (!sale) {
		return (
			<div className="mx-auto max-w-7xl p-5 md:p-8">
				<Card>
					<p className="text-center text-muted">Venda não encontrada.</p>

					<div className="mt-4 text-center">
						<Link to="/sales" className="text-sm font-medium text-brand-600 hover:underline">
							Voltar para vendas
						</Link>
					</div>
				</Card>
			</div>
		);
	}

	// Pagamentos associados à venda
	const salePayments = mockPayments.filter((payment) => payment.saleId === sale.id);

	// Cálculo financeiro
	const totalPaid = salePayments.reduce((sum, payment) => sum + Number(payment.amount), 0);

	const total = Number(sale.total);
	const balance = total - totalPaid;

	// Status calculado com base nos valores
	const status = totalPaid === 0 ? "Em aberto" : balance <= 0 ? "Pago" : "Parcial";

	const statusClass = {
		"Em aberto": "bg-danger-bg text-danger",
		Parcial: "bg-warning-bg text-warning",
		Pago: "bg-success-bg text-success",
	}[status];

	return (
		<div className="mx-auto w-full max-w-7xl space-y-5 p-5 md:p-8">
			{/* Cabeçalho */}
			<div className="flex items-center gap-3">
				<Link
					to="/sales"
					aria-label="Voltar para vendas"
					className="rounded-lg p-2 text-muted transition hover:bg-background hover:text-foreground"
				>
					<ArrowLeft size={19} />
				</Link>

				<div>
					<p className="text-xs text-muted">
						Vendas <span className="mx-1">›</span>
						Venda #{sale.number}
					</p>

					<h1 className="mt-1 text-xl font-semibold text-foreground">Detalhes da venda</h1>
				</div>
			</div>

			{/* Informações e resumo financeiro */}
			<div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
				{/* Informações da venda */}
				<Card className="space-y-5">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-xs text-muted">Número da venda</p>

							<h2 className="mt-1 text-lg font-semibold text-foreground">Venda #{sale.number}</h2>
						</div>

						<span className={`rounded-full px-3 py-1 text-xs font-medium ${statusClass}`}>{status}</span>
					</div>

					<div className="grid grid-cols-2 gap-4 border-t border-border pt-4">
						<div>
							<p className="text-sm text-muted">Cliente</p>
							<p className="mt-1 font-medium text-foreground">{sale.customer}</p>
						</div>

						<div>
							<p className="text-sm text-muted">Data da venda</p>
							<p className="mt-1 font-medium text-foreground">{formatDate(sale.date)}</p>
						</div>
					</div>
				</Card>

				{/* Resumo financeiro */}
				<Card className="space-y-5">
					<h2 className="font-semibold text-foreground">Resumo financeiro</h2>

					<div className="grid grid-cols-1 gap-4 border-t border-border pt-4 sm:grid-cols-3">
						<div>
							<p className="text-sm text-muted">Valor total</p>
							<p className="mt-1 text-xl font-semibold text-foreground">{formatCurrency(total)}</p>
						</div>

						<div>
							<p className="text-sm text-muted">Total pago</p>
							<p className="mt-1 text-xl font-semibold text-success">{formatCurrency(totalPaid)}</p>
						</div>

						<div>
							<p className="text-sm text-muted">Saldo restante</p>
							<p className="mt-1 text-xl font-semibold text-danger">{formatCurrency(balance)}</p>
						</div>
					</div>
				</Card>
			</div>

			{/* Produtos da venda */}
			<Card className="space-y-4">
				<div className="flex items-center gap-2">
					<Package size={19} className="text-brand-600" />
					<h2 className="font-semibold text-foreground">Produtos da venda</h2>
				</div>

				{sale.items.length > 0 ? (
					<div className="overflow-x-auto">
						<table className="w-full min-w-115 text-left text-sm">
							<thead className="border-b border-border bg-background text-xs text-muted">
								<tr>
									<th className="px-3 py-3 font-medium">Produto</th>
									<th className="px-3 py-3 font-medium">Quantidade</th>
									<th className="px-3 py-3 font-medium">Valor unitário</th>
									<th className="px-3 py-3 text-right font-medium">Subtotal</th>
								</tr>
							</thead>

							<tbody className="divide-y divide-border">
								{sale.items.map((item) => (
									<tr key={item.id}>
										<td className="px-3 py-3 font-medium text-foreground">{item.name}</td>

										<td className="px-3 py-3 text-muted">{item.quantity}</td>

										<td className="px-3 py-3 text-muted">{formatCurrency(item.unitPrice)}</td>

										<td className="px-3 py-3 text-right font-semibold text-foreground">
											{formatCurrency(item.unitPrice * item.quantity)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				) : (
					<p className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted">
						Nenhum produto registrado nesta venda.
					</p>
				)}
			</Card>

			{/* Histórico de pagamentos */}
			<Card className="space-y-4">
				<div className="flex items-center gap-2">
					<CreditCard size={19} className="text-brand-600" />
					<h2 className="font-semibold text-foreground">Histórico de pagamentos</h2>
				</div>

				{salePayments.length > 0 ? (
					<div className="overflow-x-auto">
						<table className="w-full min-w-115 text-left text-sm">
							<thead className="border-b border-border bg-background text-xs text-muted">
								<tr>
									<th className="px-3 py-3 font-medium">Data</th>
									<th className="px-3 py-3 font-medium">Forma de pagamento</th>
									<th className="px-3 py-3 text-right font-medium">Valor</th>
								</tr>
							</thead>

							<tbody className="divide-y divide-border">
								{salePayments.map((payment) => (
									<tr key={payment.id}>
										<td className="px-3 py-3 text-muted">{formatDate(payment.date)}</td>

										<td className="px-3 py-3 text-foreground">{payment.method}</td>

										<td className="px-3 py-3 text-right font-semibold text-foreground">
											{formatCurrency(payment.amount)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				) : (
					<p className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted">
						Nenhum pagamento registrado para esta venda.
					</p>
				)}
			</Card>
		</div>
	);
}
