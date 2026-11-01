import { LinkStyled } from "@/shared";

export default function NotFoundPage() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center">
			<h1 className="text-6xl font-bold"> =( </h1>
			<p className="m-4">Página não encontrada.</p>

			<LinkStyled to="/dashboard">Página Inicial</LinkStyled>
		</div>
	);
}
