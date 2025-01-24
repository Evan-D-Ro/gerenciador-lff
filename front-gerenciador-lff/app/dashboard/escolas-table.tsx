'use client';

import React, { useState, useEffect } from 'react';
import {
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    Table
} from '@/components/ui/table';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Escola } from './escola';
import { getEscolas } from '@/lib/db';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function EscolasTable() {
    const [escolas, setEscolas] = useState<any[]>([]);
    const [offset, setOffset] = useState(0);
    const [totalEscolas, setTotalEscolas] = useState(0);

    let router = useRouter();
    let escolasPerPage = 5;

    // Função para carregar escolas da API
    async function fetchEscolas(search: string = '', currentOffset: number = 0) {
        try {
            const { escolas, newOffset, totalEscolas } = await getEscolas(search, currentOffset);

            // Ordena as escolas pelo nome (ordem crescente)
            const sortedEscolas = escolas.sort((a: { nome: string }, b: { nome: string }) => {
                if (a.nome < b.nome) return -1;  // a vem antes de b
                if (a.nome > b.nome) return 1;   // b vem antes de a
                return 0;  // a e b são iguais
            });

            setEscolas(sortedEscolas);
            setOffset(currentOffset);
            setTotalEscolas(totalEscolas);
        } catch (error) {
            console.error('Erro ao buscar escolas:', error);
        }
    }


    useEffect(() => {
        fetchEscolas('', 0); // Busca inicial sem filtro
    }, []);


    // Controle de navegação
    function prevPage() {
        if (offset > 0) {
            fetchEscolas('', Math.max(0, offset - escolasPerPage));
        }
    }

    function nextPage() {
        if (offset + escolasPerPage < totalEscolas) {
            fetchEscolas('', offset + escolasPerPage);
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>ESCOLAS</CardTitle>
                <CardDescription>
                    Faça a manutenção das escolas que as crianças estudam.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Telefone</TableHead>
                            <TableHead>
                                <span className="">Ações</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {escolas.map((escola) => (
                            <Escola key={escola.id} escola={escola} />
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                <form className="flex items-center w-full justify-between">
                    <div className="text-xs text-muted-foreground">
                        Mostrando{' '}
                        <strong>
                            {offset + 1}-{Math.min(offset + escolasPerPage, totalEscolas)}
                        </strong>{' '}
                        de <strong>{totalEscolas}</strong> escolas
                    </div>
                    <div className="flex">
                        <Button
                            formAction={prevPage}
                            variant="ghost"
                            size="sm"
                            type="submit"
                            disabled={offset === 0}  // Desabilita o botão se o offset for 0 (primeira página)
                        >
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Anterior
                        </Button>

                        <Button
                            formAction={nextPage}
                            variant="ghost"
                            size="sm"
                            type="submit"
                            disabled={offset + escolasPerPage >= totalEscolas}
                        >
                            Próxima
                            <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </form>
            </CardFooter>
        </Card>
    );
}
