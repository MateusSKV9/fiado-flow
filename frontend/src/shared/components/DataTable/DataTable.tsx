import type { ReactNode } from "react";

export type Column<T> = {
	key: string;
	header: string;
	render: (item: T) => ReactNode;
	align?: "left" | "right" | "center";
};

export type DataTableProps<T> = {
	columns: Column<T>[];
	data: T[];
	keyExtractor: (item: T) => string;
	emptyMessage?: string;
};

export function DataTable<T>({
	columns,
	data,
	keyExtractor,
	emptyMessage = "Nenhum registro encontrado.",
}: DataTableProps<T>) {
	return (
		<div className="overflow-x-auto">
			<table className="w-full border-collapse text-left">
				<thead>
					<tr className="border-b border-border bg-background/50 text-xs font-semibold uppercase tracking-wider text-muted">
						{columns.map((column) => (
							<th
								key={column.key}
								scope="col"
								className={[
									"whitespace-nowrap px-6 py-3.5",
									column.align === "right" ? "text-right" : "",
									column.align === "center" ? "text-center" : "",
								].join(" ")}
							>
								{column.header}
							</th>
						))}
					</tr>
				</thead>

				<tbody className="divide-y divide-border text-sm">
					{data.map((item) => (
						<tr
							key={keyExtractor(item)}
							className="border-l-2 border-l-transparent transition-colors hover:border-l-brand-500 hover:bg-background"
						>
							{columns.map((column) => (
								<td
									key={column.key}
									className={[
										"whitespace-nowrap px-6 py-4",
										column.align === "right" ? "text-right" : "",
										column.align === "center" ? "text-center" : "",
									].join(" ")}
								>
									{column.render(item)}
								</td>
							))}
						</tr>
					))}

					{data.length === 0 && (
						<tr>
							<td colSpan={columns.length} className="px-6 py-10 text-center text-sm text-muted">
								{emptyMessage}
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}
