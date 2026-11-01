import { useState } from "react";
import {
	PageHeader,
	FormField,
	Select,
	Input,
	Textarea,
	Button,
	Section,
	RadioCard,
	type PaymentMethod,
	LinkStyled,
} from "@/shared";

const customers = [
	{ id: "1", name: "Maria Silva" },
	{ id: "2", name: "João Pereira" },
	{ id: "3", name: "Ana Costa" },
];

const pendingSales = [
	{ id: "s1", customerId: "1", label: "Venda #104 - R$ 150,00" },
	{ id: "s2", customerId: "1", label: "Venda #108 - R$ 80,00" },
	{ id: "s3", customerId: "2", label: "Venda #105 - R$ 220,00" },
];

const paymentMethods: PaymentMethod[] = ["Dinheiro", "Pix", "Cartão"];

export default function NewPaymentPage() {
	const [formData, setFormData] = useState({
		customerId: "",
		saleId: "",
		amount: "",
		paymentDate: new Date().toISOString().split("T")[0], // Data atual formatada (YYYY-MM-DD)
		paymentMethod: "Dinheiro" as PaymentMethod,
		notes: "",
	});

	const [feedback, setFeedback] = useState("");

	function handleFormChange(field: string, value: string) {
		setFormData((prev) => ({ ...prev, [field]: value }));
	}

	function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
		event.preventDefault();

		if (!formData.customerId) {
			setFeedback("Selecione um cliente para continuar.");
			return;
		}

		if (!formData.amount || Number(formData.amount.replace(",", ".")) <= 0) {
			setFeedback("Informe um valor válido para o pagamento.");
			return;
		}

		setFeedback("Pagamento registrado com sucesso! (Integração pendente)");
	}

	// Filtra as vendas pendentes com base no cliente selecionado
	const filteredSales = pendingSales.filter((sale) => !formData.customerId || sale.customerId === formData.customerId);

	return (
		<div className="mx-auto w-full max-w-7xl space-y-6 p-5 md:p-8">
			<PageHeader
				title="Registrar pagamento"
				description="Registre os pagamentos recebidos dos clientes e vincule às vendas."
			/>

			<form onSubmit={handleSubmit} className="space-y-6">
				{/* Cliente e Venda */}
				<Section className="space-y-4">
					<FormField label="Cliente" htmlFor="customer" required>
						<Select
							id="customer"
							value={formData.customerId}
							onChange={(event) => {
								handleFormChange("customerId", event.target.value);
								handleFormChange("saleId", ""); // Reset a venda ao trocar de cliente
							}}
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

					<FormField label="Venda" htmlFor="sale">
						<Select
							id="sale"
							value={formData.saleId}
							onChange={(event) => handleFormChange("saleId", event.target.value)}
						>
							<option value="">Selecione uma venda (opcional)</option>
							{filteredSales.map((sale) => (
								<option key={sale.id} value={sale.id}>
									{sale.label}
								</option>
							))}
						</Select>
					</FormField>
				</Section>

				{/* Valor e Data do Pagamento */}
				<Section className="space-y-4">
					<div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
						<FormField label="Valor" htmlFor="amount" required>
							<Input
								id="amount"
								type="text"
								value={formData.amount}
								onChange={(event) => handleFormChange("amount", event.target.value)}
								placeholder="R$ 0,00"
								required
							/>
						</FormField>

						<FormField label="Data do pagamento" htmlFor="paymentDate" required>
							<Input
								id="paymentDate"
								type="date"
								value={formData.paymentDate}
								onChange={(event) => handleFormChange("paymentDate", event.target.value)}
								required
							/>
						</FormField>
					</div>

					{/* Forma de Pagamento (Estilização em Cards de Radio Button) */}
					<FormField htmlFor="paymentMethod" label="Forma de pagamento" required>
						<div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
							{paymentMethods.map((method) => (
								<RadioCard
									key={method}
									name="paymentMethod"
									option={{ label: method, value: method }}
									selectedValue={formData.paymentMethod}
									onChange={(value) => handleFormChange("paymentMethod", value)}
								/>
							))}
						</div>
					</FormField>
				</Section>

				{/* Observações */}
				<Section className="space-y-4">
					<FormField label="Observações (opcional)" htmlFor="notes">
						<Textarea
							id="notes"
							value={formData.notes}
							onChange={(event) => handleFormChange("notes", event.target.value)}
							placeholder="Ex.: Pagamento parcial..."
							rows={3}
							maxLength={500}
							className="resize-y"
						/>
					</FormField>
				</Section>

				{feedback && (
					<p role="status" className="rounded-lg border border-border bg-surface p-3 text-sm text-muted">
						{feedback}
					</p>
				)}

				{/* Botões de Ação */}
				<div className="flex flex-col-reverse justify-end gap-3 sm:flex-row pt-2">
					<LinkStyled to="/payments" variant="outline" size="lg">
						Cancelar
					</LinkStyled>

					<Button type="submit" size="lg">
						Registrar pagamento
					</Button>
				</div>
			</form>
		</div>
	);
}
