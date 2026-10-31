import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./Button";

type PaginationProps = {
	currentPage: number;
	totalPages: number;
	totalItems: number;
	itemsPerPage: number;
	onPageChange: (page: number) => void;
	itemLabel?: string;
};

export function Pagination({
	currentPage,
	totalPages,
	totalItems,
	itemsPerPage,
	onPageChange,
	itemLabel = "registros",
}: PaginationProps) {
	const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;

	const endItem = Math.min(currentPage * itemsPerPage, totalItems);

	return (
		<div className="flex flex-col gap-3 border-t border-border bg-background/30 px-6 py-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
			<span>
				Mostrando {startItem}–{endItem} de {totalItems} {itemLabel}
			</span>

			<div className="flex items-center justify-end gap-1">
				<Button
					type="button"
					variant="outline"
					size="sm"
					disabled={currentPage <= 1}
					aria-label="Página anterior"
					onClick={() => onPageChange(currentPage - 1)}
				>
					<ChevronLeft size={16} />
				</Button>

				<Button type="button" size="sm" aria-current="page">
					{currentPage}
				</Button>

				<Button
					type="button"
					variant="outline"
					size="sm"
					disabled={currentPage >= totalPages}
					aria-label="Próxima página"
					onClick={() => onPageChange(currentPage + 1)}
				>
					<ChevronRight size={16} />
				</Button>
			</div>
		</div>
	);
}
