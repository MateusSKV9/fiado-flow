import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, CheckCircle2, Store } from "lucide-react";
import FiadoLogo from "@/assets/fiado-flow-logo.png";

export function LoginPage() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);

	const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Integração futura com o backend Fastify do FiadoFlow
		console.log({ email, password, rememberMe });
		navigate("/dashboard");
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-background p-4 sm:p-6 md:p-8">
			{/* Card Principal */}
			<div className="w-full max-w-4xl bg-surface rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-140">
				{/* Painel Esquerdo - Branding / Banner */}
				<div className="bg-brand-600 p-8 md:p-10 text-brand-foreground flex flex-col justify-between relative overflow-hidden">
					{/* Header do Logo */}
					<div className="relative z-10">
						<div className="flex items-center gap-3 mb-6">
							<div className="p-2 bg-brand-50 backdrop-blur-md rounded-xl flex items-center justify-center font-bold text-2xl text-brand-foreground shadow-inner">
								<img className="w-9" src={FiadoLogo} alt="Logo FiadoFlow" />
							</div>
							<span className="text-2xl font-bold tracking-tight">FiadoFlow</span>
						</div>

						<h1 className="text-2xl sm:text-3xl font-bold leading-tight mb-2">
							Controle suas vendas fiadas de forma simples e segura.
						</h1>
					</div>

					{/* Ilustração Centralizada (Loja / Comércio) */}
					<div className="my-8 flex justify-center items-center relative z-10">
						<div className="relative w-44 h-44 bg-brand-foreground/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-brand-foreground/20 shadow-2xl">
							{/* Elementos decorativos de fundo */}
							<div className="absolute -top-2 -right-2 w-5 h-5 bg-brand-500/30 rounded-full blur-[1px]"></div>
							<div className="absolute -bottom-1 -left-2 w-6 h-6 bg-brand-500/20 rounded-full blur-[1px]"></div>

							{/* Ícone representando a loja */}
							<div className="w-28 h-28 bg-brand-foreground/20 rounded-2xl flex items-center justify-center shadow-lg border border-brand-foreground/30 transform transition-transform hover:scale-105 duration-300">
								<Store className="w-16 h-16 text-brand-foreground drop-shadow-md" strokeWidth={1.5} />
							</div>
						</div>
					</div>

					{/* Lista de Benefícios */}
					<div className="space-y-3 relative z-10">
						{[
							"Gerencie seus clientes",
							"Registre suas vendas",
							"Acompanhe os pagamentos",
							"Tenha total controle financeiro",
						].map((text, index) => (
							<div key={index} className="flex items-center gap-3">
								<div className="bg-surface text-brand-600 rounded-full p-0.5 flex items-center justify-center shadow-sm">
									<CheckCircle2 className="w-4 h-4 fill-brand-600 text-surface" />
								</div>
								<span className="text-sm font-medium text-brand-50/90">{text}</span>
							</div>
						))}
					</div>

					{/* Sombra suave de fundo para textura */}
					<div className="absolute -bottom-20 -left-20 w-64 h-64 bg-brand-700/50 rounded-full blur-3xl pointer-events-none" />
				</div>

				{/* Painel Direito - Formulário de Login */}
				<div className="p-8 md:p-12 flex flex-col justify-center bg-surface">
					<div className="mb-8">
						<h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-1">Bem-vindo de volta!</h2>
						<p className="text-muted text-sm font-normal">Faça login para continuar</p>
					</div>

					<form onSubmit={handleSubmit} className="space-y-5">
						{/* Campo E-mail */}
						<div className="space-y-1.5">
							<label htmlFor="email" className="block text-xs font-semibold text-foreground/80">
								E-mail
							</label>
							<input
								id="email"
								type="email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="seu@email.com"
								className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-surface text-foreground text-sm placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all duration-200"
							/>
						</div>

						{/* Campo Senha */}
						<div className="space-y-1.5">
							<label htmlFor="password" className="block text-xs font-semibold text-foreground/80">
								Senha
							</label>
							<div className="relative">
								<input
									id="password"
									type={showPassword ? "text" : "password"}
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									placeholder="Digite sua senha"
									className="w-full pl-3.5 pr-10 py-2.5 rounded-lg border border-border bg-surface text-foreground text-sm placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all duration-200"
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors p-1"
									aria-label={showPassword ? "Ocultar senha" : "Exibir senha"}
								>
									{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
								</button>
							</div>
						</div>

						{/* Lembrar de mim e Esqueci minha senha */}
						<div className="flex items-center justify-between text-xs pt-1">
							<label className="flex items-center gap-2 cursor-pointer select-none">
								<input
									type="checkbox"
									checked={rememberMe}
									onChange={(e) => setRememberMe(e.target.checked)}
									className="w-4 h-4 rounded border-border text-brand-600 focus:ring-brand-500/30 cursor-pointer accent-brand-600"
								/>
								<span className="text-foreground/80 font-medium">Lembrar de mim</span>
							</label>

							<Link
								to="/forgot-password"
								className="text-brand-600 hover:text-brand-700 font-semibold transition-colors"
							>
								Esqueceu sua senha?
							</Link>
						</div>

						{/* Botão Entrar */}
						<button
							type="submit"
							className="w-full py-2.5 px-4 bg-brand-600 hover:bg-brand-700 text-brand-foreground font-semibold rounded-lg shadow-sm hover:shadow transition-all duration-200 active:scale-[0.99] text-sm mt-2"
						>
							Entrar
						</button>
					</form>

					{/* Link para Cadastro */}
					<div className="mt-8 text-center font-semibold text-sm text-muted">
						Não tem uma conta?{" "}
						<Link to="/register" className="text-brand-600 hover:text-brand-700 transition-colors">
							Cadastre-se
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
