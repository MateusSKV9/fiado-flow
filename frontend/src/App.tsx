import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { DashboardPage } from "./features/dashboard";
import { Header, Main, Sidebar } from "./shared";
import { LoginPage } from "./features/login";
import { ClientsPage, NewClientPage } from "./features/clients";
import { NewSalePage } from "./features/sales";
import { SalesPage } from "./features/sales/pages/SalesPage";

const user = "Mateus Santos";

// Componente para o Layout com Sidebar + Header
const AppLayout = () => (
	<div className="min-h-screen w-full">
		<Sidebar user={user} />

		<div className="ml-64 flex min-h-screen min-w-0 flex-col">
			<Header user={user} />

			<Main>
				<Outlet />
			</Main>
		</div>
	</div>
);

export const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				{/* Rota Pública sem Sidebar / Header */}
				<Route path="/login" element={<LoginPage />} />

				{/* Rotas Privadas / Internas com Sidebar + Header */}
				<Route element={<AppLayout />}>
					<Route path="/dashboard" element={<DashboardPage />} />
					<Route path="/clients" element={<ClientsPage />} />
					<Route path="/new-client" element={<NewClientPage />} />
					<Route path="/sales" element={<SalesPage />} />
					<Route path="/new-sale" element={<NewSalePage />} />
					<Route path="/" element={<Navigate to="/dashboard" replace />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};
