type DashboardHeaderProps = {
	user: string;
};

export function DashboardHeader({ user }: DashboardHeaderProps) {
	const currentDate = new Intl.DateTimeFormat("pt-BR", {
		weekday: "long",
		day: "numeric",
		month: "long",
	}).format(new Date());

	const formattedDate = currentDate.charAt(0).toUpperCase() + currentDate.slice(1);

	return (
		<section className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
			<div>
				<h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">Olá, {user}! 👋</h1>

				<p className="mt-2 text-sm text-muted">Aqui está o resumo do seu negócio hoje.</p>
			</div>

			<p className="text-sm text-muted">{formattedDate}</p>
		</section>
	);
}
