import type { PaymentMethod } from "@/shared/types/payment-method.types";

export type PaymentStatus = "Confirmado" | "Pendente" | "Cancelado";

export interface Payment {
	id: string;
	saleId: string;
	date: string;
	customer: string;
	saleNumber: number;
	amount: number;
	method: PaymentMethod;
	status: PaymentStatus;
}
