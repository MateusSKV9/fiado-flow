import { Bell, ChevronDown, Search } from "lucide-react";

type HeaderProps = {
	user: string;
};

export function Header({ user }: HeaderProps) {
	return (
		<header className="sticky top-0 z-30 flex h-18 items-center justify-between gap-4 border-b border-slate-200 bg-white/95 px-5 backdrop-blur md:px-8">
			<div className="relative w-full max-w-md">
				<Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />

				<input
					type="search"
					placeholder="Buscar no sistema..."
					aria-label="Buscar no sistema"
					className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
				/>

				{/* <Input
					type="search"
					placeholder="Buscar no sistema..."
					aria-label="Buscar no sistema"
					className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
				/> */}
			</div>

			<div className="flex shrink-0 items-center gap-3 md:gap-5">
				<button
					type="button"
					aria-label="Notificações"
					className="relative rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
				>
					<Bell size={20} />
					<span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-blue-600 ring-2 ring-white" />
				</button>

				<button
					type="button"
					className="flex items-center gap-2 rounded-lg p-1.5 transition hover:bg-slate-50"
					aria-label="Abrir menu do perfil"
				>
					<div className="flex size-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
						{user.charAt(0)}
					</div>

					<span className="hidden text-sm font-semibold text-slate-700 sm:block">{user}</span>

					<ChevronDown size={16} className="hidden text-slate-400 sm:block" />
				</button>
			</div>
		</header>
	);
}
