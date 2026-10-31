import type { Client } from "@/features/clients";

export const mockClients: Client[] = [
	{ id: "1", name: "Maria Silva", phone: "(11) 98765-4321", totalOpen: 120, status: "Ativo" },
	{ id: "2", name: "João Pereira", phone: "(11) 91234-5678", totalOpen: 85, status: "Inativo" },
	{ id: "3", name: "Ana Costa", phone: "(11) 99876-5432", totalOpen: 0, status: "Ativo" },
	{ id: "4", name: "Carlos Oliveira", phone: "(11) 99654-3210", totalOpen: 150, status: "Ativo" },
	{ id: "5", name: "Fernanda Lima", phone: "(11) 96556-6677", totalOpen: 65, status: "Ativo" },
	{ id: "6", name: "Roberto Alves", phone: "(11) 96888-7766", totalOpen: 0, status: "Ativo" },
];
