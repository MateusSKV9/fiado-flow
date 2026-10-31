import { useMemo, useState } from "react";
import { Search, Filter, Plus } from "lucide-react";
import { mockSales } from "@/mocks";
import { PageHeader, LinkStyled, Input, DataTable, Section, Pagination } from "@/shared";
import { createSaleColumns } from "../components/sale-columns";
import type { Sale } from "../types/sale.types";

const PAGE_SIZE = 5;

export function SalesPage() {
	const [sales] = useState<Sale[]>(mockSales);
	const [searchTerm, setSearchTerm] = useState("");
	const [dateFilter, setDateFilter] = useState("all");
	const [currentPage, setCurrentPage] = useState(1);

	const [today] = useState(() => new Date());

	const filteredSales = useMemo(() => {
		const normalizedSearch = searchTerm.trim().toLowerCase();

		return sales.filter((sale) => {
			const matchesSearch =
				sale.customer.toLowerCase().includes(normalizedSearch) || sale.number.toString().includes(normalizedSearch);

			if (dateFilter === "all") {
				return matchesSearch;
			}

			const days = Number(dateFilter);

			const referenceDate = new Date(today);
			referenceDate.setDate(referenceDate.getDate() - days);

			const saleDate = new Date(`${sale.date}T12:00:00`);

			return matchesSearch && saleDate >= referenceDate;
		});
	}, [sales, searchTerm, dateFilter, today]);

	const totalPages = Math.max(1, Math.ceil(filteredSales.length / PAGE_SIZE));

	const paginatedSales = filteredSales.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

	function handleSearch(value: string) {
		setSearchTerm(value);
		setCurrentPage(1);
	}

	function handleDateFilter(value: string) {
		setDateFilter(value);
		setCurrentPage(1);
	}

	function handleView(sale: Sale) {
		window.alert(`Visualizar venda #${sale.number}`);
	}

	function handleEdit(sale: Sale) {
		window.alert(`Editar venda #${sale.number}`);
	}

	const saleColumns = createSaleColumns({
		onView: handleView,
		onEdit: handleEdit,
	});

	return (
		<div className="mx-auto w-full max-w-7xl space-y-5 p-5 md:p-8">
			{/* Cabeçalho */}
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<PageHeader title="Vendas" description="Consulte todas as vendas realizadas." />

				<LinkStyled size="lg" to="/new-sale" leftIcon={<Plus size={17} />}>
					Nova venda
				</LinkStyled>
			</div>

			{/* Busca e filtros */}
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
						placeholder="Buscar por cliente ou número da venda..."
						aria-label="Buscar vendas"
						className="pl-10"
					/>
				</div>

				<div className="relative w-full sm:w-48">
					<Filter
						size={16}
						aria-hidden="true"
						className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
					/>

					<select
						value={dateFilter}
						onChange={(event) => handleDateFilter(event.target.value)}
						aria-label="Filtrar vendas por período"
						className="h-11 w-full appearance-none rounded-lg border border-border bg-surface pl-10 pr-8 text-sm text-foreground outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
					>
						<option value="all">Todas as datas</option>
						<option value="7">Últimos 7 dias</option>
						<option value="30">Últimos 30 dias</option>
						<option value="90">Últimos 90 dias</option>
					</select>
				</div>
			</div>

			{/* Tabela */}
			<Section className="overflow-hidden p-0!">
				<div className="overflow-x-auto">
					<DataTable
						columns={saleColumns}
						data={paginatedSales}
						keyExtractor={(sale) => sale.id}
						emptyMessage="Nenhuma venda encontrada."
					/>
				</div>

				{/* Rodapé e paginação */}
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					totalItems={filteredSales.length}
					itemsPerPage={PAGE_SIZE}
					onPageChange={setCurrentPage}
					itemLabel="vendas"
				/>
			</Section>
		</div>
	);
}
