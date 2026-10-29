interface PageHeaderProps {
	title: string;
	description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
	return (
		<header>
			<h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">{title}</h1>

			{description && <p className="mt-1 text-sm text-muted">{description}</p>}
		</header>
	);
}
