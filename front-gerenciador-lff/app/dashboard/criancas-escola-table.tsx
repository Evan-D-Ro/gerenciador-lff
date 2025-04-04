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
import { Crianca } from './crianca';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getCriancasEscola } from '@/lib/db';

export function CriancasEscolaTable({ search, selectTab, idEscola, nomeEscola, idTurma }: { search: string, selectTab: string, idEscola: string, nomeEscola: string, idTurma: string }) {
    const [criancas, setCriancas] = useState<any[]>([]);
    const [offset, setOffset] = useState(0);
    const [totalCriancas, setTotalCriancas] = useState(0);

    let criancasPerPage = 5;

    // Função para carregar crianças da API
    async function fetchCriancas(search: string = '', currentOffset: number = 0, idTurma: string = '') {
        try {
            const { criancas, newOffset, totalCriancas } = await getCriancasEscola(search, currentOffset, selectTab, idEscola, idTurma);

            setCriancas(criancas);
            setOffset(currentOffset);
            setTotalCriancas(totalCriancas);
        } catch (error) {
            console.error('Erro ao buscar crianças:', error);
        }
    }


    useEffect(() => {
        fetchCriancas(search, 0, idTurma); // Busca inicial sem filtro
    }, [search]);

    useEffect(() => {
        fetchCriancas(search, 0, idTurma); // Busca inicial sem filtro
    }, [idTurma]);

    useEffect(() => {
        fetchCriancas(search, 0, idTurma); // Busca inicial sem filtro
    }, [selectTab]);

    // Controle de navegação
    function prevPage() {
        if (offset > 0) {
            fetchCriancas(search, Math.max(0, offset - criancasPerPage), idTurma);
        }
    }

    function nextPage() {
        if (offset + criancasPerPage < totalCriancas) {
            fetchCriancas(search, offset + criancasPerPage, idTurma);
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>CRIANÇAS POR ESCOLA - {nomeEscola}</CardTitle>
                <CardDescription>
                    Aqui são exibidas as crianças que frequentam a escola selecionada.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Escola</TableHead>
                            <TableHead className="hidden md:table-cell">Turma</TableHead>
                            <TableHead className="hidden md:table-cell">
                                Responsável
                            </TableHead>
                            <TableHead className="hidden md:table-cell">Telefone</TableHead>
                            <TableHead>
                                <span className="sr-only">Ações</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {criancas.map((crianca) => (
                            <Crianca key={crianca.id} crianca={crianca} />
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                <form className="flex items-center w-full justify-between">
                    <div className="text-xs text-muted-foreground">
                        Mostrando{' '}
                        <strong>
                            {offset + 1}-{Math.min(offset + criancasPerPage, totalCriancas)}
                        </strong>{' '}
                        de <strong>{totalCriancas}</strong> crianças
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
                            disabled={offset + criancasPerPage >= totalCriancas}
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
