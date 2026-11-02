import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/shared";
import { mockClients, mockSales, mockPayments } from "@/mocks";
import { ClientDetailsTabs } from "../components/ClientDetailsTabs";
import { ClientInfoCard } from "../components/ClientInfoCard";
import { FinancialSummary } from "../components/FinancialSummary";

export default function ClientDetailsPage() {
	const { id } = useParams<{ id: string }>();

	const client = mockClients.find((item) => String(item.id) === id);

	const clientSales = useMemo(
		() => mockSales.filter((sale) => sale.customer.trim().toLowerCase() === client?.name.trim().toLowerCase()),
		[client]
	);

	const saleIds = new Set(clientSales.map((sale) => sale.id));

	const clientPayments = mockPayments.filter((payment) => saleIds.has(payment.saleId));

	if (!client) {
		return (
			<div className="mx-auto max-w-7xl p-5 md:p-8">
				<Card>
					<p className="text-center text-muted">Cliente não encontrado.</p>
					<div className="mt-4 text-center">
						<Link to="/clients" className="text-sm font-medium text-brand-600 hover:underline">
							Voltar para clientes
						</Link>
					</div>
				</Card>
			</div>
		);
	}

	const totalOpen = clientSales.reduce((sum, sale) => sum + Number(sale.balance), 0);
	const totalPaid = clientSales.reduce((sum, sale) => sum + Number(sale.paid), 0);

	return (
		<div className="mx-auto w-full max-w-7xl space-y-5 p-5 md:p-8">
			<div className="flex items-center gap-3">
				<Link
					to="/clients"
					aria-label="Voltar para clientes"
					className="rounded-lg p-2 text-muted transition hover:bg-background hover:text-foreground"
				>
					<ArrowLeft size={19} />
				</Link>

				<div>
					<p className="text-xs text-muted">
						Clientes <span className="mx-1">›</span> Detalhes do cliente
					</p>
					<h1 className="mt-1 text-xl font-semibold text-foreground">Detalhes do cliente</h1>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
				<ClientInfoCard client={client} />

				<FinancialSummary totalOpen={totalOpen} totalPaid={totalPaid} totalPurchases={clientSales.length} />
			</div>

			<ClientDetailsTabs sales={clientSales} payments={clientPayments} />
		</div>
	);
}
