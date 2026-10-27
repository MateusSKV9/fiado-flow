import { DashboardPage } from "./features/dashboard";
import { Header, Main, Sidebar } from "./shared";

const user = "Mateus Santos";

export const App = () => {
	return (
		<div className="min-h-screen">
			<Sidebar user={user} />

			<Main>
				<Header user={user} />
				<DashboardPage />
			</Main>
		</div>
	);
};
