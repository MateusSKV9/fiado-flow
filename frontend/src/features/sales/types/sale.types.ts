import type { Product } from "./product.types";

export type SaleStatus = "Em aberto" | "Pago" | "Parcial";

export type SaleItem = {
	quantity: number;
} & Product;

export type Sale = {
	id: string;
	number: number;
	date: string;
	customer: string;
	total: number;
	paid: number;
	balance: number;
	status: SaleStatus;
};
