import react from "react";
import { useNavigate } from "react-router-dom";
import { Save } from "lucide-react";
import { PageHeader, FormField, Input, Textarea, Button, Section, Form } from "@/shared";

export function NewClientPage() {
	const navigate = useNavigate();

	const [formData, setFormData] = react.useState({
		name: "",
		phone: "",
		cpf: "",
		address: "",
		notes: "",
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = event.target;

		setFormData((previous) => ({
			...previous,
			[name]: value,
		}));
	};

	const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
		event.preventDefault();

		// Futuramente, integrar com a API do FiadoFlow.
		console.log("Dados do novo cliente:", formData);

		navigate("/clientes");
	};

	return (
		<div className="mx-auto w-full space-y-5 p-5 md:p-8">
			<PageHeader
				title="Novo cliente"
				description="Cadastre um cliente para acompanhar suas vendas e seus pagamentos."
			/>

			<Section padding="lg">
				<Form onSubmit={handleSubmit}>
					{/* Nome e telefone */}
					<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
						<FormField label="Nome" htmlFor="name" required>
							<Input
								id="name"
								name="name"
								type="text"
								required
								maxLength={150}
								value={formData.name}
								onChange={handleChange}
								placeholder="Digite o nome completo"
							/>
						</FormField>

						<FormField label="Telefone" htmlFor="phone" required>
							<Input
								id="phone"
								name="phone"
								type="tel"
								required
								value={formData.phone}
								onChange={handleChange}
								placeholder="(11) 98765-4321"
							/>
						</FormField>
					</div>

					{/* CPF e endereço */}
					<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
						<FormField label="CPF" htmlFor="cpf">
							<Input
								id="cpf"
								name="cpf"
								type="text"
								value={formData.cpf}
								onChange={handleChange}
								placeholder="000.000.000-00"
							/>
						</FormField>

						<FormField label="Endereço" htmlFor="address">
							<Input
								id="address"
								name="address"
								type="text"
								value={formData.address}
								onChange={handleChange}
								placeholder="Digite o endereço completo"
							/>
						</FormField>
					</div>

					{/* Observações */}
					<FormField label="Observações (opcional)" htmlFor="notes">
						<Textarea
							id="notes"
							name="notes"
							rows={4}
							value={formData.notes}
							onChange={handleChange}
							placeholder="Alguma observação sobre o cliente..."
							className="resize-none"
						/>
					</FormField>

					{/* Ações */}
					<div className="flex flex-col-reverse justify-end gap-3 border-t border-border pt-5 sm:flex-row">
						<Button type="button" variant="outline" size="lg" onClick={() => navigate("/clients")}>
							Cancelar
						</Button>

						<Button type="submit" size="lg" leftIcon={<Save size={17} />}>
							Salvar cliente
						</Button>
					</div>
				</Form>
			</Section>
		</div>
	);
}
