import type { Payment } from "@/features/payments/types/payment.types";

export const mockPayments: Payment[] = [
	{
		id: "p1",
		saleId: "1",
		date: "2026-10-28",
		customer: "Maria Silva",
		saleNumber: 1001,
		amount: 150.0,
		method: "Pix",
		status: "Confirmado",
	},
	{
		id: "p2",
		saleId: "2",
		date: "2026-10-26",
		customer: "João Pereira",
		saleNumber: 1002,
		amount: 80.0,
		method: "Dinheiro",
		status: "Confirmado",
	},
	{
		id: "p3",
		saleId: "3",
		date: "2026-10-25",
		customer: "Ana Costa",
		saleNumber: 1003,
		amount: 30.0,
		method: "Cartão",
		status: "Confirmado",
	},
];
