import { ChartNoAxesCombined, CreditCard, HandCoins, House, Settings, Users } from "lucide-react";
import FiadoLogo from "@/assets/fiado-flow-logo.png";
import { NavLink } from "react-router-dom";

const navigation = [
	{ label: "Início", icon: House, href: "/dashboard" },
	{ label: "Clientes", icon: Users, href: "/clients" },
	{ label: "Vendas", icon: HandCoins, href: "/new-sale" },
	{ label: "Pagamentos", icon: CreditCard, href: "/pagamentos" },
	{ label: "Relatórios", icon: ChartNoAxesCombined, href: "/relatorios" },
	{ label: "Configurações", icon: Settings, href: "/configuracoes" },
];

interface SidebarProps {
	user: string;
}

export function Sidebar({ user }: SidebarProps) {
	return (
		<aside className="fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-sidebar p-1 pt-2 text-sidebar-foreground">
			<div className="flex h-18 items-center gap-3 border-b border-sidebar-border px-6">
				<img className="w-10" src={FiadoLogo} alt="Logo FiadoFlow" />

				<span className="text-2xl font-bold tracking-tight">
					Fiado<span className="text-sidebar-accent">Flow</span>
				</span>
			</div>

			<nav className="flex-1 space-y-2 px-3 py-5">
				{navigation.map(({ label, icon: Icon, href }) => (
					<NavLink
						key={label}
						to={href}
						end
						className={({ isActive }) =>
							`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
								isActive
									? "bg-sidebar-active text-sidebar-foreground shadow-lg shadow-sidebar-shadow"
									: "text-sidebar-muted hover:bg-sidebar-hover hover:text-sidebar-foreground"
							}`
						}
					>
						<Icon size={19} />
						<span>{label}</span>
					</NavLink>
				))}
			</nav>

			<div className="border-t border-sidebar-border p-4">
				<div className="flex items-center gap-3 rounded-xl p-2">
					<div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sidebar-avatar text-sm font-bold text-sidebar-avatar-foreground">
						{user.trim().charAt(0).toUpperCase()}
					</div>

					<div className="min-w-0">
						<p className="truncate text-sm font-semibold">{user}</p>
						<p className="text-xs text-sidebar-secondary">Administrador</p>
					</div>
				</div>
			</div>
		</aside>
	);
}
