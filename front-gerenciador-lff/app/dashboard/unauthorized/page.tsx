export default function UnauthorizedPage() {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="max-w-md rounded-2xl bg-white p-6 shadow-lg">
                <h1 className="text-2xl font-bold text-gray-800">Acesso Negado</h1>
                <p className="mt-2 text-gray-700">
                    Você não tem permissão para acessar esta página.
                </p>
                <a
                    href="/dashboard"
                    className="mt-4 inline-block rounded-lg bg-gray-800 px-4 py-2 text-white transition hover:bg-blue-700"
                >
                    Voltar para a página inicial
                </a>
            </div>
        </div>
    );
}
