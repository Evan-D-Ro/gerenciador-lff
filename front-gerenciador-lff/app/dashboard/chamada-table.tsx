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
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { getChamada } from '@/lib/db';

export function ChamadaTable({ idTurma, dataChamada, nomeTurma }: { idTurma: string, dataChamada: string, nomeTurma: string }) {
    const [criancas, setCriancas] = useState<{ idCrianca: string, nomeCrianca: string, statusCrianca: string, presente: boolean }[]>([]);

    useEffect(() => {
        async function fetchCriancas() {
            try {
                if (!idTurma || !dataChamada) return;

                const response = await getChamada(idTurma, dataChamada);
                setCriancas(response.presencas || []);
            } catch (error) {
                console.error('Erro ao buscar crianças:', error);
            }
        }

        fetchCriancas();
    }, [idTurma, dataChamada]);

    // Alternar presença
    const togglePresenca = (idCrianca: string) => {
        setCriancas(prevState =>
            prevState.map(c =>
                c.idCrianca === idCrianca ? { ...c, presente: !c.presente } : c
            )
        );
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>CHAMADA DE {new Date(dataChamada + 'T00:00:00').toLocaleDateString()} - {nomeTurma}: { }</CardTitle>
                <CardDescription>
                    Aqui são exibidas as crianças da turma selecionada para a chamada.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Presente?</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {criancas.map((crianca) => (
                            <TableRow key={crianca.idCrianca}>
                                <TableHead>
                                    <div>
                                        <p className="font-medium">{crianca.nomeCrianca}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{crianca.statusCrianca}</p>
                                    </div>
                                </TableHead>
                                <TableHead>
                                    <Checkbox className='ml-6'
                                        checked={crianca.presente}
                                        onCheckedChange={() => togglePresenca(crianca.idCrianca)}
                                    />
                                </TableHead>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
