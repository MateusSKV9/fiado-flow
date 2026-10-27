import { Wallet, ArrowDownRight, Users } from "lucide-react";
import { SummaryCard } from "./SummaryCard";

export function DashboardSummary() {
	return (
		<section aria-label="Resumo financeiro" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
			<SummaryCard
				title="Total em aberto"
				value="R$ 1.240,00"
				description="Saldo pendente dos fiados"
				icon={Wallet}
				color="red"
			/>

			<SummaryCard
				title="Recebido hoje"
				value="R$ 380,00"
				description="Pagamentos registrados hoje"
				icon={ArrowDownRight}
				color="green"
			/>

			<SummaryCard
				title="Clientes ativos"
				value="24"
				description="Clientes com cadastro ativo"
				icon={Users}
				color="blue"
			/>
		</section>
	);
}
