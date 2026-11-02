import { getInitials } from "@/utils";
import { StatusBadge } from "./StatusBadge";
import type { Client } from "../types/client.types";

export function ClientInfoCard({ client }: { client: Client }) {
	return (
		<section className="rounded-xl border border-border bg-surface p-5 shadow-sm">
			<div className="flex flex-wrap items-center gap-4 border-b border-border pb-5">
				<div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-brand-600 text-lg font-semibold text-white">
					{getInitials(client.name)}
				</div>

				<div className="min-w-0 flex-1">
					<h2 className="font-semibold text-foreground">{client.name}</h2>
					<p className="mt-1 text-sm text-muted">{client.phone}</p>
				</div>

				<StatusBadge status={client.status} />
			</div>

			<div className="grid grid-cols-1 gap-4 pt-4 text-sm sm:grid-cols-2">
				<div>
					<p className="text-muted">CPF</p>
					<p className="mt-1 font-medium text-foreground">{client.document || "Não informado"}</p>
				</div>

				<div>
					<p className="text-muted">Endereço</p>
					<p className="mt-1 font-medium text-foreground">{client.address || "Não informado"}</p>
				</div>
			</div>
		</section>
	);
}
