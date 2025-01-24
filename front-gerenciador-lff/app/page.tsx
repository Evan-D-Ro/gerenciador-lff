"use client"

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    CardContent
} from '@/components/ui/card';

export default function LoginPage() {
    const router = useRouter();
    return (
        <div className="min-h-screen flex justify-center items-center p-8 bg-gray-50 relative">
            {/* Imagem de fundo com opacidade */}
            <div
                className="absolute inset-0 bg-contain bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/logo-lar.png')", // Caminho para a imagem
                    opacity: 0.3, // Opacidade apenas no fundo (imagem)
                }}
            ></div>

            {/* Card com fundo com opacidade e conteúdo sem opacidade */}
            <Card className="w-full max-w-sm relative z-10" style={{ backgroundColor: 'rgba(220, 220, 220, 0.7)' }}>
                <CardHeader>
                    <CardTitle className="text-2xl text-center">BEM-VINDO!</CardTitle>
                    <CardDescription className="text-center text-gray-800">
                        Clique no botão abaixo para entrar no sistema.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    {/* Botão de login */}
                    <div>
                        <Button onClick={() => router.push('/login')} className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                            Entrar
                        </Button>

                    </div>
                </CardContent>

            </Card>
        </div>
    );
}
