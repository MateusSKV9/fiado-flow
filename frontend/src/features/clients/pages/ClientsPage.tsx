import { useMemo, useState } from "react";
import { Search, Plus } from "lucide-react";
import { mockClients } from "@/mocks";
import { PageHeader, Input, Section, LinkStyled, DataTable, Pagination } from "@/shared";
import { createClientColumns } from "../components/client-columns";
import type { Client } from "../types/client.types";

const PAGE_SIZE = 5;

export function ClientsPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [clients, setClients] = useState<Client[]>(mockClients);
	const [currentPage, setCurrentPage] = useState(1);

	const filteredClients = useMemo(() => {
		const normalizedSearch = searchTerm.trim().toLowerCase();

		return clients.filter(
			(client) =>
				client.name.toLowerCase().includes(normalizedSearch) || client.phone.toLowerCase().includes(normalizedSearch)
		);
	}, [clients, searchTerm]);

	const totalPages = Math.max(1, Math.ceil(filteredClients.length / PAGE_SIZE));
	const paginatedClients = filteredClients.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

	function handleSearch(value: string) {
		setSearchTerm(value);
		setCurrentPage(1);
	}

	function handleDelete(clientId: string) {
		const confirmed = window.confirm("Deseja excluir este cliente da lista?");

		if (!confirmed) return;

		const isVisible = filteredClients.some((client) => client.id === clientId);
		const nextTotalItems = filteredClients.length - Number(isVisible);
		const nextTotalPages = Math.max(1, Math.ceil(nextTotalItems / PAGE_SIZE));

		setClients((current) => current.filter((client) => client.id !== clientId));
		setCurrentPage((page) => Math.min(page, nextTotalPages));
	}

	const clientColumns = createClientColumns({
		onView: (client) => {
			window.alert(`Histórico de ${client.name}`);
		},
		onEdit: (client) => {
			window.alert(`Editar ${client.name}`);
		},
		onDelete: handleDelete,
	});

	return (
		<div className="mx-auto w-full max-w-7xl space-y-5 p-5 md:p-8">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<PageHeader title="Clientes" description="Gerencie seus clientes e veja o histórico de compras." />

				<LinkStyled size="lg" to="/new-client" leftIcon={<Plus size={17} />}>
					Novo Cliente
				</LinkStyled>
			</div>

			<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
				<div className="relative w-full flex-1">
					<Search
						size={17}
						aria-hidden="true"
						className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
					/>

					<Input
						type="search"
						value={searchTerm}
						onChange={(event) => handleSearch(event.target.value)}
						placeholder="Buscar por nome ou telefone..."
						aria-label="Buscar clientes por nome ou telefone"
						className="pl-10"
					/>
				</div>
			</div>

			<Section className="overflow-hidden p-0!">
				<DataTable
					columns={clientColumns}
					data={paginatedClients}
					keyExtractor={(client) => client.id}
					emptyMessage="Nenhum cliente encontrado."
				/>

				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					totalItems={filteredClients.length}
					itemsPerPage={PAGE_SIZE}
					onPageChange={setCurrentPage}
					itemLabel="clientes"
				/>
			</Section>
		</div>
	);
}
