import "./App.css";
import { DashboardPage } from "./features/dashboard";
import { Footer, Header, Main } from "./shared";

export const App = () => {
	return (
		<>
			<Header />
			<Main>
				<DashboardPage />
			</Main>
			<Footer />
		</>
	);
};
