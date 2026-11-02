export function StatusBadge({ status }: { status: string }) {
	const styles: Record<string, string> = {
		"Em aberto": "bg-red-100 text-red-600",
		Pago: "bg-emerald-100 text-emerald-700",
		Parcial: "bg-amber-100 text-amber-700",
		Ativo: "bg-emerald-100 text-emerald-700",
		Inativo: "bg-gray-100 text-gray-600",
		Cancelado: "bg-gray-100 text-gray-600",
	};

	return (
		<span
			className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
				styles[status] ?? "bg-gray-100 text-gray-600"
			}`}
		>
			{status}
		</span>
	);
}
