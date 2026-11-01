import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./AppLayout";
import { lazy, Suspense } from "react";
import NotFoundPage from "./pages/NotFoundPage";

const LoginPage = lazy(() => import("@/features/login/index"));
const DashboardPage = lazy(() => import("@/features/dashboard"));

const ClientsPage = lazy(() =>
	import("@/features/clients").then((module) => ({
		default: module.ClientsPage,
	}))
);

const NewClientPage = lazy(() =>
	import("@/features/clients").then((module) => ({
		default: module.NewClientPage,
	}))
);

const SalesPage = lazy(() =>
	import("@/features/sales").then((module) => ({
		default: module.SalesPage,
	}))
);

const NewSalePage = lazy(() =>
	import("@/features/sales").then((module) => ({
		default: module.NewSalePage,
	}))
);

const PaymentsPage = lazy(() =>
	import("@/features/payments").then((module) => ({
		default: module.PaymentsPage,
	}))
);

const NewPaymentPage = lazy(() =>
	import("@/features/payments").then((module) => ({
		default: module.NewPaymentPage,
	}))
);

export const AppRoutes = () => {
	return (
		<BrowserRouter>
			<Suspense fallback={<div>Carregando...</div>}>
				<Routes>
					{/* Rotas públicas */}
					<Route path="/login" element={<LoginPage />} />

					{/* Rotas internas */}
					<Route element={<AppLayout />}>
						<Route path="/dashboard" element={<DashboardPage />} />

						<Route path="/clients" element={<ClientsPage />} />
						<Route path="/clients/new" element={<NewClientPage />} />

						<Route path="/sales" element={<SalesPage />} />
						<Route path="/sales/new" element={<NewSalePage />} />

						<Route path="/payments" element={<PaymentsPage />} />
						<Route path="/payments/new" element={<NewPaymentPage />} />

						<Route path="/" element={<Navigate to="/dashboard" replace />} />
					</Route>

					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
};
