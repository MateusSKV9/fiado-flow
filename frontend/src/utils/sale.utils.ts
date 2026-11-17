import type { Payment } from "@/features/payments/types/payment.types";
import type { Sale, SaleStatus } from "@/features/sales";

export function getSaleFinancialSummary(sale: Sale, payments: Payment[]) {
	const totalPaid = payments
		.filter((payment) => payment.saleId === sale.id)
		.reduce((sum, payment) => sum + Number(payment.amount), 0);

	const balance = Number(sale.total) - totalPaid;

	const status: SaleStatus = totalPaid === 0 ? "Em aberto" : balance <= 0 ? "Pago" : "Parcial";

	return {
		paid: totalPaid,
		balance: Math.max(0, balance),
		status,
	};
}
