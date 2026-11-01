import { Eye, Pencil } from "lucide-react";
import { Button, type Column } from "@/shared";
import { formatCurrency, formatDate } from "@/utils";
import type { Payment, PaymentStatus } from "../types/payment.types";

function getPaymentStatusClass(status: PaymentStatus) {
	const styles: Record<PaymentStatus, string> = {
		Confirmado: "bg-success-bg text-success",
		Pendente: "bg-warning-bg text-warning",
		Cancelado: "bg-danger-bg text-danger",
	};

	return styles[status];
}

type PaymentColumnActions = {
	onView: (payment: Payment) => void;
	onEdit: (payment: Payment) => void;
};

export function createPaymentColumns({ onView, onEdit }: PaymentColumnActions): Column<Payment>[] {
	return [
		{
			key: "date",
			header: "Data",
			render: (payment) => <span className="text-muted">{formatDate(payment.date)}</span>,
		},
		{
			key: "customer",
			header: "Cliente",
			render: (payment) => <span className="font-semibold text-foreground">{payment.customer}</span>,
		},
		{
			key: "saleNumber",
			header: "Venda Ref.",
			render: (payment) => (
				<span className="text-muted">{payment.saleNumber ? `Venda #${payment.saleNumber}` : "Geral"}</span>
			),
		},
		{
			key: "amount",
			header: "Valor",
			render: (payment) => <span className="font-medium text-foreground">{formatCurrency(payment.amount)}</span>,
		},
		{
			key: "method",
			header: "Forma",
			render: (payment) => <span className="text-muted">{payment.method}</span>,
		},
		{
			key: "status",
			header: "Status",
			render: (payment) => (
				<span
					className={[
						"inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
						getPaymentStatusClass(payment.status),
					].join(" ")}
				>
					{payment.status}
				</span>
			),
		},
		{
			key: "actions",
			header: "Ações",
			align: "right",
			render: (payment) => (
				<div className="flex items-center justify-end gap-1.5">
					<Button
						type="button"
						variant="ghost"
						size="sm"
						aria-label={`Visualizar pagamento de ${payment.customer}`}
						onClick={() => onView(payment)}
					>
						<Eye size={16} />
					</Button>

					<Button
						type="button"
						variant="ghost"
						size="sm"
						aria-label={`Editar pagamento de ${payment.customer}`}
						onClick={() => onEdit(payment)}
					>
						<Pencil size={16} />
					</Button>
				</div>
			),
		},
	];
}
