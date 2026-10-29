import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, Plus, Eye, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { PageHeader, Input, Button, Section } from "@/shared";
import type { Client } from "../types/client.types";
import { formatCurrency } from "@/utils";

const mockClients: Client[] = [
	{ id: "1", name: "Maria Silva", phone: "(11) 98765-4321", totalOpen: 120, status: "Ativo" },
	{ id: "2", name: "João Pereira", phone: "(11) 91234-5678", totalOpen: 85, status: "Inativo" },
	{ id: "3", name: "Ana Costa", phone: "(11) 99876-5432", totalOpen: 0, status: "Ativo" },
	{ id: "4", name: "Carlos Oliveira", phone: "(11) 99654-3210", totalOpen: 150, status: "Ativo" },
	{ id: "5", name: "Fernanda Lima", phone: "(11) 96556-6677", totalOpen: 65, status: "Ativo" },
	{ id: "6", name: "Roberto Alves", phone: "(11) 96888-7766", totalOpen: 0, status: "Ativo" },
];

export function ClientsPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [clients, setClients] = useState<Client[]>(mockClients);

	const filteredClients = useMemo(() => {
		const normalizedSearch = searchTerm.trim().toLowerCase();

		return clients.filter(
			(client) =>
				client.name.toLowerCase().includes(normalizedSearch) || client.phone.toLowerCase().includes(normalizedSearch)
		);
	}, [clients, searchTerm]);

	function handleDelete(clientId: string) {
		const confirmed = window.confirm("Deseja excluir este cliente da lista?");

		if (!confirmed) return;

		setClients((current) => current.filter((client) => client.id !== clientId));
	}

	return (
		<div className="mx-auto w-full max-w-7xl space-y-5 p-5 md:p-8">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<PageHeader title="Clientes" description="Gerencie seus clientes e veja o histórico de compras." />

				<Link
					to="/new-client"
					className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-brand-600 px-5 text-sm font-semibold text-brand-foreground shadow-sm transition-colors hover:bg-brand-700"
				>
					<Plus size={17} />
					Novo cliente
				</Link>
			</div>

			<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
				<div className="relative w-full flex-1">
					<Search
						size={17}
						aria-hidden="true"
						className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted "
					/>

					<Input
						type="search"
						value={searchTerm}
						onChange={(event) => setSearchTerm(event.target.value)}
						placeholder="Buscar por nome ou telefone..."
						aria-label="Buscar clientes por nome ou telefone"
						className="pl-10"
					/>
				</div>

				<Button
					type="button"
					variant="outline"
					size="lg"
					leftIcon={<Filter size={17} />}
					className="w-full sm:w-auto"
					onClick={() => window.alert("A implementação dos filtros está pendente.")}
				>
					Filtros
				</Button>
			</div>

			<Section className="overflow-hidden p-0!">
				<div className="overflow-x-auto">
					<table className="w-full border-collapse text-left">
						<thead>
							<tr className="border-b border-border bg-background/50 text-xs font-semibold uppercase tracking-wider text-muted">
								<th scope="col" className="whitespace-nowrap px-6 py-3.5">
									Nome
								</th>
								<th scope="col" className="whitespace-nowrap px-6 py-3.5">
									Telefone
								</th>
								<th scope="col" className="whitespace-nowrap px-6 py-3.5">
									Total em aberto
								</th>
								<th scope="col" className="whitespace-nowrap px-6 py-3.5">
									Status
								</th>
								<th scope="col" className="whitespace-nowrap px-6 py-3.5 text-right">
									Ações
								</th>
							</tr>
						</thead>

						<tbody className="divide-y divide-border text-sm">
							{filteredClients.map((client) => (
								<tr
									key={client.id}
									className="border-l-2 border-l-transparent transition-colors hover:border-l-brand-500 hover:bg-background"
								>
									<td className="whitespace-nowrap px-6 py-4 font-semibold text-foreground">{client.name}</td>

									<td className="whitespace-nowrap px-6 py-4 text-muted">{client.phone}</td>

									<td className="whitespace-nowrap px-6 py-4 font-semibold">
										<span className={client.totalOpen > 0 ? "text-danger" : "text-muted"}>
											{formatCurrency(client.totalOpen)}
										</span>
									</td>

									<td className="px-6 py-4">
										<span
											className={[
												"inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
												client.status === "Ativo" ? "bg-success-bg text-success" : "bg-danger-bg text-danger",
											].join(" ")}
										>
											{client.status}
										</span>
									</td>

									<td className="px-6 py-4">
										<div className="flex items-center justify-end gap-1.5">
											<Button
												type="button"
												variant="ghost"
												size="sm"
												aria-label={`Ver histórico de ${client.name}`}
												title="Ver histórico"
												onClick={() => window.alert(`Histórico de ${client.name}`)}
											>
												<Eye size={16} />
											</Button>

											<Button
												type="button"
												variant="ghost"
												size="sm"
												aria-label={`Editar ${client.name}`}
												title="Editar cliente"
												onClick={() => window.alert(`Editar ${client.name}`)}
											>
												<Edit size={16} />
											</Button>

											<Button
												type="button"
												variant="ghost"
												size="sm"
												aria-label={`Excluir ${client.name}`}
												title="Excluir cliente"
												className="text-danger hover:bg-danger-bg hover:text-danger"
												onClick={() => handleDelete(client.id)}
											>
												<Trash2 size={16} />
											</Button>
										</div>
									</td>
								</tr>
							))}

							{filteredClients.length === 0 && (
								<tr>
									<td colSpan={5} className="px-6 py-10 text-center text-sm text-muted">
										Nenhum cliente encontrado.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>

				<div className="flex flex-col gap-3 border-t border-border bg-background/30 px-6 py-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
					<span>
						Mostrando {filteredClients.length} de {clients.length} clientes
					</span>

					<div className="flex items-center justify-end gap-1">
						<Button type="button" variant="outline" size="sm" disabled aria-label="Página anterior">
							<ChevronLeft size={16} />
						</Button>

						<Button type="button" size="sm" aria-current="page">
							1
						</Button>

						<Button type="button" variant="outline" size="sm" disabled aria-label="Próxima página">
							<ChevronRight size={16} />
						</Button>
					</div>
				</div>
			</Section>
		</div>
	);
}
