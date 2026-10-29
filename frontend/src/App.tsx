import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { DashboardPage } from "./features/dashboard";
import { Header, Main, Sidebar } from "./shared";
import { LoginPage } from "./features/login";

const user = "Mateus Santos";

// Componente para o Layout com Sidebar + Header
const AppLayout = () => (
	<div className="min-h-screen flex w-full">
		<Sidebar user={user} />
		<Main>
			<Header user={user} />
			{/* O Outlet renderiza as sub-rotas (/dashboard, /clientes, etc) */}
			<Outlet />
		</Main>
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
					<Route path="/" element={<Navigate to="/dashboard" replace />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};
