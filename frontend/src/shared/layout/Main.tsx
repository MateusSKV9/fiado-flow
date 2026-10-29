import type { ReactNode } from "react";

interface MainProps {
	children: ReactNode;
}

export function Main({ children }: MainProps) {
	return <main className="min-h-0 min-w-0 flex-1 bg-[#f5f8fc]">{children}</main>;
}
