import { Eye, Edit, Trash2 } from "lucide-react";
import { Button, LinkStyled, type Column } from "@/shared";
import type { Client } from "../types/client.types";
import { formatCurrency } from "@/utils";

type ClientColumnActions = {
	onEdit: (client: Client) => void;
	onDelete: (clientId: string) => void;
};

export function createClientColumns({ onEdit, onDelete }: ClientColumnActions): Column<Client>[] {
	return [
		{
			key: "name",
			header: "Nome",
			render: (client) => <span className="font-semibold text-foreground">{client.name}</span>,
		},
		{
			key: "phone",
			header: "Telefone",
			render: (client) => <span className="text-muted">{client.phone}</span>,
		},
		{
			key: "totalOpen",
			header: "Total em aberto",
			render: (client) => (
				<span className={client.totalOpen > 0 ? "font-semibold text-danger" : "text-muted"}>
					{formatCurrency(client.totalOpen)}
				</span>
			),
		},
		{
			key: "status",
			header: "Status",
			render: (client) => (
				<span
					className={[
						"inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
						client.status === "Ativo" ? "bg-success-bg text-success" : "bg-danger-bg text-danger",
					].join(" ")}
				>
					{client.status}
				</span>
			),
		},
		{
			key: "actions",
			header: "Ações",
			align: "right",
			render: (client) => (
				<div className="flex items-center justify-end gap-1.5">
					<LinkStyled to={`/clients/${client.id}`} aria-label={`Visualizar cliente ${client.name}`} variant="ghost">
						<Eye size={16} />
					</LinkStyled>

					<Button
						type="button"
						variant="ghost"
						size="sm"
						aria-label={`Editar ${client.name}`}
						onClick={() => onEdit(client)}
					>
						<Edit size={16} />
					</Button>

					<Button
						type="button"
						variant="ghost"
						size="sm"
						className="text-danger hover:bg-danger-bg hover:text-danger"
						aria-label={`Excluir ${client.name}`}
						onClick={() => onDelete(client.id)}
					>
						<Trash2 size={16} />
					</Button>
				</div>
			),
		},
	];
}
