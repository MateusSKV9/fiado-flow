export type SaleStatus = "Em aberto" | "Pago" | "Parcial";

export type SaleItem = {
	id: string;
	name: string;
	quantity: number;
	unitPrice: number;
};

export type Sale = {
	id: string;
	number: number;
	date: string;
	customer: string;
	items: SaleItem[];
	total: number;
	paid: number;
	balance: number;
	status: SaleStatus;
};
