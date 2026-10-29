import type { ReactNode } from "react";

interface MainProps {
	children: ReactNode;
}

export function Main({ children }: MainProps) {
	return <main className="min-h-screen w-full bg-[#f5f8fc] lg:ml-64">{children}</main>;
}
