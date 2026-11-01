import { Outlet } from "react-router-dom";
import { Header, Main, Sidebar } from "../shared";

const user = "Mateus Santos";

export const AppLayout = () => {
	return (
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
};
