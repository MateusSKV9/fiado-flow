export type Client = {
	id: string;
	name: string;
	phone: string;
	totalOpen: number;
	status: "Ativo" | "Inativo";
	document?: string;
	address: string;
};
