import { Eye, Pencil } from "lucide-react";
import { Button, LinkStyled, type Column } from "@/shared";
import { formatCurrency, formatDate } from "@/utils";
import type { Payment } from "../types/payment.types";

type PaymentColumnActions = {
	onEdit: (payment: Payment) => void;
};

export function createPaymentColumns({ onEdit }: PaymentColumnActions): Column<Payment>[] {
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
			key: "actions",
			header: "Ações",
			align: "right",
			render: (payment) => (
				<div className="flex items-center justify-end gap-1.5">
					<LinkStyled to={`/payments/${payment.id}`} aria-label={`Visualizar pagamento ${payment.id}`} variant="ghost">
						<Eye size={16} />
					</LinkStyled>

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
