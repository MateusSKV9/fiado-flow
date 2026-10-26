import type React from "react";

type MainProps = {
	children: React.ReactNode;
};

export const Main = ({ children }: MainProps) => {
	return (
		<main
			className="
      flex w-full flex-col justify-center items-center"
		>
			{children}
		</main>
	);
};
