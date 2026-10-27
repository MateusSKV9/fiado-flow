import { formatCurrency } from "@/utils";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const financialData = [
	{ month: "Jan", received: 900, pending: 1000 },
	{ month: "Fev", received: 1100, pending: 1200 },
	{ month: "Mar", received: 500, pending: 850 },
	{ month: "Abr", received: 800, pending: 1500 },
	{ month: "Mai", received: 400, pending: 1100 },
	{ month: "Jun", received: 850, pending: 1350 },
	{ month: "Jul", received: 1200, pending: 1250 },
];

export function DashboardChart() {
	return (
		<article className="min-w-0 rounded-2xl border border-border/80 bg-surface p-5 shadow-sm">
			<div className="mb-6 flex flex-wrap items-center justify-between gap-3">
				<div>
					<h2 className="font-semibold text-foreground">Movimentação financeira</h2>

					<p className="mt-1 text-xs text-muted">Valores recebidos e ainda em aberto</p>
				</div>
			</div>

			<div className="h-75 w-full">
				<ResponsiveContainer width="100%" height="100%">
					<LineChart data={financialData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
						<CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />

						<XAxis
							dataKey="month"
							axisLine={false}
							tickLine={false}
							tick={{ fill: "var(--color-muted)", fontSize: 12 }}
							dy={10}
						/>

						<YAxis
							width={65}
							axisLine={false}
							tickLine={false}
							tick={{ fill: "var(--color-muted)", fontSize: 11 }}
							tickFormatter={(value: number) => (value === 0 ? "R$ 0" : `R$ ${value}`)}
							domain={[0, 2000]}
							ticks={[0, 500, 1000, 1500, 2000]}
						/>

						<Tooltip
							formatter={(value) => formatCurrency(Number(value))}
							contentStyle={{
								borderRadius: 13,
								border: "1px solid var(--color-border)",
								backgroundColor: "var(--color-surface)",
								color: "var(--color-foreground)",
								fontSize: 12,
							}}
						/>

						<Legend
							verticalAlign="top"
							align="right"
							iconType="circle"
							iconSize={8}
							wrapperStyle={{
								fontSize: 13,
								paddingBottom: 20,
								color: "var(--color-foreground)",
							}}
						/>

						<Line
							type="monotone"
							dataKey="received"
							name="Recebidos"
							stroke="var(--color-brand-500)"
							strokeWidth={2.5}
							dot={{
								r: 3,
								fill: "var(--color-brand-500)",
								strokeWidth: 0,
							}}
							activeDot={{ r: 5 }}
						/>

						<Line
							type="monotone"
							dataKey="pending"
							name="Em aberto"
							stroke="var(--color-danger)"
							strokeWidth={2.5}
							dot={{
								r: 3,
								fill: "var(--color-danger)",
								strokeWidth: 0,
							}}
							activeDot={{ r: 5 }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</article>
	);
}
