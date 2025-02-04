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
import { Pessoa } from './pessoa';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getPessoas } from '@/lib/db';

export function PessoasTable({ search, selectTab }: { search: string, selectTab: string }) {
    const [pessoas, setPessoas] = useState<any[]>([]);
    const [offset, setOffset] = useState(0);
    const [totalPessoas, setTotalPessoas] = useState(0);

    let router = useRouter();
    let pessoasPerPage = 5;

    // Função para carregar crianças da API
    async function fetchPessoas(search: string = '', currentOffset: number = 0) {
        try {
            const { pessoas, newOffset, totalPessoas } = await getPessoas(search, currentOffset, selectTab);

            setPessoas(pessoas);
            setOffset(currentOffset);
            setTotalPessoas(totalPessoas);
        } catch (error) {
            console.error('Erro ao buscar pessoas: ', error);
        }
    }


    useEffect(() => {
        fetchPessoas(search, 0); // Busca inicial sem filtro
    }, [search]);

    useEffect(() => {
        fetchPessoas(search, 0); // Busca inicial sem filtro
    }, [selectTab]);

    // Controle de navegação
    function prevPage() {
        if (offset > 0) {
            fetchPessoas('', Math.max(0, offset - pessoasPerPage));
        }
    }

    function nextPage() {
        if (offset + pessoasPerPage < totalPessoas) {
            fetchPessoas('', offset + pessoasPerPage);
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>USUÁRIOS DO SISTEMA</CardTitle>
                <CardDescription>
                    Faça a manutenção dos usuários ativos e invativos do sistema, bem como suas permissões.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Contato</TableHead>
                            <TableHead className="hidden md:table-cell">Cargo</TableHead>
                            <TableHead className="hidden md:table-cell">
                                Usuário
                            </TableHead>
                            <TableHead className="hidden md:table-cell">Habilitado</TableHead>
                            <TableHead>
                                <span className="sr-only">Ações</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pessoas.map((pessoa) => (
                            <Pessoa key={pessoa.id} pessoa={pessoa} />
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                <form className="flex items-center w-full justify-between">
                    <div className="text-xs text-muted-foreground">
                        Mostrando{' '}
                        <strong>
                            {offset + 1}-{Math.min(offset + pessoasPerPage, totalPessoas)}
                        </strong>{' '}
                        de <strong>{totalPessoas}</strong> pessoas
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
                            disabled={offset + pessoasPerPage >= totalPessoas}
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
