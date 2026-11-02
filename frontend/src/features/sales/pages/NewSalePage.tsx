import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, ShoppingBag, Trash2, UserRoundPlus } from "lucide-react";
import { PageHeader, FormField, Select, Button, Input, Textarea, Card, LinkStyled } from "@/shared";
import { formatCurrency } from "@/utils";
import type { PaymentMethod } from "@/shared/types";
import type { SaleItem } from "../types/sale.types";

const customers = [
	{ id: "1", name: "Maria Silva" },
	{ id: "2", name: "João Pereira" },
	{ id: "3", name: "Ana Costa" },
	{ id: "4", name: "Carlos Oliveira" },
];

export default function NewSalePage() {
	const [customerId, setCustomerId] = useState("");
	const [productName, setProductName] = useState("");
	const [quantity, setQuantity] = useState("1");
	const [unitPrice, setUnitPrice] = useState("");
	const [items, setItems] = useState<SaleItem[]>([]);
	const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("Fiado");
	const [notes, setNotes] = useState("");
	const [feedback, setFeedback] = useState("");

	const navigate = useNavigate();

	const total = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);
	const totalQuantity = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

	function addItem() {
		const name = productName.trim();
		const parsedQuantity = Number(quantity);
		const parsedPrice = Number(unitPrice.replace(",", "."));

		if (
			!name ||
			!Number.isInteger(parsedQuantity) ||
			parsedQuantity < 1 ||
			unitPrice.trim() === "" ||
			!Number.isFinite(parsedPrice) ||
			parsedPrice < 0
		) {
			setFeedback("Informe o produto, uma quantidade inteira válida e um preço válido.");
			return;
		}

		setItems((current) => [
			...current,
			{
				id: crypto.randomUUID(),
				name,
				price: parsedPrice,
				quantity: parsedQuantity,
			},
		]);

		setProductName("");
		setQuantity("1");
		setUnitPrice("");
		setFeedback("");
	}

	function removeItem(id: string) {
		setItems((current) => current.filter((item) => item.id !== id));
		setFeedback("");
	}

	function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
		event.preventDefault();

		if (!customerId) {
			setFeedback("Selecione um cliente para continuar.");
			return;
		}

		if (items.length === 0) {
			setFeedback("Adicione pelo menos um produto à venda.");
			return;
		}

		const saleData = {
			customerId,
			items,
			paymentMethod,
			notes: notes.trim(),
			total,
		};

		console.log("Venda preparada:", saleData);
		setFeedback(`Venda preparada: ${formatCurrency(total)}. A integração com a API ainda não foi configurada.`);
	}

	return (
		<div className="mx-auto w-full max-w-7xl space-y-6 p-5 md:p-8">
			<PageHeader title="Nova venda fiada" description="Registre uma venda e acompanhe o valor a receber." />

			<form onSubmit={handleSubmit} className="space-y-6">
				{/* Cliente */}
				<Card className="space-y-4">
					<div className="flex flex-col gap-3 sm:flex-row sm:items-end">
						<div className="min-w-0 flex-1">
							<FormField label="Cliente" htmlFor="customer" required>
								<Select
									id="customer"
									value={customerId}
									onChange={(event) => setCustomerId(event.target.value)}
									required
								>
									<option value="">Selecione um cliente</option>
									{customers.map((customer) => (
										<option key={customer.id} value={customer.id}>
											{customer.name}
										</option>
									))}
								</Select>
							</FormField>
						</div>

						<Button
							type="button"
							variant="brand"
							leftIcon={<UserRoundPlus size={17} />}
							onClick={() => navigate("/clients/new")}
						>
							Novo cliente
						</Button>
					</div>

					{/* {showCustomerForm && (
						<p className="rounded-lg bg-surface-muted p-3 text-sm text-muted">
							O cadastro de clientes será integrado nesta área futuramente.
						</p>
					)} */}
				</Card>

				{/* Produtos */}
				<Card className="space-y-4">
					<div className="grid grid-cols-1 items-end gap-3 sm:grid-cols-12">
						<div className="sm:col-span-6">
							<FormField label="Produto / Item" htmlFor="productName" required>
								<Input
									id="productName"
									type="text"
									value={productName}
									onChange={(event) => setProductName(event.target.value)}
									placeholder="Digite o nome do produto..."
									maxLength={150}
									autoComplete="off"
								/>
							</FormField>
						</div>

						<div className="sm:col-span-2">
							<FormField label="Qtd." htmlFor="quantity" required>
								<Input
									id="quantity"
									type="number"
									min="1"
									step="1"
									value={quantity}
									onChange={(event) => setQuantity(event.target.value)}
								/>
							</FormField>
						</div>

						<div className="sm:col-span-2">
							<FormField label="Valor unitário" htmlFor="unitPrice" required>
								<Input
									id="unitPrice"
									type="number"
									min="0"
									step="0.01"
									value={unitPrice}
									onChange={(event) => setUnitPrice(event.target.value)}
									placeholder="0.00"
								/>
							</FormField>
						</div>

						<div className="sm:col-span-2">
							<Button type="button" onClick={addItem} leftIcon={<Plus size={17} />} className="w-full">
								Adicionar
							</Button>
						</div>
					</div>

					{items.length > 0 ? (
						<div className="overflow-x-auto">
							<table className="w-full min-w-115 text-left text-sm">
								<thead className="border-b border-border text-xs text-muted">
									<tr>
										<th scope="col" className="py-3 font-medium">
											Produto
										</th>
										<th scope="col" className="py-3 font-medium">
											Qtd.
										</th>
										<th scope="col" className="py-3 font-medium">
											Unitário
										</th>
										<th scope="col" className="py-3 text-right font-medium">
											Subtotal
										</th>
										<th scope="col" className="py-3">
											<span className="sr-only">Ações</span>
										</th>
									</tr>
								</thead>

								<tbody className="divide-y divide-border">
									{items.map((item) => (
										<tr key={item.id}>
											<td className="py-3 font-medium text-foreground">{item.name}</td>
											<td className="py-3 text-muted">{item.quantity}</td>
											<td className="py-3 text-muted">{formatCurrency(item.price)}</td>
											<td className="py-3 text-right font-semibold text-foreground">
												{formatCurrency(item.price * item.quantity)}
											</td>
											<td className="py-3 text-right">
												<Button
													type="button"
													variant="ghost"
													size="sm"
													aria-label={`Remover ${item.name}`}
													onClick={() => removeItem(item.id)}
													className="px-2 text-muted hover:bg-danger-bg hover:text-danger"
												>
													<Trash2 size={16} />
												</Button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					) : (
						<p className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted">
							Nenhum produto adicionado à venda.
						</p>
					)}
				</Card>

				{/* Pagamento e observações */}
				<Card className="space-y-5">
					<div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
						<FormField label="Forma de pagamento" htmlFor="paymentMethod" required>
							<Select
								id="paymentMethod"
								value={paymentMethod}
								onChange={(event) => setPaymentMethod(event.target.value as PaymentMethod)}
								required
							>
								<option value="Fiado">Fiado</option>
								<option value="Dinheiro">Dinheiro</option>
								<option value="Pix">Pix</option>
								<option value="Cartão">Cartão</option>
							</Select>
						</FormField>

						<div>
							<p className="mb-1.5 text-sm font-medium text-muted">Valor total</p>
							<p className="text-xl font-bold tracking-tight text-foreground">{formatCurrency(total)}</p>
							<p className="mt-1 text-xs text-muted">
								{totalQuantity} unidade(s) · {paymentMethod}
							</p>
						</div>
					</div>

					<FormField label="Observações (opcional)" htmlFor="notes">
						<Textarea
							id="notes"
							value={notes}
							onChange={(event) => setNotes(event.target.value)}
							placeholder="Ex.: Entregar para o cliente..."
							rows={3}
							maxLength={1000}
							className="resize-y"
						/>
					</FormField>
				</Card>

				{feedback && (
					<p role="status" className="rounded-lg border border-border bg-surface p-3 text-sm text-muted">
						{feedback}
					</p>
				)}

				{/* Ações */}
				<div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
					<LinkStyled to="/payments" variant="outline" size="lg">
						Cancelar
					</LinkStyled>

					<Button type="submit" size="lg" leftIcon={<ShoppingBag size={17} />}>
						Registrar venda
					</Button>
				</div>
			</form>
		</div>
	);
}
