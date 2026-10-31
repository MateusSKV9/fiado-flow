import { Button, type Column } from "@/shared";
import type { Sale, SaleStatus } from "../types/sale.types";
import { formatCurrency, formatDate } from "@/utils";
import { Eye, Pencil } from "lucide-react";

function getStatusClass(status: SaleStatus) {
	const styles: Record<SaleStatus, string> = {
		"Em aberto": "bg-danger-bg text-danger",
		Pago: "bg-success-bg text-success",
		Parcial: "bg-warning-bg text-warning",
	};

	return styles[status];
}

type SaleColumnActions = {
	onView: (sale: Sale) => void;
	onEdit: (sale: Sale) => void;
};

export function createSaleColumns({ onView, onEdit }: SaleColumnActions): Column<Sale>[] {
	return [
		{
			key: "date",
			header: "Data",
			render: (sale) => <span className="text-muted">{formatDate(sale.date)}</span>,
		},
		{
			key: "customer",
			header: "Cliente",
			render: (sale) => <span className="font-semibold text-foreground">{sale.customer}</span>,
		},
		{
			key: "total",
			header: "Valor total",
			render: (sale) => <span className="font-medium text-foreground">{formatCurrency(sale.total)}</span>,
		},
		{
			key: "paid",
			header: "Pago",
			render: (sale) => <span className="text-muted">{formatCurrency(sale.paid)}</span>,
		},
		{
			key: "balance",
			header: "Saldo",
			render: (sale) => (
				<span className={sale.balance > 0 ? "text-danger" : "text-muted"}>{formatCurrency(sale.balance)}</span>
			),
		},
		{
			key: "status",
			header: "Status",
			render: (sale) => (
				<span
					className={[
						"inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
						getStatusClass(sale.status),
					].join(" ")}
				>
					{sale.status}
				</span>
			),
		},
		{
			key: "actions",
			header: "Ações",
			align: "right",
			render: (sale) => (
				<div className="flex items-center justify-end gap-1.5">
					<Button
						type="button"
						variant="ghost"
						size="sm"
						aria-label={`Visualizar venda ${sale.number}`}
						onClick={() => onView(sale)}
					>
						<Eye size={16} />
					</Button>

					<Button
						type="button"
						variant="ghost"
						size="sm"
						aria-label={`Editar venda ${sale.number}`}
						onClick={() => onEdit(sale)}
					>
						<Pencil size={16} />
					</Button>
				</div>
			),
		},
	];
}
