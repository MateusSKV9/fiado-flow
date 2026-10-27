import { DashboardChart } from "../components/DashboardChart";
import { DashboardHeader } from "../components/DashboardHeader";
import { DashboardSummary } from "../components/DashboardSummary";
import { RecentSales } from "../components/RecentSales";

export function DashboardPage() {
	return (
		<div id="inicio" className="space-y-7 p-5 md:p-8">
			<DashboardHeader user={"Mateus"} />

			<DashboardSummary />

			<section className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,1fr)]">
				<DashboardChart />
				<RecentSales />
			</section>
		</div>
	);
}
