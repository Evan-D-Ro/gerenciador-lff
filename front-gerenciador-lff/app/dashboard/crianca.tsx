import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { SelectCrianca } from '@/lib/db';
import { deleteProduct } from './actions';

export function Crianca({ crianca }: { crianca: SelectCrianca }) {
    return (
        <TableRow>
            <TableCell className="font-medium">{crianca.nome}</TableCell>
            <TableCell>
                <Badge variant="outline" className="capitalize">
                    {crianca.escola.nome}
                </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">{crianca.turma.nome}</TableCell>
            <TableCell className="hidden md:table-cell">{crianca.nomeResponsavel}</TableCell>
            <TableCell className="hidden md:table-cell">{crianca.contatoResponsavel}</TableCell>

            <TableCell>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuItem>Visualizar</DropdownMenuItem>
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem>
                            <form action={deleteProduct}>
                                <button type="submit">Deletar</button>
                            </form>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    );
}
