import { useMemo, useState } from "react";
import { Search, Filter, Plus } from "lucide-react";
import { mockPayments } from "@/mocks/mockPayments";
import { PageHeader, LinkStyled, Input, DataTable, Card, Pagination } from "@/shared";
import { createPaymentColumns } from "../components/payment-columns";
import type { Payment } from "../types/payment.types";

const PAGE_SIZE = 5;

export default function PaymentsPage() {
	const [payments] = useState<Payment[]>(mockPayments);
	const [searchTerm, setSearchTerm] = useState("");
	const [dateFilter, setDateFilter] = useState("all");
	const [currentPage, setCurrentPage] = useState(1);

	const [today] = useState(() => new Date());

	const filteredPayments = useMemo(() => {
		const normalizedSearch = searchTerm.trim().toLowerCase();

		return payments.filter((payment) => {
			const matchesSearch =
				payment.customer.toLowerCase().includes(normalizedSearch) ||
				(payment.saleNumber && payment.saleNumber.toString().includes(normalizedSearch));

			if (dateFilter === "all") {
				return matchesSearch;
			}

			const days = Number(dateFilter);
			const referenceDate = new Date(today);
			referenceDate.setDate(referenceDate.getDate() - days);

			const paymentDate = new Date(`${payment.date}T12:00:00`);

			return matchesSearch && paymentDate >= referenceDate;
		});
	}, [payments, searchTerm, dateFilter, today]);

	const totalPages = Math.max(1, Math.ceil(filteredPayments.length / PAGE_SIZE));
	const paginatedPayments = filteredPayments.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

	function handleSearch(value: string) {
		setSearchTerm(value);
		setCurrentPage(1);
	}

	function handleDateFilter(value: string) {
		setDateFilter(value);
		setCurrentPage(1);
	}

	function handleView(payment: Payment) {
		window.alert(`Visualizar pagamento de ${payment.customer}`);
	}

	function handleEdit(payment: Payment) {
		window.alert(`Editar pagamento de ${payment.customer}`);
	}

	const paymentColumns = createPaymentColumns({
		onView: handleView,
		onEdit: handleEdit,
	});

	return (
		<div className="mx-auto w-full max-w-7xl space-y-5 p-5 md:p-8">
			{/* Cabeçalho */}
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<PageHeader title="Pagamentos" description="Consulte todos os pagamentos recebidos." />

				<LinkStyled size="lg" to="/payments/new" leftIcon={<Plus size={17} />}>
					Registrar pagamento
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
						aria-label="Buscar pagamentos"
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
						aria-label="Filtrar pagamentos por período"
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
			<Card className="overflow-hidden p-0!">
				<div className="overflow-x-auto">
					<DataTable
						columns={paymentColumns}
						data={paginatedPayments}
						keyExtractor={(payment) => payment.id}
						emptyMessage="Nenhum pagamento encontrado."
					/>
				</div>

				{/* Rodapé e paginação */}
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					totalItems={filteredPayments.length}
					itemsPerPage={PAGE_SIZE}
					onPageChange={setCurrentPage}
					itemLabel="pagamentos"
				/>
			</Card>
		</div>
	);
}
