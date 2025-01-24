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
import { Turma } from './turma';
import { getTurmas } from '@/lib/db';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function TurmasTable({ search }: { search: string }) {
    const [turmas, setTurmas] = useState<any[]>([]);
    const [offset, setOffset] = useState(0);
    const [totalTurmas, setTotalTurmas] = useState(0);

    let router = useRouter();
    let turmasPerPage = 5;

    // Função para carregar escolas da API
    async function fetchTurmas(search: string = '', currentOffset: number = 0) {
        try {
            const { turmas, newOffset, totalTurmas } = await getTurmas(search, currentOffset);

            // Ordena as escolas pelo nome (ordem crescente)
            const sortedTurmas = turmas.sort((a: { nome: string }, b: { nome: string }) => {
                if (a.nome < b.nome) return -1;  // a vem antes de b
                if (a.nome > b.nome) return 1;   // b vem antes de a
                return 0;  // a e b são iguais
            });

            setTurmas(sortedTurmas);
            setOffset(currentOffset);
            setTotalTurmas(totalTurmas);
        } catch (error) {
            console.error('Erro ao buscar turmas:', error);
        }
    }


    useEffect(() => {
        fetchTurmas(search, 0); // Passa o valor de search para filtrar
    }, [search]); // Recarrega sempre que search mudar

    // Controle de navegação
    function prevPage() {
        if (offset > 0) {
            fetchTurmas('', Math.max(0, offset - turmasPerPage));
        }
    }

    function nextPage() {
        if (offset + turmasPerPage < totalTurmas) {
            fetchTurmas('', offset + turmasPerPage);
        }
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>TURMAS</CardTitle>
                <CardDescription>
                    Faça a manutenção das turmas que as crianças estão na entidade.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>
                                <span className="">Ações</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {turmas.map((turma) => (
                            <Turma key={turma.id} turma={turma} />
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                <form className="flex items-center w-full justify-between">
                    <div className="text-xs text-muted-foreground">
                        Mostrando{' '}
                        <strong>
                            {offset + 1}-{Math.min(offset + turmasPerPage, totalTurmas)}
                        </strong>{' '}
                        de <strong>{totalTurmas}</strong> turmas
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
                            disabled={offset + turmasPerPage >= totalTurmas}
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
