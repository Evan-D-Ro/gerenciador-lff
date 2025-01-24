import Link from 'next/link';
import { Card, CardDescription, CardFooter, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import '../../public/template/css/fontawesome-free/css/all.min.css'

export default function DashboardPage() {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center p-8 space-y-4 h-screen">
        {/* Mensagem de boas-vindas */}
        <h2 className="text-lg text-center text-gray-700">
          Bem-vindo ao sistema! Utilize o menu ao lado para acessar as funções do sistema.
        </h2>
        <div className="flex justify-center">
          <i className="fa fa-arrow-left text-2xl text-gray-600"></i> {/* Ícone de seta */}

        </div>

        {/* Adicionando uma instrução visual */}
        <p className="text-sm text-center text-gray-500">
          Clique no menu ao lado para navegar entre as funcionalidades do sistema.
        </p>
      </CardContent>
    </Card>
  );
}
