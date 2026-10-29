export type Product = {
	id: string;
	name: string;
	price: number;
};

export type SaleItem = {
	quantity: number;
} & Product;

export type PaymentMethod = "Fiado" | "Dinheiro" | "Pix" | "Cartão";
